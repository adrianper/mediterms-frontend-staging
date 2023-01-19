import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({ children }) => {
    const { authenticated } = useSelector(store => store.auth)
    const location = useLocation()

    console.log('Authenticated: ', authenticated)

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return authenticated ? children : <Navigate replace to="/login" state={{ from: location }} />
}

export default RequireAuth