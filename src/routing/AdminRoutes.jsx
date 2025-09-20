import { Route } from "react-router-dom"

import RequireNoAuth from "routing/RequireNoAuth"
import RequireAuth from "routing/RequireAuth"

import { adminRoutes, renderRoute, requireAuthAdminRoutes, requireNoAuthAdminRoutes } from "./routes"

const AdminRoutes = () => {
    return (
        <>
            <Route element={<RequireAuth />}>
                {requireAuthAdminRoutes.map(routeName => renderRoute(adminRoutes[routeName]))}
            </Route>
            <Route element={<RequireNoAuth />}>
                {requireNoAuthAdminRoutes.map(routeName => renderRoute(adminRoutes[routeName]))}
            </Route>
        </>
    )
}

export default AdminRoutes