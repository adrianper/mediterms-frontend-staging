import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { noRedirectPaths, routes } from "./routes"
import { NoVerifiedAccount, Payment } from "pages"

const RequireAuth = () => {
    const { authenticated, verified, accountStatus } = useSelector(store => store.auth)
    const location = useLocation()
    const locationState = {}

    if (!noRedirectPaths.includes(location.pathname)) locationState.from = location
    
    if(location.pathname === "/noVerifiedAccount" && authenticated && location.pathname !== "/verifiedAccount") return <NoVerifiedAccount />
    
    // if(location.pathname === "/payment" && authenticated) return <Payment />

    // console.log("authenticated", authenticated, "accountStatus", accountStatus )
    // if(authenticated && accountStatus === 'MDT-AS-US_PR_0000') return <Navigate replace to={'/payment'} />

    if(authenticated && verified){
        return <Outlet /> 
    }
    if(authenticated && !verified){
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