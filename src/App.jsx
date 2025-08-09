import React from "react"
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useComposeProviders } from "hooks"

import { Provider as ReduxProvider } from "react-redux"
import { ScreenSizeContextProvider } from "context/ScreenSizeContext"
import { publicRoutes, requireAuthRoutes, requireNoAuthRoutes, routes } from "routing/routes"

import store from "reduxStore/store"

import Layout from "pages/Layout"
import { SideMenuContextProvider } from "context/SideMenuContext"
import RequireNoAuth from "routing/RequireNoAuth"
import RequireAuth from "routing/RequireAuth"
import { LoadingAppContextProvider } from "context/LoadingAppContext"
import { MessageBoxContextProvider } from "context/MessageDialogContext"
import AxiosProvider from "config/AxiosProvider"

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
						<Route exact path={routes.home.path} element={<Layout />}>
							{publicRoutes.map((routeName) => (
								<Route
									key={routeName}
									path={routes[routeName].path}
									element={routes[routeName].element}
								/>
							))}
							<Route element={<RequireAuth />}>
								{requireAuthRoutes.map((routeName) => (
									<Route
										key={routeName}
										path={routes[routeName].path}
										element={routes[routeName].element}
									/>
								))}
							</Route>
						</Route>
						<Route element={<RequireNoAuth />}>
							{requireNoAuthRoutes.map((routeName) => (
								<Route
									key={routeName}
									path={routes[routeName].path}
									element={routes[routeName].element}
								/>
							))}
						</Route>
						<Route element={<RequireAuth />}>
							<Route
								element={routes.noVerifiedAccount.element}
								path={routes.noVerifiedAccount.path}></Route>
						</Route>
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</RouterProviders>
			</AppProviders>
		</ReduxProvider>
	)
}

export default App
