import React from 'react';
import '../styles/Chatbot.css';
import bot from '../assets/images/chatbot.png';
import api from '../services/api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaPaperPlane } from 'react-icons/fa';
import City from '../componets/City';
import Age from '../componets/Age';
import Email from '../componets/email';
import RatingStar from '../componets/RatingStar';



const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nome muito curto!')
        .max(50, 'Nome muito longo!')
        .required('Campo obrigatório'),
});

const Chatbot = () => {


    async function fetcData (ev) {
         
        const { name} = ev.target;
        await api.post('/users', name)
        //.then( (res)=>res.json()) 
        .then((data)=> console.log(data))
        .catch(error => console.error("There was an error!", error)); 

    };


    return (
        <div className="chatbot">
            <img className="botImg" src={bot} alt="Chatnilton" />
            <div className="bot">
                <p>Olá, eu sou o Chatnilton, tudo bem?Para começarmos, preciso saber seu nome.</p>
            </div>


            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values, null, 2));
                    actions.resetForm();
                   
                }}
            >
                {({ errors, touched }) => (
                    (
                        <Form>
                            <Field
                                name="name"
                                className="input"
                                onBlur={fetcData}
                            />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <button
                                type="submit"
                                className="button"
                                
                            ><FaPaperPlane />

                            </button>

                        </Form>
                    ))}

            </Formik>

            <City />
            <Age />
            <Email />
            <img className="botImg" src={bot} alt="Chatnilton" />
            <div className="bot">
                <p>Você finalizou o teste, faça uma avaliação sobre o processo que realizou até chegar aqui. Nós agradecemos!</p>
            </div>
            <RatingStar />
        </div>
    );



};

export default Chatbot;