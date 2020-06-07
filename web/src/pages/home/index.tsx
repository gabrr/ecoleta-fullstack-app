import React from 'react'
import logo from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../../styles/Home.css'

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="home"/>
                </header>
                <main>
                    <h1>Your Marketplace Helping The World</h1>
                    <p>We help people to find a collect place efficiently</p>
                    {/* create-point */}
                    <Link to="/create-point">
                        <span>
                            <FiLogIn/>
                        </span>
                        <strong>Register a collect place</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Header
