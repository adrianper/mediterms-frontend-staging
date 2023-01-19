import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid, TextField, Text } from 'components'
import { signup } from 'redux/reducers/auth/authSlice'

import './signup.scss'

// import { toast } from 'react-toastify'

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })

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

        dispatch(signup(formData)).then(res => {
            if (res.payload.error) return console.error(res.payload.error)// toast.error(res.payload.error)
        })
    }

    useEffect(() => {
        if (authenticated) navigate('/users')
    }, [authenticated, navigate])

    return (
        <Grid className="signup" padding="2.28em 1.57em" itemsX="center" gap="2.18em">
            <Text bold size="5">Abre una cuenta</Text>

            <form onSubmit={handleSumbit}>
                <Grid w100 className="signup__form" gap="1.61em">
                    <TextField label="Nombre completo"
                        value={formData.name}
                        onChange={v => handleChange(v, 'name')}
                    />
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
                    <Grid padding="1.42em" className="signup__price_container">
                        <Text>Precio regular: <br/><span className="signup__regular_price">$25 USD</span></Text>
                        <Text style={{margin:'1.4em 0em 0.5em 0em'}}>Promoción de inicio de semestre:</Text>
                        <Text bold size="9">9.99<span style={{fontSize: '24px', color: '#162127'}}>USD</span></Text>
                    </Grid>

                    <Text bold size="5" align="center">Método de pago</Text>

                    <Button type="submit" selfCenter>Pagar y abrir cuenta</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default Signup
