import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button } from 'components'

const CheckoutForm = (props) => {
  const { formData, clientSecret } = props
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async event => {
    console.log("entra al handleSubmit")
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      console.log("pago valido")
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

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
      setErrorMessage(error.message);
    } else {
      
      const options = {
        url: 'http://localhost:3000/user/signup',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          ...formData,
          clientSecret: {clientSecret}
        }
      }
      axios(options)
        .then(response => {
          console.log("response",response);
      });

      console.log("entra al else", error)
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
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