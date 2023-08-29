import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/ShowQuote.css'

const ShowQuote = ({ selectedQuote, setToggleShowQuote}) => {

    const [quoteData, setQuoteData] = useState(null); // Initialize with null

    useEffect(() => {
        const fetchQuote = () => {
            axios.get(`http://localhost:8000/api/quotes/${selectedQuote}`, { withCredentials: true })
                .then(res => {
                    setQuoteData(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchQuote();
    }, [selectedQuote]);

    const openImageInNewTab = (imageURL) => {
        window.open(imageURL, '_blank'); // Opens the URL in a new tab
    };

    const goBack = () => {
        setToggleShowQuote(false);
    }

    return (
        <div className='show-quote-container'>
            {quoteData && ( 
                <div className="show-quote">
                <button className='back-button' onClick={goBack}>Back</button>
                    <div className="quote-info">
                        <p>Name: {quoteData.name}</p>
                        <p>Email: {quoteData.user.email}</p>
                        <p>Address: {quoteData.address}</p>
                        <p>Number: {quoteData.number}</p>
                    </div>
                    {quoteData.quoteImages.length > 0 && (
                        <div className="quote-images">
                            {quoteData.quoteImages.map((image, index) => {
                                const imageURL = `http://localhost:8000/${image.replace(/\\/g, '/')}`;
                                return <img key={index} src={imageURL} alt={`Quote Image ${index + 1}`} onClick={() => openImageInNewTab(imageURL)} />;
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ShowQuote
