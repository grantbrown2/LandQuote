// AdminPanel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/quotes/all', {
                withCredentials: true,
            });
            setQuotes(response.data); // Assuming response.data contains an array of quotes
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };
    const handleDelete = async (quoteId) => {
        try {
            await axios.delete(`http://localhost:8000/api/quote/${quoteId}`, {
                withCredentials: true, // Send cookies with the request
            });
            // After successful deletion, fetch quotes again to refresh the list
            fetchQuotes();
        } catch (error) {
            console.error('Error deleting quote:', error);
        }
    };

    const openImageInNewTab = (imageURL) => {
        window.open(imageURL, '_blank'); // Opens the URL in a new tab
    };

    return (
        <div className="admin-panel">
            <h2>All Quotes</h2>
            {quotes.length === 0 ? (
                <p>No quotes found.</p>
            ) : (
                <ul className="quote-list">
                    {quotes.map((quote) => (
                        <li key={quote._id} className="quote-item">
                            <div className="quote-info">
                                <p>Name: {quote.name}</p>
                                <p>Email: {quote.user.email}</p>
                                <p>Address: {quote.address}</p>
                                <p>Number: {quote.number}</p>
                            </div>

                            {quote.quoteImages.length > 0 && (
                                <div className="quote-images">
                                        {quote.quoteImages.map((image, index) => {
                                            const imageURL = `http://localhost:8000/${image.replace(/\\/g, '/')}`; // Replace backslashes with forward slashes
                                            return <img key={index} src={imageURL} alt={`Quote Image ${index + 1}`} onClick={() => openImageInNewTab(imageURL)} />;
                                        })}
                                </div>
                            )}
                            
                            <button className="delete-button" onClick={() => handleDelete(quote._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPanel;