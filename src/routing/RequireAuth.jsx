import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { adminRoutes, noRedirectPaths, routes } from "./routes"
import { NoVerifiedAccount } from "pages"
import { isAdminSubdomain } from "../scripts/generalVariables"

const RequireAuth = () => {
	const { authenticated, verified } = useSelector((store) => store.auth)
	const location = useLocation()
	const locationState = {}

	if (isAdminSubdomain) {
		return authenticated ? <Outlet /> : <Navigate replace to={adminRoutes.login.path} />
	}

	if (!noRedirectPaths.includes(location.pathname)) locationState.from = location

	if (location.pathname === "/noVerifiedAccount" && authenticated && location.pathname !== "/verifiedAccount")
		return <NoVerifiedAccount />

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
	if (!authenticated && location.pathname === "/") return <Navigate replace to={"/terms"} />

	return authenticated ? <Outlet /> : <Navigate replace to={routes.login.path} state={locationState} />
}

export default RequireAuth
