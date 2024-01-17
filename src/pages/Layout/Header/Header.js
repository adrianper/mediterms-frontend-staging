import React from 'react'
import { Capacitor } from '@capacitor/core'
import { Link as PageLink } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { routes } from 'routing/routes'
import { Flex, Grid } from 'components'

import './header.scss'
const DEFAULT_PROFILE_PHOTO = "https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-mt-user.svg"

const Header = () => {
    const { auth } = useSelector(store => store)

    const imageClassName = (auth.user.photoUrl === DEFAULT_PROFILE_PHOTO || auth.user.photoUrl === "") ? "user_info__default" : "account__user_photo"

    return (
        <Flex className={`header${Capacitor.getPlatform() !== 'web' ? ' mobile_header':''}`} align="center" justify="space-between">
            <PageLink to={routes.home.path}>
                <Grid className="header__button">
                    <img className="header__home" src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-mt-home.svg" />
                </Grid>
            </PageLink>
            <PageLink to={routes.home.path}>
                <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png" />
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
