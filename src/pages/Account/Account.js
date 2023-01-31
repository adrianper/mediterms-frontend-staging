
import React, { useCallback, useEffect, useState } from 'react'
import { Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import { Button, Grid, TextField, Text } from 'components'
import { routes } from 'routing/routes'

import './account.scss'
import axios from 'axios'


const Account = () => {
    const [topicWithTotal, setTopicsWithTotal] = useState([])
    const [error, setError] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const DEFAULT_PROFILE_PHOTO = "https://magiei2.s3.us-east-2.amazonaws.com/public/img/icons/icono_usuario.svg"

    useEffect(() => {
        axios.get('/scores/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setTopicsWithTotal(res.data)
            let data = JSON.parse(localStorage.getItem('user'))
            setName(data.name)
            setEmail(data.email)   
        }).catch(err => {
            console.log(err.response.statusText)
            setError(err.response.statusText)
            
        })
    },[])

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.clear()
        document.location.reload()
    }

    let userObject =  JSON.parse(localStorage.getItem('user'))
    const photoUrl = userObject.photoUrl !== undefined ? <img src={DEFAULT_PROFILE_PHOTO} className="user_info__default"/> : <img src={userObject.photoUrl} className="account__user_photo" />
    return (
        <Grid className="account" itemsX="center" gap="0.7em" padding="1.14em 0.42em">
            <Grid w100 gap="1.71em" itemsX="center" padding="1.71em 4.57em" className="account__user_info">
                <Grid itemsX="center" gap="0.7em">
                    {photoUrl}
                    <Text medium>{name}</Text>
                    <Text medium>{email}</Text>
                </Grid>
                <PageLink to={routes.changePassword.path} >
                    <Button>Cambiar contraseña</Button>
                </PageLink>
            </Grid>
            <Grid w100 gap="1.14em" padding="1.71em 1.14em" className="account__user_points">
                <Text>Términos respondidos correctamente:</Text>
                {
                    topicWithTotal.map(topic =>
                        <Grid  key={topic.id} columns="2fr 1fr" gap="1.14em 3.78em">
                            <Text style={{alignSelf: 'center'}} medium className={`${topic.topic_name === 'Total' ? 'account__total_bold' : ''}`}>{topic.topic_name === 'Total' ? topic.topic_name.toUpperCase(): topic.topic_name}:</Text>
                            <Text bold color="first" size="6" >{topic.total}</Text>
                        </Grid>
                    )}
            </Grid>
            <Button style={{marginTop: '0.52em'}} onClick = {()=>{logOut()}} className="account__logout">Cerrar sesión</Button>
        </Grid>
    )
}

export default Account
