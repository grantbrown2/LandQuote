import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <div className='contact'>
            <h2>Contact Me</h2>
            <p>
                Hi there! If you have any questions, suggestions, or just want to say hello, feel free to get in touch with me. I'm always excited to connect with like-minded individuals, fellow developers, or potential collaborators.
            </p>
            <p>
                You can reach me through the contact form below or by sending me an email directly at <strong>your.email@example.com</strong>. I'll do my best to get back to you as soon as possible.
            </p>
            <form>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' name='name' required />
                </div>
                <div>
                    <label htmlFor='phoneNum'>Phone Number:</label>
                    <input type='tel' id='phoneNum' name='phoneNum' required />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' required />
                </div>
                <div>
                    <label htmlFor='message'>Message:</label>
                    <textarea id='message' name='message' rows='5' required></textarea>
                </div>
                <button type='submit'>Send Message</button>
            </form>
            <p>
                Looking forward to hearing from you!
            </p>
        </div>
    );
}

export default Contact;
