import React from 'react';
import '../styles/City.css';
import bot from '../assets/images/chatbot.png';

import api from '../services/api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaPaperPlane } from 'react-icons/fa';


const SignupSchema = Yup.object().shape({
    cidade: Yup.string()
        .required('Escolha um campo'),

});

const City = () => {

    async function fetcCity (ev) {
         
        const { name} = ev.target;
        await api.post('/users', name)
        //.then( (res)=>res.json()) 
        .then((data)=> console.log(data))
        .catch(error => console.error("There was an error!", error)); 

    };


    return (
        <div>
            <img className="cityImg" src={bot} alt="Chatnilton" />
            <div className="city">
                <p> Que satisfação.Agora que sei seu nome, qual a cidade e estado que você mora?</p>
            </div>


            <Formik
                initialValues={{
                    cidade: '',
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
                            <Field component="select" name="cidade" className="cityForm" onBlur={fetcCity} >
                                <option value={null}>Selecione a cidade</option>
                                <option value="São Paulo">São Paulo</option>
                                <option value="São Paulo">São Paulo</option>
                                
                                
                            </Field>
                            {errors.cidade && touched.cidade ? (
                                <div>{errors.cidade}</div>
                            ) : null}
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

export default City;