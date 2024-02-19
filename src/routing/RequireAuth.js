import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { noRedirectPaths, routes } from "./routes"
import { NoVerifiedAccount/*, Payment*/ } from "pages"
import { useEffect } from "react"
import axios from "axios"

const RequireAuth = () => {
    const { authenticated, verified/*, accountStatus */ } = useSelector(store => store.auth)
    const location = useLocation()
    const locationState = {}

    const navigate = useNavigate()

    if (!noRedirectPaths.includes(location.pathname)) locationState.from = location

    const validateSession = async () => {
        try {
            const response = await axios.get('session/')
            if (response.data.accountStatus === 'MDT-AS-US_PR_0000') {
                localStorage.setItem("md_ac_u_s", response.data.accountStatus)
                navigate('/payment')
            }
        } catch (error) {
            console.error('VALIDATE_SESSION_ERROR', error)
        }
    }

    useEffect(() => {
        if (authenticated)
            validateSession()
        // eslint-disable-next-line
    }, [])

    if (location.pathname === "/noVerifiedAccount" && authenticated && location.pathname !== "/verifiedAccount") return <NoVerifiedAccount />

    // if(location.pathname === "/payment" && authenticated) return <Payment />

    // console.log("authenticated", authenticated, "accountStatus", accountStatus )
    // if(authenticated && accountStatus === 'MDT-AS-US_PR_0000') return <Navigate replace to={'/payment'} />

    if (authenticated && verified) {
        return <Outlet />
    }
    if (authenticated && !verified) {
        return <Navigate replace to={routes.noVerifiedAccount.path} />
    }

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    if (!authenticated && location.pathname === '/') return <Navigate replace to={'/terms'} />

    return authenticated ? <Outlet /> : <Navigate replace to={routes.login.path} state={locationState} />
}

export default RequireAuth