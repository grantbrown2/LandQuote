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
    const [numberError, setNumberError] = useState('');
    const [fileError, setFileError] = useState('');

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
                setIsSubmitted(true);
                // setQuoteList([...quoteList, res.data]);
            })
            .catch(err => {
                console.log(err);
                const { errors } = err.response.data;
                setAddressError(errors.address ? errors.address.message : '');
                setNameError(errors.name ? errors.name.message : '');
                setNumberError(errors.number ? errors.number.message : '');
                setFileError(errors.quoteImages ? errors.quoteImages.message : '');
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
        <div className="quote-container">
            <div className='quote'>
                {!isSubmitted ? (
                    <form onSubmit={handleNewQuote} className='quote-form'>
                        <div className="image-upload">
                            <label htmlFor="file-input">Choose an image</label>
                            <input className="file-input" type="file" id='file-input' name='quoteImages' onChange={e => { handleFileChange(e); }} />
                            {fileError && <span className="error-message">{fileError}</span>}
                        </div>

                        <div className='preview-container'>
                        {imagePreviews.map((previewUrl, index) => (
                                <div key={index} className="preview-image-container">
                                    <img src={previewUrl} alt={`Preview ${index}`} className='preview-image' />
                                    <button type='button' onClick={() => handleRemoveImage(index)} className='remove-preview-image'>
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="bottom-inputs">
                            <div className="input-container">
                                <input type="text" className="input-field-quote" id="address" name="address" onChange={e => { setAddress(e.target.value); handleInputChange(e); }} />
                                <label htmlFor="address" className='input-label-quote'>Address:</label>
                                {addressError && <span className="error-message">{addressError}</span>}
                            </div>
                            <div className="input-container">
                                <input type="text" className="input-field-quote" id="name" name="name" onChange={e => { setName(e.target.value); handleInputChange(e); }} />
                                <label htmlFor="name" className='input-label-quote'>Name:</label>
                                {nameError && <span className="error-message">{nameError}</span>}
                            </div>
                            <div className="input-container">
                                <input type="text" className="input-field-quote" id="number" name="number" onChange={e => { setNumber(e.target.value); handleInputChange(e); }} />
                                <label htmlFor="number" className='input-label-quote'>Phone Number:</label>
                                {numberError && <span className="error-message">{numberError}</span>}
                            </div>
                            <div className="input-container">
                                <input type="text" className="input-field-quote" id="notes" name="notes" onChange={e => { setNotes(e.target.value); handleInputChange(e); }} />
                                <label htmlFor="notes" className='input-label-quote'>Notes:</label>
                            </div>
                        <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                ) :
                    <CompletionQuote />
                }
            </div>
        </div>
        
    )
}

export default CreateQuote