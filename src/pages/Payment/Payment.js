import React, { useCallback, useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core';
import axios from 'axios';
import { useNavigate, Link as PageLink } from 'react-router-dom'
import { useDispatch, /*useSelector */} from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { routes } from 'routing/routes'

import { Button, Grid, Text, CharacterField } from 'components'
import { signup } from 'redux/reducers/auth/authSlice'

import IOSPaymentDisplay from 'pages/IOSPaymentDisplay/IOSPaymentDisplay';
import CheckoutForm from './CheckoutForm/CheckoutForm';

import './payment.scss'

// import { toast } from 'react-toastify'
const stripePromise = loadStripe('pk_live_51MQxscExfdqgYaIWLCQTtXpwTMTPy8WyE2lQD9qHyDTswIAncvaZPX9yxzTibhS94AnDOreoECpanSay0OO18Qja00PEDA7HeM ');

const Payment = () => {
    const [formData, setFormData] = useState({ promoCodeId: null })
    const [clientSecret, setClientSecret] = useState('')
    // const [emailError, setEmailError] = useState('')
    const /*[error, */setError/*] */= useState('')[1]
    const /*[showError, */setShowError/*]*/ = useState(false)[1]
    // const { auth } = useSelector(store => store)
    // const { /*user, */authenticated } = auth
    const [successfulAccount, setSuccessfulAccount] = useState(false)
    const [promoError, setPromoError] = useState('')
    const [validPromoCode, setValidPromoCode] = useState(false)
    const [newPrice, setNewPrice] = useState(1469)
    const [freeAccount, setFreeAccount] = useState(false)
    const [distance, setDistance] = useState(0);
    const [promoPriceText, setPromoPriceText] = useState("9.99")
    const promoCodeLength = 6
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

    // const verifyEmptyValues = () => {
    //     const errors = []
    //     Object.keys(formData).forEach(input => {
    //         if (formData[input] === '') errors.push(`${input} could not be empty`)
    //     })
    //     if (errors.length > 0) alert(errors.map(err => err + '\n'))
    //     return errors.length === 0
    // }

    const handleSumbit = async e => {
        e.preventDefault()

        dispatch(signup(formData)).then(res => {
            if (res.payload.error) return console.error(res.payload.error)// toast.error(res.payload.error)
        })
    }

    // const validateEmail = useCallback(async () => {
    //     try {
    //         const response = await axios.get(`/user/email/validate?email=${formData.email}`)
    //         if (response.data.valid) setEmailError('')
    //     } catch (error) {
    //         setEmailError(error.response.data?.errors[0] || 'El correo ya esta en uso. Elige otro.')
    //     }
    // }, [formData.email])

    const handlePromotionalCode = (v) => {
        if (v.length === promoCodeLength) {
            axios.post('/payment/promo_code/validate', {
                "promoCode": v.join('')
            })
                .then(function (response) {
                    let price = response.data.newPrice * 100
                    switch (price) {
                        case 0:
                            setFreeAccount(true)
                            setPromoError('')
                            handleChange(response.data.promoCodeId, 'promoCodeId')
                            setValidPromoCode(false)
                            break;
                        case 999:
                            setPromoError('')
                            setValidPromoCode(true)
                            handleChange(response.data.promoCodeId, 'promoCodeId')
                            setNewPrice(price)
                            setPromoPriceText("9.99")
                            break;
                        case 1099:
                            setPromoError('')
                            setValidPromoCode(true)
                            handleChange(response.data.promoCodeId, 'promoCodeId')
                            setNewPrice(price)
                            setPromoPriceText("10.99")
                            break;
                        case 699:
                            setPromoError('')
                            setValidPromoCode(true)
                            handleChange(response.data.promoCodeId, 'promoCodeId')
                            setNewPrice(price)
                            setPromoPriceText("6.99")
                            break;
                        default:
                    }
                })
                .catch(function (error) {
                    setPromoError(error.response.data.errors[0])
                });
        } else {
            setFreeAccount(false)
        }
    }

    // useEffect(() => {
    //     if (authenticated) navigate('/users')

    // }, [authenticated, navigate])

    useEffect(() => {
        axios.post(`/payment/create-payment-intent`, {
            price: newPrice
        })
            .then(res => {
                setClientSecret(res.data.secret_client)
            })
            .catch(function (error) {
                console.log("error", error)
            });

    }, [newPrice])

    useEffect(() => {
        const countDownDate = new Date()
        countDownDate.setDate(countDownDate.getDate() + 2);
        const x = setInterval(() => {
            const now = new Date().getTime();
            setDistance(countDownDate - now);
        }, 1000);
        return () => clearInterval(x);
    }, []);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (Capacitor.getPlatform() === 'ios') return <IOSPaymentDisplay />

    return (
        <Grid>
            {successfulAccount ?
                <Grid className="payment_successfuly" padding="2.28em 1.57em" itemsX="center" gap="2.18em" >
                    <img alt='mediterms logo' src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png" />
                    <Grid w100 padding="2em" className="payment_successfuly__container" gap="2.18em">
                        <Text medium align="center">¡Tu pago ha sido exitoso, y tu membresía ahora se encuentra activa!</Text>
                        <Button onClick={() => { navigate('/home') }} selfCenter>Empezar a aprender</Button>
                    </Grid>
                </Grid>
                :
                <Grid className="payment" padding="2.28em 1.57em" itemsX="center" gap="2.18em">
                    {!freeAccount &&
                        <Text bold align="center" size="8" color="first">¡Felicidades!</Text>
                    }
                    {!freeAccount &&
                        <Grid gap="1em">
                            <Text medium align="center">Has aprendido 30 términos médicos</Text>
                            <Text medium align="center">Adquiere una membresía para seguir aprendiendo</Text>
                        </Grid>
                    }
                    <form onSubmit={handleSumbit}>
                        <Grid w100 className="payment__form" gap="1.61em">
                            {!freeAccount &&
                                <Grid style={{ gap: 'inherit' }}>
                                    <Grid padding="1.42em" className="payment__price_container">
                                        <Text>Precio regular: <br /><span className="payment__regular_price">$25 USD/año</span></Text>
                                        <Text medium style={{ margin: '1.4em 0em 0.5em 0em' }}>Promoción de inicio de semestre:</Text>
                                        <Text bold size="9">14.69<span style={{ fontSize: '24px', color: '#162127' }}>USD/año</span></Text>
                                        <Text bold color="error" size="2">Termina en: {days}d {hours}h {minutes}m {seconds}s</Text>
                                    </Grid>
                                    <Text bold align="center" size="5">¿Tienes un código de descuento?</Text>
                                </Grid>
                            }
                            <Grid gap="0.7em" itemsX="center">
                                <CharacterField onChange={handlePromotionalCode} length={promoCodeLength} />
                                {promoError !== '' &&
                                    <Text color="error">{promoError}</Text>
                                }
                            </Grid>
                            {!freeAccount &&
                                <PageLink to={routes.institutions.path} >
                                    <Text medium style={{ textDecoration: 'underline' }} align="center" color="first">Ver instituciones educativas que ofrecen códigos a sus alumnos</Text>
                                </PageLink>
                            }
                            {validPromoCode &&
                                <Grid padding="1.42em" gap="0.7em" className="payment__promo_container">
                                    <Text bold color="white" size="4">¡Tienes un descuento!</Text>
                                    <Text medium color="white">Tu nuevo total es:</Text>
                                    <Text bold color="white" size="9">{promoPriceText}<span style={{ fontSize: '24px' }}>USD/año</span></Text>
                                </Grid>
                            }
                            {!freeAccount && <Text bold size="5" align="center">Selecciona método de pago</Text>}

                            {freeAccount &&
                                <Grid padding="1.42em" gap="0.7em" className="payment__promo_container">
                                    <Text bold align="center" color="white" size="4">¡Tienes una cortesía para abrir tu cuenta gratis!</Text>
                                </Grid>
                            }

                            {/* <Button type="submit" selfCenter>Pagar y abrir cuenta</Button> */}
                        </Grid>
                        {!freeAccount &&
                            <Grid>
                                <Text align="center" medium style={{ margin: '1.4em 0em 0.5em 0em' }} >Pagos procesados por:</Text>
                                <img alt='stripe payment' src='https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/stripe-payment.png' className='payment__stripe_logo' />
                            </Grid>
                        }
                    </form>
                    {clientSecret !== "" &&
                        <Elements stripe={stripePromise} options={options} key={clientSecret}>
                            <CheckoutForm setSuccessfulAccount={setSuccessfulAccount} setError={setError} setShowError={setShowError} formData={formData} freeAccount={freeAccount} clientSecret={clientSecret} />
                        </Elements>
                    }
                </Grid>
            }
        </Grid>
    )
}

export default Payment
