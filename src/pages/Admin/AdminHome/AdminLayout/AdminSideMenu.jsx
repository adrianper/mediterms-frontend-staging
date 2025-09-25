import { matchPath, useLocation } from "react-router-dom"

import { Link as RouterLink } from "react-router-dom"

import { Flex, Grid, Text } from "components"

import { adminRoutes } from "routing/routes"

const AdminSideMenu = () => {
    const location = useLocation()

    return (
        <Grid className="admin__side_menu" contentY="start">
            <RouterLink to={adminRoutes.home.path}>
                <Flex direction="column" align="center" justify="space-around" className={`side_menu__section${matchPath({ path: adminRoutes.home.path }, location.pathname) ? " active" : ""}`}>
                    <Text>Home</Text>
                </Flex>
            </RouterLink>
            <RouterLink to={adminRoutes.home.children.careers.path}>
                <Flex direction="column" align="center" justify="space-around" className={`side_menu__section${matchPath({ path: adminRoutes.home.children.careers.path }, location.pathname) ? " active" : ""}`}>
                    <Text>Carreras</Text>
                </Flex>
            </RouterLink>
            <RouterLink to={adminRoutes.home.children.institutions.path}>
                <Flex direction="column" align="center" justify="space-around" className={`side_menu__section${matchPath({ path: adminRoutes.home.children.institutions.path }, location.pathname) ? " active" : ""}`}>
                    <Text>Instituciones</Text>
                </Flex>
            </RouterLink>
            <RouterLink to={adminRoutes.home.children.terms.path}>
                <Flex direction="column" align="center" justify="space-around" className={`side_menu__section${matchPath({ path: adminRoutes.home.children.terms.path }, location.pathname) ? " active" : ""}`}>
                    <Text>Terminos</Text>
                </Flex>
            </RouterLink>
        </Grid>
    )
}

export default AdminSideMenu
