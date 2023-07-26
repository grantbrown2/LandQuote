import React from 'react'
import Logo from '../styles/LandQuoteLogo.png'
import '../styles/Header.css'

const Header = () => {
    return (
        <div className="header">
            <img src={Logo} alt="Logo" className='logo'/>
            <h1>Looking to Request a Quote?</h1>
        </div>
    )
}

export default Header