import React from 'react'
import axios from 'axios'
import '../styles/BottomBar.css'
import { Link, useNavigate } from 'react-router-dom'

const BottomBar = () => {
    const navigate = useNavigate();
    const logoutUser = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err))
    }
    
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
                <Link onClick={logoutUser} className="menu__link">
                    Logout
                </Link>
            </div>
        </footer>
    )
}

export default BottomBar