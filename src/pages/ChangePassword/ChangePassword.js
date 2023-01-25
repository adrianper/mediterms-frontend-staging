import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { /*useNavigate,*/ Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import axios from 'axios';

import { Button, Grid, TextField, Text } from 'components'
import { routes } from 'routing/routes'
import './change_password.scss'

const ChangePassword = () =>{
    const [formData, setFormData] = useState({ password: '', newPassword: '', confirmedPassword: '' })
    const [error, setError] = useState('')
    const [successfulChange, setSuccessfulChange] = useState(false)

    const handleChange = useCallback((value, name) => {
        setFormData(formData => ({ ...formData, [name]: value }))
    }, [])

    const handleSumbit = () =>{
        const options = {
            url: 'http://localhost:3000/user/change_password',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              ...formData,
            }
        }
        axios(options)
        .then(response => {
            setSuccessfulChange(true)
        })
        .catch(err =>{
            setError(err.response.data.errors[0])
        })
    }
    return(
        <Grid className="change_password" itemsX="center" gap="4.28em" padding="1.42em 0.42em 0em 0.42em">
            {successfulChange ?
                <Grid w100 padding="3.78em 0em" gap="1.71em" className="change_password__form" maxWidth="22em">
                    <Text align="center">Tu contraseña ha sido actualizada exitosamente</Text>
                    <PageLink to={routes.account.path} >
                        <Grid>
                            <Button selfCenter>Entendido</Button>
                        </Grid>
                    </PageLink>
                </Grid>
            :
                <form onSubmit={handleSumbit}>
                    <Grid w100 padding="1.72em 1.1em" className="change_password__form" gap="1.3em" maxWidth="22em">
                        <Text size="5" align="center" bold>Cambiar contraseña</Text>
                        <TextField label="Contraseña actual"
                            type="password"
                            value={formData.password}
                            onChange={v => handleChange(v, 'password')}
                        />
                        <TextField label="Nueva contraseña"
                            type="password"
                            value={formData.newPassword}
                            onChange={v => handleChange(v, 'newPassword')}
                        />
                        <TextField label="Confirmar contraseña"
                            type="password"
                            value={formData.confirmedPassword}
                            onChange={v => handleChange(v, 'confirmedPassword')}
                        />
                        <Text size="2" color="error" align="center">{error}</Text>
                        <Button type="submit" selfCenter>Cambiar</Button>
                    </Grid>
                </form>
            }
        </Grid>
    )
}

export default ChangePassword
