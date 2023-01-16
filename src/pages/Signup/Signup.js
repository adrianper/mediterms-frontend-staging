import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid, TextField } from 'components'
import { signup } from 'redux/reducers/auth/authSlice'
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
        <Grid className="login" itemsX="center" gap="1em">
            <h2>Signup</h2>

            <form onSubmit={handleSumbit}>
                <Grid w100 className="login__form" maxWidth="20em" gap="1em">
                    <TextField label="Name"
                        value={formData.name}
                        onChange={v => handleChange(v, 'name')}
                    />
                    <TextField label="Email"
                        type="email"
                        value={formData.email}
                        onChange={v => handleChange(v, 'email')}
                    />
                    <TextField label="Password"
                        type="password"
                        value={formData.password}
                        onChange={v => handleChange(v, 'password')}
                    />
                    <Button type="submit">Register</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default Signup
