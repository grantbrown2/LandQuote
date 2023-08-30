import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CompletionQuote = ({setIsSubmitted, files, setFiles, imagePreviews, setImagePreviews, index}) => {
    const navigate = useNavigate();
    const logoutUser = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    const sendBack = (index) => {
        setFiles([]);
        setImagePreviews([]);
        setIsSubmitted(false);
    }

    return (
        <div className='submission'>
            <h1>Thank you for your submission!</h1>
            <p>We will get back to you as soon as possible.</p>
            <p>What would you like to do next?</p>
            <button onClick={logoutUser}>Logout</button>
            <button onClick={() => sendBack(index)}>Create another quote</button>
        </div>
    )
}

export default CompletionQuote