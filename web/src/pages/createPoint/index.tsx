import React, { useEffect, useState } from 'react'
import '../../styles/CreatePoint.css'
import { FiArrowLeft } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'

interface CreatePointProps {
    // title: string
}

const CreatePoint: React.FC<CreatePointProps> = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data)
        })

        console.log(items)
    }, [setItems, items])

    

    return (
        <div id="page-create-point">
            <header>
                
                    <img src={logo} alt="ecoleta"/>
                <Link to="/">
                    <FiArrowLeft/>
                    Back Home
                </Link>
            </header>
            <form>
                <h1>Register a collect place</h1>
                <fieldset>
                    <legend>
                        <h2>Data</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Place Name</label>
                        <input type="text" name="name" id="name"/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="e-mail">E-mail</label>
                            <input type="email" name="e-mail" id="e-mail"/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="tel" name="whatsapp" id="whatsapp"/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Adress</h2>
                        <span>Select an address on the map</span>
                    </legend>

                    <Map center={[-23.4225664, -46.53056]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-23.4225664, -46.53056]}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">State (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Select a UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="uf">City</label>
                            <select name="uf" id="uf">
                                <option value="0">Select a city</option>
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
                        <li>
                            <img src="http://localhost:5000/uploads/organicos.svg" alt="organicos"/>
                            <span>Kitchen Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/organicos.svg" alt="organicos"/>
                            <span>Kitchen Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/organicos.svg" alt="organicos"/>
                            <span>Kitchen Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/organicos.svg" alt="organicos"/>
                            <span>Kitchen Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/organicos.svg" alt="organicos"/>
                            <span>Kitchen Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:5000/uploads/organicos.svg" alt="organicos"/>
                            <span>Kitchen Oil</span>
                        </li>
                    </ul>
                </fieldset>
                <button type="submit">Register a Collect Place</button>
            </form>
        </div>
    )
}

export default CreatePoint
