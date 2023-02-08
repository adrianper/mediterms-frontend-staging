
import React, { useCallback, useEffect, useState } from 'react'
import { Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import { Button, Grid, TextField, Text } from 'components'
import { routes } from 'routing/routes'

import './account.scss'
import axios from 'axios'

const DEFAULT_PROFILE_PHOTO = "https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-user-edit.svg"

const Account = () => {
    const [topicWithTotal, setTopicsWithTotal] = useState([])
    const [error, setError] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [photoUrl, setPhotoUrl] = useState(DEFAULT_PROFILE_PHOTO)

    const [selectedImage, setSelectedImage] = useState('');

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

    useEffect(() => {
        axios.get('/user/account', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            const { data } = res
            setName(data.user.name)
            setEmail(data.user.email)
            setPhotoUrl(data.user.photoUrl || DEFAULT_PROFILE_PHOTO)
        }).catch(err => {
            setError(err.response.statusText)

        })
    }, [])

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
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
            .then(response => {
                setPhotoUrl(response.data.photoUrl || DEFAULT_PROFILE_PHOTO)
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


    const imageClassName = photoUrl === DEFAULT_PROFILE_PHOTO ? "user_info__default" : "account__user_photo"

    return (
        <Grid className="account" itemsX="center" gap="0.7em" padding="1.14em 0.42em">
            <Grid w100 gap="1.71em" itemsX="center" padding="1.71em 4.57em" className="account__user_info">
                <Grid itemsX="center" gap="0.7em">
                    <input
                        className='account__user_input_photo'
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            changeUserPhoto(event);
                        }}
                    />
                    <img src={photoUrl} className={imageClassName} />
                    <Text medium>{name}</Text>
                    <Text medium>{email}</Text>
                </Grid>
                <PageLink to={routes.changePassword.path} >
                    <Button>Cambiar contraseña</Button>
                </PageLink>
                <Text bold size="5" color="first" >¿Dudas o aclaraciones?</Text>
                <Text medium style={{'textAlign':'center'}}  color="first" >Siguenos en nuestras redes sociales</Text>
                <Grid columns="1fr 1fr 1fr" style={{gap: 'inherit'}}>
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
            </Grid>


            <Grid w100 gap="1.14em" padding="1.71em 1.14em" className="account__user_points">
                <Text>Términos respondidos correctamente:</Text>
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
