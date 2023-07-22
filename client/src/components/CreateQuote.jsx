import React, { useState } from 'react'
import axios from 'axios';
import '../styles/CreateQuote.css'

const CreateQuote = ({quoteList, setQuoteList}) => {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleInputChange = (e) => {
        const input = e.target;
        if (input.value.trim() !== "") {
            input.classList.add("has-content");
        } else {
            input.classList.remove("has-content");
        }
    };

    const handleNewQuote = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/quote/submit", {
            address,
            name,
            email,
            number,
            notes
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                setIsSubmitted(true);
                setQuoteList([...quoteList, res.data]);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className='quote'>
            {!isSubmitted ? (
                <form onSubmit={handleNewQuote} className='quote-form'>
                    <div className="image-upload">
                        <label htmlFor="file-input">Choose an image</label>
                        <input className="file-input" type="file" id='filepath' name='filepath' onChange={e => {handleInputChange(e); }}/>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="address" name="address" onChange={e => {setAddress(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="address" className='input-label'>Address:</label>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="name" name="name" onChange={e => {setName(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="name" className='input-label'>Name:</label>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="email" name="email" onChange={e => {setEmail(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="email" className='input-label'>Email:</label>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="number" name="number" onChange={e => {setNumber(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="number" className='input-label'>Phone Number:</label>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="notes" name="notes" onChange={e => {setNotes(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="notes" className='input-label'>Notes:</label>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            ) : <p>Thank you for your quote!</p>}
            
        </div>
    )
}

export default CreateQuote