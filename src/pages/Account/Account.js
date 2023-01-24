import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { /*useNavigate,*/ Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import { Button, Grid, TextField, Text } from 'components'
import { routes } from 'routing/routes'

import './account.scss'

const Account = () =>{

    return(
        <Grid className="account" itemsX="center" gap="0.7em" padding="1.14em 0.42em">
            <Grid gap="1.71em" itemsX="center"  padding="1.71em 4.57em" className="account__user_info">
                <Grid itemsX="center" gap="0.7em">
                    <img src="https://magiei2.s3.us-east-2.amazonaws.com/public/img/icons/icono_usuario.svg" />
                    <Text medium>Eduardo Enigma</Text>
                    <Text medium>riddlemethis@gmail.com</Text>
                </Grid>
                <PageLink to={routes.changePassword.path} >
                    <Button>Cambiar contraseña</Button>
                </PageLink>
            </Grid>
            <Grid gap="1.14em" padding="1.71em 1.14em" className="account__user_points">
                <Text>Términos respondidos correctamente:</Text>
                <Grid columns="auto 1fr" gap="1.14em 3.78em">
                    <Text medium>Subfijos:</Text>
                    <Text bold color="first" size="6" >4430</Text>
                    <Text bold size="4">TOTAL:</Text>
                    <Text bold color="first" size="6" >6630</Text>
                </Grid>
            </Grid>
            <Button className="account__logout">Cerrar sesión</Button>
        </Grid>
    )
}

export default Account
