
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import { Button, Grid, TextField, Text } from 'components'
import { routes } from 'routing/routes'
import { useSelector, useDispatch } from 'react-redux'

import './account.scss'
import axios from 'axios'
import { setUser } from 'redux/reducers/auth/authSlice'

const DEFAULT_PROFILE_PHOTO = "https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-user-edit.svg"

const Account = () => {
    const [topicWithTotal, setTopicsWithTotal] = useState([])
    const [error, setError] = useState([])
    const fileReference = useRef()

    const { auth } = useSelector(store => store)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/scores/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setTopicsWithTotal(res.data)
        }).catch(err => {
            setError(err.response.statusText)

        })
    }, [])

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('md_v_u_s')
        localStorage.removeItem('md_ac_u_s')
        localStorage.clear()
        document.location.reload()
    }

    const changeUserPhoto = useCallback((event) => {
        console.log("ALAN", event.target.files[0])
        const options = {
            url: '/user/upload',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                formData: { file: event.target.files[0] },
            }
        }
        axios(options)
            // .then(response => getAccountInfo())
            .then(response => {
                fileReference.current.value = ""
                const user = JSON.parse(localStorage.getItem('user'))
                user.photoUrl = response.data.photoUrl
                localStorage.setItem('user', JSON.stringify(user))
                dispatch(setUser({ photoUrl: response.data.photoUrl }))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleRSSSChange = (e) => {
        switch (e) {
            case 'facebook':
                window.open('https://www.facebook.com/meditermsapp', '_blank');
                break;
            case 'instagram':
                window.open('https://www.instagram.com/meditermsapp', '_blank');
                break;
            case 'tiktok':
                window.open('https://www.tiktok.com/@meditermsapp', '_blank');
                break;
            default:
                break;
        }
    }


    const imageClassName = (auth.user.photoUrl === DEFAULT_PROFILE_PHOTO || auth.user.photoUrl === "") ? "user_info__default" : "account__user_photo"

    return (
        <Grid className="account" itemsX="center" gap="0.7em" padding="1.14em 0.42em">
            <Grid w100 gap="1.71em" itemsX="center" padding="1.71em 4.57em" className="account__user_info">
                <Grid itemsX="center" gap="0.7em">
                    <input
                        className='account__user_input_photo'
                        type="file"
                        ref={fileReference}
                        name="myImage"
                        onChange={(event) => {
                            changeUserPhoto(event);
                        }}
                    />
                    <img src={auth.user.photoUrl || DEFAULT_PROFILE_PHOTO} className={imageClassName} />
                    <Text medium>{auth.user.name}</Text>
                    <Text medium>{auth.user.email}</Text>
                </Grid>
                <PageLink to={routes.changePassword.path} >
                    <Button>Cambiar contraseña</Button>
                </PageLink>
                <Grid gap="0.8em" style={{ marginTop: '0.8em' }}>
                    <Text bold size="5" color="first" align="center" >¿Dudas o aclaraciones?</Text>
                    <Text medium align="center" color="first" >Siguenos en nuestras redes sociales</Text>
                </Grid>
                <Grid columns="1fr 1fr 1fr" style={{ gap: 'inherit' }}>
                    <Grid className='account__img_container'>
                        <img src='https://mediterms-resources.s3.us-east-2.amazonaws.com/img/facebook-logo.svg' className='account__rss_logo' onClick={() => { handleRSSSChange('facebook') }} />
                    </Grid>
                    <Grid className='account__img_container'>
                        <img src='https://mediterms-resources.s3.us-east-2.amazonaws.com/img/instagram-logo.svg' className='account__rss_logo' onClick={() => { handleRSSSChange('instagram') }} />
                    </Grid>
                    <Grid className='account__img_container'>
                        <img src='https://mediterms-resources.s3.us-east-2.amazonaws.com/img/tiktok-logo.svg' className='account__rss_logo' onClick={() => { handleRSSSChange('tiktok') }} />
                    </Grid>
                </Grid >
                <PageLink to={routes.privacy.path} >
                    <Text bold className='text--underline' color='first'>AVISO DE PRIVACIDAD</Text>
                </PageLink>
            </Grid>


            <Grid w100 gap="1.14em" padding="1.71em 1.14em" className="account__user_points">
                <Text bold>Términos respondidos correctamente:</Text>
                {
                    topicWithTotal.map(topic =>
                        <Grid key={topic.id} columns="2fr 1fr" gap="1.14em 3.78em">
                            <Text style={{ alignSelf: 'center' }} medium className={`${topic.topic_name === 'Total' ? 'account__total_bold' : ''}`}>{topic.topic_name === 'Total' ? topic.topic_name.toUpperCase() : topic.topic_name}:</Text>
                            <Text bold color="first" size="6" >{topic.total}</Text>
                        </Grid>
                    )}
            </Grid>
            <Button style={{ marginTop: '0.52em' }} onClick={() => { logOut() }} className="account__logout">Cerrar sesión</Button>
        </Grid>
    )
}

export default Account
