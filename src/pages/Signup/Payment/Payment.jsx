import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'components'
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Payment = () => {
  
  return (

    <Grid className="signup_payment">
        <Grid padding="1.42em" className="signup__price_container">
            <Text>Precio regular: <br/><span className="signup__regular_price">$25 USD</span></Text>
            <Text style={{margin:'1.4em 0em 0.5em 0em'}}>Promoción de inicio de semestre:</Text>
            <Text bold size="9">9.99<span style={{fontSize: '24px', color: '#162127'}}>USD</span></Text>
        </Grid>

        <Text bold size="5" align="center">Método de pago</Text>
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    </Grid>
  );
};

export default Payment;