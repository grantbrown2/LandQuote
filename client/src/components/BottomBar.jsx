import React from 'react'
import axios from 'axios'
import '../styles/BottomBar.css'
import { Link, useNavigate } from 'react-router-dom'

const BottomBar = ({toggleAbout, toggleQuote, toggleContact, toggleAdminPanel}) => {
    const navigate = useNavigate();
    const logoutUser = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    const returnHome = () => {
        toggleQuote();
        toggleAdminPanel();
    }
    
    return (
        <footer className="footer">
            <div className="menu">
                <Link className="menu__link" onClick={returnHome}>
                    Home
                </Link>
                <Link className="menu__link" onClick={toggleAbout}>
                    About
                </Link>
                <Link className="menu__link" onClick={toggleContact}>
                    Contact
                </Link>
                <Link className="menu__link" onClick={logoutUser}>
                    Logout
                </Link>
            </div>
        </footer>
    )
}

export default BottomBar