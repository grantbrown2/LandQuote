import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        phoneNum: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/send/email', formData)
            .then(res => { console.log("Success", res) })
            .catch((err) => { console.error(`Error ${err}`) });
    }

    const handleInputChange = (e) => {
        const input = e.target;
        if (input.value.trim() !== "") {
            input.classList.add("has-content");
        } else {
            input.classList.remove("has-content");
        }
    };

    return (
        <div className="contact-container">
            <div className='contact'>
                <h2>Contact Me</h2>
                <div className="contact-details-container">
                    <p className='contact-details'>email</p>
                    <p className='contact-details'>|</p>
                    <p className='contact-details'>numba</p>
                </div>
                <hr />
                <p>
                    Hi there! If you have any questions, suggestions, or just want to say hello, feel free to get in touch with me.
                </p>
                <p>
                    You can reach me through the contact form below or by sending me an email directly at <strong>your.email@example.com</strong>. I'll do my best to get back to you as soon as possible.
                </p>
                
                

                <form onSubmit={handleSubmission}>
                    <div className="flex">
                        <div className="input-container">
                            <input type='text' className="input-field-contact" id='name' name='name' value={formData.name} onChange={e => {handleChange(e); handleInputChange(e); }} required />
                            <label htmlFor='name' className='input-label-contact'>Name:</label>
                        </div>
                        <div className="input-container">
                            <input type='tel' className="input-field-contact" id='phoneNum' name='phoneNum' value={formData.phoneNum} onChange={e => {handleChange(e); handleInputChange(e); }} required />
                            <label htmlFor='phoneNum' className='input-label-contact'>Phone Number:</label>
                        </div>
                    </div>
                    <div className="input-container">
                        <textarea id='message' className="input-field-contact message-input" name='message' value={formData.message} onChange={e => {handleChange(e); handleInputChange(e); }} required />
                        <label htmlFor='message' className='input-label-contact message-label'>Message:</label>
                    </div>
                    <section className="section">
                        <label className="bb_button bb_button--corner" htmlFor="submitButton">
                            <span className="bb_button__text">Submit</span>
                        </label>
                        <button id="submitButton" type="submit" style={{ display: 'none' }} />
                    </section>
                </form>
            </div>
        </div>

    );
}

export default Contact;
