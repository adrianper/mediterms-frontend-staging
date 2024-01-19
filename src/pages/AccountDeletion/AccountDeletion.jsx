import axios from 'axios'
import { Button, Grid, Text } from 'components'
import { useLoadingAppContext } from 'hooks'
import React from 'react'

const AccountDeletion = () => {

    const { startLoading } = useLoadingAppContext()

    const deleteAccount = async () => {
        startLoading()
        try {
            const response = await axios.delete('/user/account/delete')
            if (response.data.success) {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                localStorage.removeItem('md_v_u_s')
                localStorage.removeItem('md_ac_u_s')
                localStorage.clear()
                document.location.reload()
            }
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
