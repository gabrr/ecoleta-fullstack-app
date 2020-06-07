import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from 'react'
import '../../styles/CreatePoint.css'
import { FiArrowLeft } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { LeafletMouseEvent } from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'

interface Item {
    id: number,
    title: string,
    imageUrl: string
}

interface UF {
    id: number,
    sigla: string,
    nome: string,
    regiao: {
        id: number,
        sigla: string,
        nome: string
    }
}

interface City {
    id: number,
    nome: string
}

interface FormData {
    name: string,
    email: string,
    whatsapp: string
}

const CreatePoint: React.FC = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<UF[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [selectedPosition, setselectedPosition] = useState<[number, number]>([0, 0])
    const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0])

    const history = useHistory()

    const [selectedUf, setselectedUf] = useState('0') 
    const [selectedCity, setselectedCity] = useState('0')
    const [selectedItems, setselectedItems] = useState<number[]>([])
    const [formData, setformData] = useState<FormData>({
        name: '',
        email: '',
        whatsapp: ''
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords

            setinitialPosition([latitude, longitude])
        })
    })

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(({data}) => setUfs(data))
    }, [])
    
    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(({data}) => setCities(data))
    }, [selectedUf])

    const handleUF = (event: ChangeEvent<HTMLSelectElement>) => {
        setselectedUf(event.target.value)
    }

    const handleCity = (event: ChangeEvent<HTMLSelectElement>) => {
        setselectedCity(event.target.value)
    }

    const handleMapClick = (event: LeafletMouseEvent) => {
        setselectedPosition([
            Number(event.latlng.lat),
            Number(event.latlng.lng) 
        ])
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setformData({
            ...formData,
            [name]: value
        })
    }

    const handleSelectItem = (event: MouseEvent<HTMLLIElement>, id: number) => {
        if(selectedItems.indexOf(id) >= 0) {
            const items = selectedItems.filter(itemId => itemId !== id )
            return setselectedItems(items)
        }
        setselectedItems([...selectedItems, id]) 
    }


    const handleSubmit = async(event: FormEvent) => {
        event.preventDefault()

        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        await api.post('points', data)
        alert('Point created')
        history.push('/')
    }


    return (
        <div id="page-create-point">
            <header>
                
                    <img src={logo} alt="ecoleta"/>
                <Link to="/">
                    <FiArrowLeft/>
                    Back Home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Register a collect place</h1>
                <fieldset>
                    <legend>
                        <h2>Data</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Place Name</label>
                        <input onChange={handleInput} type="text" name="name" id="name"/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="e-mail">E-mail</label>
                            <input onChange={handleInput} type="email" name="email" id="e-mail"/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input onChange={handleInput} type="tel" name="whatsapp" id="whatsapp"/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Adress</h2>
                        <span>Select an address on the map</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">State (UF)</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                onChange={handleUF}
                                value={selectedUf}
                            >
                                <option value="0">Select a UF</option>
                                {ufs.map(uf => (
                                    <option key={uf.id} value={uf.sigla}>
                                        {uf.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select 
                                name="city" 
                                id="city"
                                onChange={handleCity}
                                value={selectedCity}
                            >
                                <option value="0">Select a city</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.nome}>
                                        {city.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Items to collect</h2>
                        <span>Select one or more items to collect</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map((item) => {
                            return (
                                <li 
                                    key={item.id} 
                                    onClick={(e) => handleSelectItem(e, item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
                                    <img src={item.imageUrl} alt={item.title} />
                                    <span>{item.title}</span>
                                </li>
                            )
                        })}
                    </ul>
                </fieldset>
                <button type="submit">Register a Collect Place</button>
            </form>
        </div>
    )
}

export default CreatePoint
