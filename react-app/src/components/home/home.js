import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css'
import Navbar from '../NavBar'
import HomeSingleQuestion from '../homeSingleQuestion/HomeSingleQuestion';

function Home() {
    const questions = Object.values(useSelector(state => state.questions)).reverse()


    return (
        <div className='home-container'>
            <div className='navbar-divider'></div>
            <Navbar />
            <div className='all-questions'>
                <h1 className='logo landing-logo'>Recent Questions</h1>
                {questions.map(question => (
                    <HomeSingleQuestion question={question} />
                ))}
            </div >
        </div>
    )
}

export default Home
