import { matchPath, Outlet, useLocation } from "react-router-dom"

import { Flex, Grid, Text } from "components"

import AdminSideMenu from "./AdminSideMenu"

import { adminRoutes } from "routing/routes"

import "./AdminLayout.scss"

const AdminLayout = () => {
    const location = useLocation()

    return (
        <Grid className='admin_app_container' columns='minmax(auto, 150px) 1fr'>
            <AdminSideMenu />
            <Flex padding='1rem' direction='column'>
                {
                    matchPath({ path: adminRoutes.home.path }, location.pathname) &&
                    <Text size="10">Home page</Text>
                }
                <Outlet />
            </Flex>
        </Grid>
    )
}

export default AdminLayout
