import React from "react";
import Message from "./Message";
import "../styles/Messages.css";

const Messages = ({ messages }) => {
  console.log("Messages: " + messages);
  return (
    <div className="messagesSection">
      {messages.map(message => {
        return (
          <div className="messagesContainer">
            <Message message={message} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;