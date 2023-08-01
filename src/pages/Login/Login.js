import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { useNavigate, Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import { /*useSelector,*/ useDispatch } from 'react-redux'

import { Button, Grid, TextField, Text } from 'components'
import { routes } from 'routing/routes'

import './login.scss'
import RecoverPassword from 'pages/RecoverPassword/RecoverPassword'
import { login/*, reset*/ } from 'redux/reducers/auth/authSlice'
// import { toast } from 'react-toastify'

// withCredentials: true, //[allow sert 3rd party cookies] / [send cookies]
// credentials: 'include' //[send cookies]

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [recoverPassword, setRecoverPassword] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    // const { auth } = useSelector(store => store)
    // const { /*user, */authenticated } = auth

    const navigate = useNavigate()
    // const location = useLocation()
    const dispatch = useDispatch()

    const handleChange = useCallback((value, name) => {
        setFormData(formData => ({ ...formData, [name]: value }))
    }, [])

    const verifyEmptyValues = () => {
        const errors = []
        Object.keys(formData).forEach(input => {
            if (formData[input] === '') errors.push(`${input} No puede ser vacio`)
        })
        // if (errors.length > 0) alert(errors.map(err => err + '\n'))
        if (errors.length > 0) setShowError(true)
        return errors.length === 0
    }

    const handleSumbit = async e => {
        e.preventDefault()

        // if (!verifyEmptyValues()) return
        if (formData.email === '' || formData.password === '') {
            setError('Hay campos vacios')
            setShowError(true)
        } else {
            dispatch(login(formData)).then(res => {
                if (res.error) {
                    setShowError(true)
                    setError('El correo electrónico o la contraseña son incorrectos, intenta de nuevo.')
                    return
                }
                if (localStorage.getItem('paymentStatus') === 'false') {
                    navigate(routes.home.path)
                }
                navigate(routes.home.path)
                //if (res.payload.error) return console.error(res)//toast.error(res.payload.error)
            })
        }
    }

    // const createAccount = () => { }

    // useEffect(() => {
    //     if (authenticated) navigate(location.state?.from.pathname || '/users')
    // }, [authenticated, navigate])

    return (
        <Grid className="login" itemsX="center" gap="4.28em" padding="4.28em 0.42em 0em 0.42em">
            <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png" onClick={() => { setRecoverPassword(false) }} />
            {recoverPassword ?
                <RecoverPassword setRecoverPassword={setRecoverPassword} />
                :
                <form onSubmit={handleSumbit}>
                    <Grid w100 padding="1.72em 1.1em" className="login__form" gap="1.3em" maxWidth="22em">
                        <Text size="5" align="center" bold>Inicia sesión</Text>
                        <TextField label="Correo electrónico"
                            type="email"
                            value={formData.email}
                            onChange={v => handleChange(v, 'email')}
                        />
                        <TextField label="Contraseña"
                            type="password"
                            value={formData.password}
                            onChange={v => handleChange(v, 'password')}
                        />
                        {showError &&
                            <Text size="2" color="error">{error}</Text>
                        }
                        <Button type="submit" selfCenter>Ingresar</Button>

                        <Grid gap="2em" margin="1em 0em 0em 0em">
                            <PageLink to={routes.userSignup.path} >
                                <Text medium align="center" color="first">Abrir una cuenta</Text>
                            </PageLink>
                            <Text onClick={() => { setRecoverPassword(true) }} medium align="center" color="second">Olvidé mi contraseña</Text>
                        </Grid>
                    </Grid>
                </form>
            }
            {/*<Button type="submit" onClick={() => dispatch(reset())}>Reset auth</Button>*/}
        </Grid>
    )
}

export default Login
