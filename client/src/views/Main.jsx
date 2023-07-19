import React, { useState } from 'react'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'
import WithAuth from '../components/WithAuth'
import '../styles/Main.css'
import CreateQuote from '../components/CreateQuote'

const Main = () => {
    const [toggleQuoteComponent, setToggleQuoteComponent] = useState(false);

    const toggleQuote = () => {
        setToggleQuoteComponent(!toggleQuoteComponent);
    };

    return (
        <div className='main'>
            <Header/>
            <CreateQuote/>
            <BottomBar toggleQuote={toggleQuote}/>
        </div>
    )
}

export default WithAuth(Main)