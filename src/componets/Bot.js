import React, { useState } from "react";
import api from '../services/api';
import { Formik} from 'formik';
import { FaPaperPlane } from 'react-icons/fa';

import "../styles/bot.css";
import Messages from "./Messages";
import * as Yup from 'yup';
import RatingStar from './RatingStar';



const balloon = {
  first:
    "Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.",
  second:
    "Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?",
  third: {
    1: "Agora me fala teu e-mail, por gentileza.",
    2: "Digite um email válido",
  },
  fourth:
    "Você finalizou o teste. Faça uma avaliação sobre o processo que realizou até chegar aqui. Nós agradecemos!",

};



const Bot = () => {
  const [responses, setResponses] = useState([
    { text: balloon.first, isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState(0);
  const [input, setInput] = useState("");

  async function fetcData(ev) {

    const name = ev.target;
    await api.post('/users', name)
      //.then( (res)=>res.json()) 
      .then((data) => console.log(data))
      .catch(error => console.error("There was an error!", error));

  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Nome muito curto!')
      .max(50, 'Nome muito longo!')
      .required('Campo obrigatório'),
    city: Yup.string()
      .min(2, 'Nome muito curto!')
      .max(50, 'Nome muito longo!')
      .required('Campo obrigatório'),
    date: Yup.date().required('Required'),
    email: Yup.string().email('Email inválido').required('Required'),

  });

  const handleMessageSubmit = (message) => {
    const messageChoice = {
      0: {
        text: `Que satisfação ${message}. Agora que sei seu nome, qual a cidade e estado que você mora?`,
        isBot: true,
      },

      1: {
        text: balloon.second,
        isBot: true,
      },
      2: {
        text: balloon.third[1],
        isBot: true,
      },
      3: {
        text: balloon.fourth,
        isBot: true,
      },
      4: {
        text: balloon.reload,
        isBot: true,
      },
    };

    setResponses((responses) => [
      ...responses,
      messageChoice[timeMessage] || [],
    ]);


    if (messageChoice[timeMessage].text === balloon.second) {
      setInput("date");
    } else if (messageChoice[timeMessage].text === balloon.third[1]) {
      setInput("email");
    } else {
      setInput("text");
    }
    if (timeMessage !== 4) {
      setTimeMessage((timeMessage) => timeMessage + 1);
    } else {
      setTimeMessage(4);
    }
  };

  const handleMessageChange = (event) => {
    console.log(setCurrentMessage(event.target.value))

  };

  const handleSubmit = (event) => {
    
    const message = {
      text: currentMessage,
      isBot: false,
    };
    if (event.key === "Enter" || event.type === "click") {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
  };

  return (

    <div className="chatbot">
      <div className="chatbotContainer">
        <div className="messagesContainer">
          <Messages messages={responses} />
        </div>
        <RatingStar />
        < Formik
          initialValues={{
            name: '',
            city: '',
            date: '',
            email: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();

          }}
        >

          <div className="inputBot">
            <input
              name={input}
              type={input}
              onChange={(ev) => {handleMessageChange(ev, fetcData)}}
              value={currentMessage.values}
              onKeyDown={handleSubmit}
              className="input"

            />

            <button
              onClick={handleSubmit}
              className="button">
              <FaPaperPlane />
            </button>


          </div>
        </ Formik >
      </div>
    </div>



  );
};

export default Bot;
