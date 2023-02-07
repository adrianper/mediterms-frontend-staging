import React from 'react'
import { Link as PageLink } from 'react-router-dom'

import { AiOutlineBars } from 'react-icons/ai'

import { headerRoutes, routes } from 'routing/routes'
import { Flex, Grid } from 'components'

import './header.scss'
import useSideMenuContext from 'hooks/useSideMenuContext'

const Header = () => {

    const { toggleSideMenu } = useSideMenuContext()

    return (
        <Flex className="header" align="center" justify="space-between" padding="1.14em">
            {/* <Flex className="side_menu_bars" onClick={toggleSideMenu}>
                <AiOutlineBars size="25" />
            </Flex> */}
            <PageLink to={routes.home.path} >
                <Grid className="header__button">
                    <img className="header__home" src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-mt-home.svg" />
                </Grid>
            </PageLink>
            <PageLink to={routes.home.path} >
                <img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png"/>
            </PageLink>
            <Grid gap="1em" direction="column">
                {[headerRoutes].map(route =>
                    <PageLink key={route} to={routes[route].path} >
                        <Grid className="header__button">
                            {routes[route].icon}
                            {/* {routes[route].linkName} */}
                        </Grid>
                    </PageLink>
                )}
            </Grid>
        </Flex>
    )
}

export default Header
