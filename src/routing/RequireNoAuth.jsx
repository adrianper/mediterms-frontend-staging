import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { adminRoutes, routes } from "./routes"
import { VerifiedAccount } from "pages"
import { isAdminSubdomain } from "../scripts/generalVariables"

const homePath = isAdminSubdomain ? adminRoutes.home.path : routes.home.path

const RequireNoAuth = () => {
	const { authenticated } = useSelector((store) => store.auth)
	const location = useLocation()

	if (authenticated && location.pathname === "/verifiedAccount") return <VerifiedAccount />
	return !authenticated ? <Outlet /> : <Navigate to={location.state?.from?.pathname || homePath} replace />
}

export default RequireNoAuth
