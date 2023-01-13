import React from 'react'
import { Outlet } from 'react-router-dom'

import { Grid } from 'components'

import Header from './Header/Header'
import SideMenu from './SideMenu/SideMenu'
import './styles.scss'

const Layout = () => {
    return (
        <Grid className="app_layout" rows="auto 1fr">
            <Header />
            <Grid className="layout_content" columns="auto 1fr">
                <SideMenu />
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default Layout
