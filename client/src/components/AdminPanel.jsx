// AdminPanel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';
import ShowQuote from './ShowQuote';

const AdminPanel = ({quoteList, setQuoteList}) => {

    const [selectedQuote, setSelectedQuote] = useState('');
    const [toggleShowQuote, setToggleShowQuote] = useState(false);

    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchQuotes();
    }, []);

    useEffect(() => {
        const count = quoteList.filter(quote => !quote.markedRead).length;
        setUnreadCount(count);
    }, [quoteList])

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/quotes/all', {
                withCredentials: true,
            });
            setQuoteList(response.data); // Assuming response.data contains an array of quotes
            const count = response.data.filter(quote => !quote.markedRead).length;
            setUnreadCount(count);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };

    const handleDelete = async (quoteId) => {
        try {
            await axios.delete(`http://localhost:8000/api/quote/${quoteId}`, {
                withCredentials: true, // Send cookies with the request
            });
            setSelectedQuote('');
            setToggleShowQuote(false);
            // After successful deletion, fetch quotes again to refresh the list
            fetchQuotes();
        } catch (error) {
            console.error('Error deleting quote:', error);
        }
    };

    const selectQuote = async (quoteId) => {
        try {
            await axios.patch(`http://localhost:8000/api/quote/mark-read/${quoteId}`, null, {
                withCredentials: true, // Send cookies with the request
            });
            await fetchQuotes();
            setSelectedQuote(quoteId);
            setToggleShowQuote(true);
        } catch (error) {
            console.error('Error marking quote as read:', error);
        }
    };
    

    return (
        <div className="admin-container">
            {!toggleShowQuote && (
            <div className="admin-panel">
                <h2>All Quotes</h2>
                <div className="unread-counter">
                    <p>You have {unreadCount} unread quotes</p>
                </div>
                {quoteList.length === 0 ? (
                    <p>No quotes found.</p>
                ) : (
                    <ul className="quote-list">
                        {quoteList.map((quote) => (
                            <li key={quote._id} className="quote-item" onClick={() => selectQuote(quote._id)}>
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
                        <ShowQuote selectedQuote={selectedQuote} setToggleShowQuote={setToggleShowQuote} setUnreadCount={setUnreadCount}/>
                    </div>
                )}
            </div>
        </div>
        
    );
};

export default AdminPanel;