import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { /*useNavigate,*/ Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import axios from 'axios';

import { Button, Grid, Text } from 'components'
import { routes } from 'routing/routes'
import './no_verified_account.scss'

const NoVerifiedAccount = () =>{

    return(
        <Grid w100 className="no_verified_account" padding="1.71em 0.62em">
            <Grid w100 padding="2.85em 1.1em" gap="1.71em" className="no_verified_account__container" >
                <Text medium align="center">Revisa tu bandeja de entrada en tu correo electrónico para terminar el proceso de apertura de cuenta</Text>
                <Grid gap="1.14em">
                    <PageLink to={routes.login.path} >
                        <Grid>
                            <Button selfCenter>Entendido</Button>
                        </Grid>
                    </PageLink>
                    <Grid>
                        <Button className="send_email_button" selfCenter>Reenviar correo</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default NoVerifiedAccount
