import React from 'react';
import '../styles/Email.css';
import bot from '../assets/images/chatbot.png';

import api from '../services/api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaPaperPlane } from 'react-icons/fa';



const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Required'),
});

const Email = () => {

    async function fetcEmail(ev) {

       const name = ev.target;
        await api.post('/users', name)
    

            //.then( (res)=>res.json())
             
            .then((data) => console.log(data))
            .catch(error => console.error("There was an error!", error));
        
    };


    return (
        <div>
            <img className="emailImg" src={bot} alt="Chatnilton" />
            <div className="email">
                <p>Olá, eu sou o Chatnilton, tudo bem?Para começarmos, preciso saber seu nome.</p>
            </div>


            <Formik
                initialValues={{
                    email: '',
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
                            <Field name="email" type="email" className="emailForm" onBlur={fetcEmail} />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <button
                                type="submit"
                                className="button"

                            ><FaPaperPlane />

                            </button>

                        </Form>
                    ))}

            </Formik>
        </div>
    );



};

export default Email;