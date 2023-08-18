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
                {/* <p>
                    Hi there! If you have any questions, suggestions, or just want to say hello, feel free to get in touch with me. I'm always excited to connect with like-minded individuals, fellow developers, or potential collaborators.
                </p>
                <p>
                    You can reach me through the contact form below or by sending me an email directly at <strong>your.email@example.com</strong>. I'll do my best to get back to you as soon as possible.
                </p> */}
                <form onSubmit={handleSubmission}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor='phoneNum'>Phone Number:</label>
                        <input type='tel' id='phoneNum' name='phoneNum' value={formData.phoneNum} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor='message'>Message:</label>
                        <textarea id='message' name='message' rows='5' value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type='submit'>Send Message</button>
                </form>
                <p>
                    Looking forward to hearing from you!
                </p>
            </div>
        </div>

    );
}

export default Contact;
