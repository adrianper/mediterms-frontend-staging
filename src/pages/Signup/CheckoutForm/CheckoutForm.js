import React, { useState } from 'react';
import axios from "axios";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button, Text } from 'components'
import { useDispatch } from 'react-redux';
import { login, reset } from 'redux/reducers/auth/authSlice';

const CheckoutForm = (props) => {
  const { formData, clientSecret, setError, setShowError, setSuccessfulAccount } = props
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null)
  

  const dispatch = useDispatch()

  const handleSubmit = async event => {
    let signupToken = null
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      console.log("pago valido")
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (formData.email === '' || formData.password === '' || formData.name === ''){
      setError('Hay campos vacios')
      setShowError(true)
    }else {

    setShowError(false)
    try {
      const signupResponse = await axios.post('/user/signup', { ...formData, clientSecret: { clientSecret } })
      signupToken = signupResponse.data?.token || null
    } catch (error) {
      if (error.response.data)
        setErrorMessage(error.response.data.errors[0])
      else
        setErrorMessage(error.message)
      return
    }
    console.log('user created')

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://www.google.com/',
        
      },
      redirect: 'if_required',
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log("error",error)
      console.log('Delete user')
      axios.delete('/user/delete', {
        headers: {
          Authorization: `Bearer ${signupToken}`
        }
      })
        .then(() => {
          dispatch(reset())
          global.clearSession()
        })
      setErrorMessage(error.message)
    } else {
      
      setSuccessfulAccount(true)
      // dispatch(login({ email: formData.email, password: formData.password }))

      console.log("entra al else", error)
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <Text style={{marginTop: '1em'}} color="error" align="center">{errorMessage}</Text>}
      <Button style={{marginTop: '1em'}} type="submit" >Pagar y abrir cuenta</Button>
      {/* Show error message to your customers */}
    </form>
  );
};

export default CheckoutForm;