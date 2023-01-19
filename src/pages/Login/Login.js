import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Grid, TextField, Text } from 'components'

import './login.scss'
import { login, reset } from 'redux/reducers/auth/authSlice'
// import { toast } from 'react-toastify'

// withCredentials: true, //[allow sert 3rd party cookies] / [send cookies]
// credentials: 'include' //[send cookies]

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })

    const { auth } = useSelector(store => store)
    const { /*user, */authenticated } = auth

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

        if (!verifyEmptyValues()) return

        dispatch(login(formData)).then(res => {
            if (res.payload.error) return console.error(res.payload.error)//toast.error(res.payload.error)
        })
    }

    useEffect(() => {
        if (authenticated) navigate('/users')
    }, [authenticated, navigate])

    return (
        <Grid className="login" itemsX="center" gap="4.28em" padding="4.28em 0em 0em 0em">
            <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png"/>

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
                    <Text size="2" color="error">El correo electrónico o la contraseña son incorrectos, intenta de nuevo.</Text>
                    <Button type="submit" selfCenter>Ingresar</Button>

                    <Grid gap="2em" margin="1em 0em 0em 0em">
                        <Text medium align="center" color="first">Abrir una cuenta</Text>
                        <Text medium align="center" color="second">Olvidé mi contraseña</Text>
                    </Grid>
                </Grid>
            </form>
            {/*<Button type="submit" onClick={() => dispatch(reset())}>Reset auth</Button>*/}
        </Grid>
    )
}

export default Login
