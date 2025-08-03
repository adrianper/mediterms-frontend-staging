import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from 'components'
import { login, reset } from 'reduxStore/reducers/auth/authSlice';

const CheckoutForm = (props) => {
  const navigate = useNavigate()
  const { clientSecret, setError, setShowError } = props
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async event => {
    let signupToken = null
    console.log("entra al handleSubmit")
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("pago valido")
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://www.google.com/',

      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message)
      console.log("error", error)
      console.log('Delete user')
    } else {

      try {
        const updateResponse = await axios.post('http://localhost:3000/payment_renewal', {
          clientSecret: { clientSecret },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });



        await axios.post('http://localhost:3000/user/get_payment_status', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          localStorage.setItem('paymentStatus', res.data.paymentStatus)
          navigate('/home')
        });

      } catch (error) {
        console.log(error)
        // if (error.response.data)
        //   setErrorMessage(error.response.data.errors[0])
        // else
        //   setErrorMessage(error.message)
        return
      }
      console.log('user created')



    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" >Pagar y abrir cuenta</Button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;