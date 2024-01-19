import axios from 'axios'
import { Button, Grid, Text } from 'components'
import React from 'react'

const AccountDeletion = () => {

    const deleteAccount = async () => {
        try {
            await axios.delete('/user/account/delete')
        } catch (error) {
            console.error('DELETE_ACCOUNT_ERROR', error)
        }
    }

    return (
        <Grid itemsX='center' padding='2rem' gap='1rem' margin='1rem' style={{ alignSelf: 'start', backgroundColor: 'var(--bg-color--white)', borderRadius: '16px' }}>
            <Text>
                Al eliminar tu cuenta se borraran todos los datos relacionados a ella incluyendo datos personales, puntuaciónes, premios y rankings
            </Text>

            <Text bold>
                ESTA ACCION NO SE PUEDE DESHACER
            </Text>

            <Button onClick={deleteAccount} style={{ backgroundColor: 'var(--bg-color--error)' }}>Eliminar cuenta</Button>
        </Grid>
    )
}

export default AccountDeletion
