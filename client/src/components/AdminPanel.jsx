// AdminPanel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';
import ShowQuote from './ShowQuote';

const AdminPanel = () => {
    const [quotes, setQuotes] = useState([]);

    const [selectedQuote, setSelectedQuote] = useState('');
    const [toggleShowQuote, setToggleShowQuote] = useState(false);

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

    const runTest = (quoteId) => {
        setSelectedQuote(quoteId);
        setToggleShowQuote(true);
    }

    return (
        <div className="admin-container">
            {!toggleShowQuote && (
            <div className="admin-panel">
                <h2>All Quotes</h2>
                {quotes.length === 0 ? (
                    <p>No quotes found.</p>
                ) : (
                    <ul className="quote-list">
                        {quotes.map((quote) => (
                            <li key={quote._id} className="quote-item" onClick={() => runTest(quote._id)}>
                                <div className="quote-info">
                                    <p>New Quote From {quote.name}</p>
                                </div>
                                <button className="delete-button" onClick={() => handleDelete(quote._id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            )}
            <div>
                {toggleShowQuote && selectedQuote && (
                    <div>
                        <ShowQuote selectedQuote={selectedQuote} setToggleShowQuote={setToggleShowQuote}/>
                    </div>
                )}
            </div>
        </div>
        
    );
};

export default AdminPanel;