import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { Button, Grid, TextField, Text } from 'components'
import axios from "axios"

import './recover_password.scss'

const RecoverPassword = (props) => {
    const { setRecoverPassword } = props
    const [recoveredPassword, setRecoveredPassword] = useState(false)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')

    const sendEmail = async () => {
        if (email != '') {
            const response = await axios.post("user/reset_password", { email }).catch((err) => { setError(err.response.data.errors[0]) })
            if (response.data && !response.data.error) {
                setRecoveredPassword(true)
            }
        } else {
            setError('Hay campos vacios')
        }
    }

    return (
        <Grid>
            <Grid w100 padding="1.72em 1.1em" className="recover_password" maxWidth="22em">
                {!recoveredPassword ?
                    <Grid gap="1.3em">
                        <Text bold align="center" size="5">Recuperar tu contraseña</Text>
                        <TextField label="Correo electrónico"
                            type="email"
                            value={email}
                            onChange={v => setEmail(v)}
                        />
                        {error != '' &&
                            <Text size="2" color="error" align="center">{error}</Text>
                        }
                        <Text medium align="center">Enviaremos información a este correo electrónico para recuperar tu contraseña.</Text>
                        <Button selfCenter onClick={() => { sendEmail() }}>Recuperar</Button>
                        <Text medium align="center" color="first" onClick={() => { setRecoverPassword(false) }}>Regresar</Text>
                    </Grid>
                    :
                    <Grid padding="3.78em 0em" gap="1.71em">
                        <Text medium align="center">Se han enviado instrucciones para recuperar la contraseña a tu correo electrónico.</Text>
                        <Button selfCenter onClick={() => { setRecoverPassword(false) }}>Entendido</Button>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default RecoverPassword
