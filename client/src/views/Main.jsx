import React from 'react'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'
import WithAuth from '../components/WithAuth'
import '../styles/Main.css'

const Main = () => {
    return (
        <div className='main'>
            <Header/>
            <div className="content">QUOTE</div>
            <BottomBar/>
        </div>
    )
}

export default WithAuth(Main)