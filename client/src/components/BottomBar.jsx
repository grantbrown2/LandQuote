import React from 'react'
import '../styles/BottomBar.css'

const BottomBar = () => {
    return (
        <footer className="footer">
            <div className="menu">
                <a className="menu__link">
                    Home
                </a>
                <a className="menu__link" href="/">
                    About
                </a>
                <a className="menu__link" href="/">
                    Contact
                </a>
                <a  className="menu__link">
                    Logout
                </a>
            </div>
        </footer>
    )
}

export default BottomBar