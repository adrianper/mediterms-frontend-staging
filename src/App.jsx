import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useComposeProviders } from "hooks"

import { Provider as ReduxProvider } from "react-redux"
import { ScreenSizeContextProvider } from "context/ScreenSizeContext"
import { publicRoutes, requireAuthRoutes, requireNoAuthRoutes, routes, renderRoute } from "routing/routes"

import store from "reduxStore/store"

import Layout from "pages/Layout"
import { SideMenuContextProvider } from "context/SideMenuContext"
import RequireNoAuth from "routing/RequireNoAuth"
import RequireAuth from "routing/RequireAuth"
import { LoadingAppContextProvider } from "context/LoadingAppContext"
import { MessageBoxContextProvider } from "context/MessageDialogContext"
import AxiosProvider from "config/AxiosProvider"

import { isAdminSubdomain } from "./scripts/generalVariables"
// import AdminRoutes from "./routing/AdminRoutes"
import { adminRoutes, requireAuthAdminRoutes, requireNoAuthAdminRoutes } from "./routing/routes"

const App = () => {
	const RouterProviders = useComposeProviders(Router, Routes)
	const AppProviders = useComposeProviders(
		MessageBoxContextProvider,
		LoadingAppContextProvider,
		ScreenSizeContextProvider,
		SideMenuContextProvider
	)

	return (
		<ReduxProvider store={store}>
			<AppProviders>
				<RouterProviders>
					<Route element={<AxiosProvider />}>
						{isAdminSubdomain ?
							<>
								<Route element={<RequireAuth />}>
									{requireAuthAdminRoutes.map(routeName => renderRoute(adminRoutes[routeName]))}
								</Route>
								<Route element={<RequireNoAuth />}>
									{requireNoAuthAdminRoutes.map(routeName => renderRoute(adminRoutes[routeName]))}
								</Route>
							</>
							:
							<>
								<Route exact path={routes.home.path} element={<Layout />}>
									{publicRoutes.map(routeName => renderRoute(routes[routeName]))}
									<Route element={<RequireAuth />}>
										{requireAuthRoutes.map(routeName => renderRoute(routes[routeName]))}
									</Route>
								</Route>
								<Route element={<RequireNoAuth />}>
									{requireNoAuthRoutes.map(routeName => renderRoute(routes[routeName]))}
								</Route>
								<Route element={<RequireAuth />}>
									<Route
										element={routes.noVerifiedAccount.element}
										path={routes.noVerifiedAccount.path}></Route>
								</Route>
							</>
						}
					</Route>
					<Route path="*" element={<Navigate to={isAdminSubdomain ? "/admin/home" : "/"} replace />} />
				</RouterProviders>
			</AppProviders>
		</ReduxProvider >
	)
}

export default App
