import React from 'react'
import { Link as PageLink } from 'react-router-dom'

import { Grid, Text } from 'components'

import { routes } from 'routing/routes'

import './ios_payment_display.scss'

const IOSPaymentDisplay = () => {
    return (
        <Grid padding="1rem">
            <Grid className="ios_payment_display" gap="2rem" padding="2rem" itemsX="center">
                <Text bold align="center" size="8" color="first">¡Felicidades!</Text>
                <Grid>
                    <Text medium align="center">Has aprendido 10 términos médicos</Text>
                    <Text medium align="center">Adquiere una membresía para seguir aprendiendo</Text>
                </Grid>
                <Text medium align="center">
                    El pago no puede ser realizado desde la aplicación. Entendemos el inconveniente.
                </Text>
                <PageLink to={routes.home.path}>
                    <Grid className="img_container">
                        <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png" />
                    </Grid>
                </PageLink>
            </Grid>
        </Grid>
    )
}

export default IOSPaymentDisplay
