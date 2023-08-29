import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'
import WithAuth from '../components/WithAuth'
import About from '../components/About'
import Contact from '../components/Contact'
import '../styles/Main.css'
import CreateQuote from '../components/CreateQuote'
import AdminPanel from '../components/AdminPanel'

const Main = () => {
    const [toggleQuoteComponent, setToggleQuoteComponent] = useState(true);
    const [toggleAboutComponent, setToggleAboutComponent] = useState(false);
    const [toggleContactComponent, setToggleContactComponent] = useState(false);
    const [toggleAdminComponent, setToggleAdminComponent] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false);

    const [quoteList, setQuoteList] = useState([]);

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = () => {
            axios.get('http://localhost:8000/api/users/self', { withCredentials: true })
                .then(res => {
                    setIsAdmin(res.data.user.admin);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchUserData();
    }, []);

    const toggleContact = () => {
        setToggleContactComponent(true);
        if (toggleQuoteComponent === true) {
            setToggleQuoteComponent(false);
        }
        if (toggleAboutComponent === true) {
            setToggleAboutComponent(false);
        }
        if (toggleAdminComponent === true) {
            setToggleAdminComponent(false);
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
        if (toggleAdminComponent === true) {
            setToggleAdminComponent(false);
        }
    }

    const toggleQuote = () => {
        setToggleQuoteComponent(true);
        setToggleAboutComponent(false);
        setToggleContactComponent(false);
    };

    const toggleAdminPanel = () => {
        setToggleAdminComponent(true);
        setToggleAboutComponent(false);
        setToggleContactComponent(false);
    }

    return (
        <div className='main'>
            <Header/>
            {isAdmin ? (
                toggleAdminComponent ? (
                    <AdminPanel
                        quoteList={quoteList}
                        setQuoteList={setQuoteList}
                    />) : null
            ) : (
                toggleQuoteComponent && <CreateQuote quoteList={quoteList} setQuoteList={setQuoteList}/>
            )}
            {toggleAboutComponent ? <About /> : null}
            {toggleContactComponent ? <Contact /> : null}
            <BottomBar
                toggleQuote={toggleQuote}
                toggleAbout={toggleAbout}
                toggleContact={toggleContact}
                toggleAdminPanel={toggleAdminPanel}
            />
        </div>
    )
}

export default WithAuth(Main)