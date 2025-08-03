import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { Button, Grid, TextField, Text } from 'components'
import { signup } from 'reduxStore/reducers/auth/authSlice'

import CheckoutForm from './CheckoutForm/CheckoutForm';


import './payment_renewal.scss'

// import { toast } from 'react-toastify'
const stripePromise = loadStripe('pk_test_51MPJqDCMUMmnWPNk2Z3N0IapLcdoh6sDuOpjbn0bRN2p2HZiCAcekAb047GFQ2VWuA1UkYgPd2yVpWQ0BKRoH7JK00LvVb20az');

const PaymentRenewal = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [clientSecret, setClientSecret] = useState('')
    const [emailError, setEmailError] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const { auth } = useSelector(store => store)
    const { /*user, */authenticated } = auth

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: clientSecret,
        // Fully customizable with appearance API.
        appearance: {
            layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false
            }
        },
    };

    const handleChange = useCallback((value, name) => {
        setFormData(formData => ({ ...formData, [name]: value }))
    }, [])

    const handleSumbit = async e => {
        e.preventDefault()
          
        dispatch(signup(formData)).then(res => {
            if (res.payload.error) return console.error(res.payload.error)// toast.error(res.payload.error)
        })
    }



    useEffect(() =>{
        axios.post(`http://localhost:3000/payment/create-payment-intent`)
          .then(res => {
            setClientSecret(res.data.secret_client)
            
          })
          
    },[])



    return (
        <Grid className="signup" padding="2.28em 1.57em" itemsX="center" gap="2.18em">
            <Text bold size="5">Renueva tu cuenta</Text>

            <form onSubmit={handleSumbit}>
                <Grid w100 className="signup__form" gap="1.61em">
                    <Grid padding="1.42em" className="signup__price_container">
                        <Text>Precio regular: <br/><span className="signup__regular_price">$25 USD</span></Text>
                        <Text style={{margin:'1.4em 0em 0.5em 0em'}}>Promoción de inicio de semestre:</Text>
                        <Text bold size="9">9.99<span style={{fontSize: '24px', color: '#162127'}}>USD</span></Text>
                    </Grid>

                    <Text bold size="5" align="center">Método de pago</Text>
                    {showError && <Text color="error">{error}</Text>}
                    

                    {/* <Button type="submit" selfCenter>Pagar y abrir cuenta</Button> */}
                </Grid>
            </form>
            {clientSecret != "" &&
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm setError={setError} setShowError={setShowError} formData={formData} clientSecret={clientSecret} />
            </Elements>
            }
        </Grid>
    )
}

export default PaymentRenewal
