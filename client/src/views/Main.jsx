import React, { useState } from 'react'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'
import WithAuth from '../components/WithAuth'
import About from '../components/About'
import Contact from '../components/Contact'
import '../styles/Main.css'
import CreateQuote from '../components/CreateQuote'

const Main = () => {
    const [toggleQuoteComponent, setToggleQuoteComponent] = useState(true);
    const [toggleAboutComponent, setToggleAboutComponent] = useState(false);
    const [toggleContactComponent, setToggleContactComponent] = useState(false);

    const [quoteList, setQuoteList] = useState([]);

    const toggleContact = () => {
        setToggleContactComponent(true);
        if (toggleQuoteComponent === true) {
            setToggleQuoteComponent(false);
        }
        if (toggleAboutComponent === true) {
            setToggleAboutComponent(false);
        }
    }

    const toggleAbout = () => {
        setToggleAboutComponent(true);
        if (toggleQuoteComponent === true) {
            setToggleQuoteComponent(false);
        }
        if (toggleContactComponent === true) {
            setToggleContactComponent(false);
        }
    }

    const toggleQuote = () => {
        setToggleQuoteComponent(true);
        setToggleAboutComponent(false);
        setToggleContactComponent(false);
    };

    return (
        <div className='main'>
            <Header/>
            {toggleQuoteComponent ? <CreateQuote/> : null}
            {toggleAboutComponent ? <About/> : null}
            {toggleContactComponent ? <Contact/> : null}
            <BottomBar
                toggleQuote={toggleQuote}
                toggleAbout={toggleAbout}
                toggleContact={toggleContact}
                quoteList={quoteList}
                setQuoteList={setQuoteList}
            />
        </div>
    )
}

export default WithAuth(Main)