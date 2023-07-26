import React, { useState } from 'react'
import axios from 'axios';
import '../styles/CreateQuote.css'
import CompletionQuote from './CompletionQuote';


const CreateQuote = ({quoteList, setQuoteList}) => {

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    
    const [addressError, setAddressError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [numberError, setNumberError] = useState('');

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
                setIsSubmitted(true);
                // setQuoteList([...quoteList, res.data]);
            })
            .catch(err => {
                console.log(err);
                setIsSubmitted(false);
            });
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles([...files, ...newFiles]);

        newFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);

        const fileInput = document.getElementById('file-input');
        fileInput.value = '';

        const updatedImagePreviews = [...imagePreviews];
        updatedImagePreviews.splice(index, 1);
        setImagePreviews(updatedImagePreviews);
    };

    return (
        <div className='quote'>
            {!isSubmitted ? (
                <form onSubmit={handleNewQuote} className='quote-form'>
                    <div className="image-upload">
                        <label htmlFor="file-input">Choose an image</label>
                        <input className="file-input" type="file" id='file-input' name='quoteImages' onChange={e => {handleFileChange(e); }}/>
                        {imagePreviews.map((previewUrl, index) => (
                            <div key={index} className='preview-container'>
                                <img src={previewUrl} alt={`Preview ${index}`} className='preview-image' />
                                <button type='button' onClick={() => handleRemoveImage(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="address" name="address" onChange={e => {setAddress(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="address" className='input-label'>Address:</label>
                        {addressError && <span className="error-message">{addressError}</span>}
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
            ) : 
            <CompletionQuote/>
            }
        </div>
    )
}

export default CreateQuote