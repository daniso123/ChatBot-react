import React from 'react';
import '../styles/Home.css';
import Chatbot from '../componets/Chatbot';


const Home = () => {
   
    return (
        <div className='home'>
            <div className="chat">
                <div className="Chatbot">
                    <Chatbot />
                    
                </div>
            </div>
        </div>


    );

};

export default Home;