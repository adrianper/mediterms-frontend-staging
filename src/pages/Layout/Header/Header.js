import React, {useState, useEffect} from 'react'
import { Link as PageLink } from 'react-router-dom'

import { AiOutlineBars } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { headerRoutes, routes } from 'routing/routes'
import { Flex, Grid } from 'components'

import axios from 'axios'

import './header.scss'
import useSideMenuContext from 'hooks/useSideMenuContext'
const DEFAULT_PROFILE_PHOTO = "https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-mt-user.svg"
const Header = () => {

    const { toggleSideMenu } = useSideMenuContext()
    // const [photoUrl, setPhotoUrl] = useState(DEFAULT_PROFILE_PHOTO)

    // useEffect(() => {
    //     axios.get('/user/account', {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }).then(res => {
    //         const {data} = res 
    //         setPhotoUrl(data.user.photoUrl || DEFAULT_PROFILE_PHOTO)
    //     }).catch(err => {
    //         // setError(err.response.statusText)
    //     })
    // }, []);
    const { auth } = useSelector(store => store)

    const imageClassName = (auth.user.photoUrl === DEFAULT_PROFILE_PHOTO || auth.user.photoUrl === "") ? "user_info__default" : "account__user_photo"

    return (
        <Flex className="header" align="center" justify="space-between" padding="1.14em">
            {/* <Flex className="side_menu_bars" onClick={toggleSideMenu}>
                <AiOutlineBars size="25" />
            </Flex> */}
            <PageLink to={routes.home.path}>
                <Grid className="header__button">
                    <img className="header__home" src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-mt-home.svg" />
                </Grid>
            </PageLink>
            <PageLink to={routes.home.path}>
                <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png"/>
            </PageLink>
            <PageLink to={routes.account.path}>
                <Grid className="header__button">
                    <img className={imageClassName} src={auth.user.photoUrl || DEFAULT_PROFILE_PHOTO} />
                </Grid>
            </PageLink>
            
        </Flex>
    )
}

export default Header
