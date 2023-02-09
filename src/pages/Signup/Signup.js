import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link as PageLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { routes } from 'routing/routes'

import { Button, Grid, TextField, Text, CharacterField } from 'components'
import { login, signup } from 'redux/reducers/auth/authSlice'

import CheckoutForm from './CheckoutForm/CheckoutForm';


import './signup.scss'

// import { toast } from 'react-toastify'
const stripePromise = loadStripe('pk_test_51MPJqDCMUMmnWPNk2Z3N0IapLcdoh6sDuOpjbn0bRN2p2HZiCAcekAb047GFQ2VWuA1UkYgPd2yVpWQ0BKRoH7JK00LvVb20az');

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', promoCodeId: null, institution: '' })
    const [clientSecret, setClientSecret] = useState('')
    const [emailError, setEmailError] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const { auth } = useSelector(store => store)
    const { /*user, */authenticated } = auth
    const [successfulAccount, setSuccessfulAccount] = useState(false)
    const [promoError, setPromoError] = useState('')
    const [validPromoCode, setValidPromoCode] = useState(false)
    const [newPrice, setNewPrice] = useState(1299)
    const [freeAccount, setFreeAccount] = useState(false)
    const [distance, setDistance] = useState(0);
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

    const verifyEmptyValues = () => {
        const errors = []
        Object.keys(formData).forEach(input => {
            if (formData[input] === '') errors.push(`${input} could not be empty`)
        })
        if (errors.length > 0) alert(errors.map(err => err + '\n'))
        return errors.length === 0
    }

    const handleSumbit = async e => {
        e.preventDefault()

        dispatch(signup(formData)).then(res => {
            if (res.payload.error) return console.error(res.payload.error)// toast.error(res.payload.error)
        })
    }

    const validateEmail = useCallback(async () => {
        try {
            const response = await axios.get(`/user/email/validate?email=${formData.email}`)
            if (response.data.valid) setEmailError('')
        } catch (error) {
            setEmailError(error.response.data?.errors[0] || 'El correo ya esta en uso. Elige otro.')
        }
    }, [formData.email])

    const loginAuto = () => {
        dispatch(login({ email: formData.email, password: formData.password }))
    }

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
                            break;
                    }
                })
                .catch(function (error) {
                    setPromoError(error.response.data.errors[0])
                });
        } else {
            setFreeAccount(false)
        }
    }

    useEffect(() => {
        if (authenticated) navigate('/users')

    }, [authenticated, navigate])

    useEffect(() => {
        axios.post(`/payment/create-payment-intent`, {
            price: newPrice
        })
            .then(res => {
                console.log(res.data.secret_client)
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

    return (

        <Grid>
            {successfulAccount ?
                <Grid className="singup_successfuly" padding="2.28em 1.57em" itemsX="center" gap="2.18em" >
                    <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png" />
                    <Grid w100 padding="2em" className="singup_successfuly__container" gap="2.18em">
                        <Text medium align="center">Tu cuenta ha sido creada con éxito</Text>
                        <Button onClick={() => { loginAuto() }} selfCenter>Empezar a aprender</Button>
                    </Grid>
                </Grid>
                :
                <Grid className="signup" padding="2.28em 1.57em" itemsX="center" gap="2.18em">
                    <Text bold align="center" size="5">Abre una cuenta</Text>

                    <form onSubmit={handleSumbit}>
                        <Grid w100 className="signup__form" gap="1.61em">
                            <TextField label="Nombre completo"
                                value={formData.name}
                                onChange={v => handleChange(v, 'name')}
                            />
                            <TextField label="Institución educativa"
                                value={formData.institution}
                                onChange={v => handleChange(v, 'institution')}
                            />
                            <TextField label="Correo electrónico"
                                type="email"
                                value={formData.email}
                                onChange={v => handleChange(v, 'email')}
                                onBlur={validateEmail}
                            />
                            {emailError && <Text color="error">{emailError}</Text>}
                            <TextField label="Contraseña"
                                type="password"
                                value={formData.password}
                                onChange={v => handleChange(v, 'password')}
                            />
                            {showError && <Text color="error" align="center">{error}</Text>}

                            {!freeAccount &&
                                <Grid style={{ gap: 'inherit' }}>
                                    <Grid padding="1.42em" className="signup__price_container">
                                        <Text>Precio regular: <br /><span className="signup__regular_price">$25 USD/año</span></Text>
                                        <Text medium style={{ margin: '1.4em 0em 0.5em 0em' }}>Promoción de inicio de semestre:</Text>
                                        <Text bold size="9">12.99<span style={{ fontSize: '24px', color: '#162127' }}>USD/año</span></Text>
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
                                <Grid padding="1.42em" gap="0.7em" className="signup__promo_container">
                                    <Text bold color="white" size="4">¡Tienes un descuento!</Text>
                                    <Text medium color="white">Tu nuevo total es:</Text>
                                    <Text bold color="white" size="9">9.99<span style={{ fontSize: '24px' }}>USD/año</span></Text>
                                </Grid>
                            }
                            {!freeAccount && <Text bold size="5" align="center">Selecciona método de pago</Text>}


                            {/* <Button type="submit" selfCenter>Pagar y abrir cuenta</Button> */}
                        </Grid>
                        {!freeAccount &&
                            <Grid>
                                <Text align="center" medium style={{ margin: '1.4em 0em 0.5em 0em' }} >Pagos procesados por:</Text>
                                <img src='https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/stripe-payment.png' className='signup__stripe_logo' />
                            </Grid>
                        }
                    </form>
                    {clientSecret != "" &&
                        <Elements stripe={stripePromise} options={options} key={clientSecret}>
                            <CheckoutForm setSuccessfulAccount={setSuccessfulAccount} setError={setError} setShowError={setShowError} formData={formData} freeAccount={freeAccount} clientSecret={clientSecret} />
                        </Elements>
                    }
                </Grid>
            }
        </Grid>
    )
}

export default Signup
