import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { routes } from "./routes"

const RequireAuth = () => {
    const { authenticated } = useSelector(store => store.auth)
    const location = useLocation()
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    if (!authenticated && location.pathname === '/') return <Navigate replace to={'/terms'} />

    return authenticated ? <Outlet /> : <Navigate replace to={routes.login.path} state={{ from: location }} />
}

export default RequireAuth