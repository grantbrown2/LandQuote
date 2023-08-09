import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CompletionQuote = () => {
    const navigate = useNavigate();
    const logoutUser = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='submission'>
            <h1>Thank you for your submission!</h1>
            <p>We will get back to you as soon as possible.</p>
            <p>What would you like to do next?</p>
            <button onClick={logoutUser}>Logout</button>
            <button>Create another quote</button>
        </div>
    )
}

export default CompletionQuote