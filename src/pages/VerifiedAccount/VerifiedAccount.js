import React, { useCallback, useEffect, useState } from 'react'
import { /*useNavigate,*/ Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import axios from 'axios';

import { Button, Grid, Text } from 'components'
import { routes } from 'routing/routes'
import './verified_account.scss'

const VerifiedAccount = () =>{
    const [verifiedToken, setVerifiedToken] = useState('')

    useEffect(() => {
        const url = new URL(window.location.href);
        setVerifiedToken(url.hash.split('=').pop());
    }, []);

    return(
        <Grid w100 className="verified_account" padding="1.71em 0.62em">
            <Grid w100 padding="2.85em 1.1em" gap="1.71em" className="verified_account__container" >
                <Text medium align="center">!Tu cuenta ha sido verificada con éxito!</Text>
                <Text medium align="center">Ingresa a la app con tus credenciales</Text>
                <Grid gap="1.14em">
                    <PageLink to={routes.login.path} >
                        <Grid>
                            <Button selfCenter>Empezar a aprender</Button>
                        </Grid>
                    </PageLink>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default VerifiedAccount
