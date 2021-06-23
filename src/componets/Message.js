import React from "react";
import bots from '../assets/images/chatbot.png';
import "../styles/Message.css";

const Message = ({ message }) => {
  return (
    <div >
      {message.isBot ? (
        <div className="messageCard">
          <img className="botImg" src={bots} alt="Chatnilton" />
          <div className="botCard">       
              {message.text}   
          </div>
        </div>
      ) : (
        <div className="userCard">
            {message.text}
        </div>
      )}
    </div>
  );
};

export default Message;
