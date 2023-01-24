import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { Button, Grid, TextField, Text } from 'components'
import './recover_password.scss'

const RecoverPassword = (props) =>{
    const { setRecoverPassword } = props
    const [recoveredPassword, setRecoveredPassword] = useState(false)
    const [email, setEmail] = useState('')

    return(
        <Grid>
            <Grid w100 padding="1.72em 1.1em" className="recover_password"  maxWidth="22em">
                {!recoveredPassword ?
                <Grid gap="1.3em">
                    <Text bold align="center" size="5">Recuperar tu contraseña</Text>
                    <TextField label="Correo electrónico"
                        type="email"
                        value={email}
                        onChange={v => setEmail(v)}
                    />
                    <Text medium align="center">Enviaremos información a este correo electrónico para recuperar tu contraseña.</Text>
                    <Button selfCenter onClick={() => {setRecoveredPassword(true)}}>Recuperar</Button>
                </Grid>
                :
                <Grid padding="3.78em 0em" gap="1.71em">
                    <Text medium align="center">Se ha enviado una contraseña provisional al correo electrónico.</Text>
                    <Button selfCenter onClick={() => {setRecoverPassword(false)}}>Entendido</Button>
                </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default RecoverPassword
