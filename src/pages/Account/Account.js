import React, { useCallback, useEffect, useState } from 'react'
import { Button, Grid, TextField, Text } from 'components'

import './account.scss'
import axios from 'axios'


const Account = () => {

    const topicWithTotalMock = [
        { 'topic_name': 'Topico 1', total: 2546 },
        { 'topic_name': 'Topico 2', total: 222 },
        { 'topic_name': 'Topico 3', total: 333 },
    ];
    
    const [topicWithTotal, setTopicsWithTotal] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/scores/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setTopicsWithTotal(res.data)    
        }).catch(err => {
            console.log(err.response.statusText)
            setError(err.response.statusText)
        })
    },[])


    return (
        <Grid className="account" itemsX="center" gap="0.7em" padding="1.14em 0.42em">
            <Grid gap="1.71em" itemsX="center" padding="1.71em 4.57em" className="account__user_info">
                <Grid itemsX="center" gap="0.7em">
                    <img src="https://magiei2.s3.us-east-2.amazonaws.com/public/img/icons/icono_usuario.svg" />
                    <Text medium>Eduardwerwelkjllkjlkjo Enigma</Text>
                    <Text medium>riddlemethis@gmail.com</Text>
                </Grid>
                <Button>Cambiar contraseña</Button>
            </Grid>
            <Grid gap="1.14em" padding="1.71em 1.14em" className="account__user_points">
                <Text>Términos respondidos correctamente:</Text>
                {
                    topicWithTotal.map(topic =>
                        <Grid  key={topic.id} columns="auto 1fr" gap="1.14em 3.78em">
                            <Text  medium>{topic.topic_name}</Text>
                            <Text  bold color="first" size="6" >{topic.total}</Text>
                        </Grid>
                    )}
            </Grid>
            <Button className="account__logout">Cerrar sesión</Button>
        </Grid>
    )
}

export default Account
