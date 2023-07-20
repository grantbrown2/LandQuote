import React, { useState } from 'react'
import axios from 'axios';
import '../styles/CreateQuote.css'


const CreateQuote = ({quoteList, setQuoteList}) => {

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState([]); // This is the new line

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
        const formData = new FormData();
        formData.append("address", address);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("number", number);
        formData.append("notes", notes);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("quoteImages", files[i]);
            }
        }

        axios.post("http://localhost:8000/api/quote/submit", formData, { withCredentials: true })
            .then(res => {
                console.log(res);
                setQuoteList([...quoteList, res.data]);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    return (
        <div className='quote'>
            <form onSubmit={e => {handleNewQuote(e)}} className='quote-form'>
                <div className="image-upload">
                    <label htmlFor="file-input">Choose an image</label>
                    <input className="file-input" type="file" id='filepath' name='quoteImages' multiple onChange={handleFileChange} />
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
        </div>
    )
}

export default CreateQuote