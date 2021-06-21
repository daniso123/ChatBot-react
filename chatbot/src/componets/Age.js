import React from 'react';
import '../styles/Age.css';
import bot from '../assets/images/chatbot.png';
import api from '../services/api';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPaperPlane } from 'react-icons/fa';


const SignupSchema = Yup.object().shape({
    date: Yup.date().required('Required')

});

const Age = () => {

    async function fetcAge (ev) {
         
        const { name} = ev.target;
        await api.post('/users', name)
        //.then( (res)=>res.json()) 
        .then((data)=> console.log(data))
        .catch(error => console.error("There was an error!", error)); 

    };



    return (
        <div>
            <img className="ageImg" src={bot} alt="Chatnilton" />
            <div className="age">
                <p>Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?</p>
            </div>


            <Formik
                initialValues={{
                    date: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.resetForm();
                    
                }}
            >
                {({ errors, touched }) => (
                    (
                        <Form>
                            <Field className="ageForm" name="date" placeholder="date" type="date" onBlur={fetcAge}/>
                            <ErrorMessage component="span" name="date" />
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

export default Age;