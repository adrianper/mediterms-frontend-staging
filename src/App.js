import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useComposeProviders } from 'hooks'

import { Provider as ReduxProvider } from 'react-redux'
// import { SocketContextProvider } from 'context/SocketContext'
import { ScreenSizeContextProvider } from 'context/ScreenSizeContext'
import { publicRoutes, requireAuthRoutes, requireNoAuthRoutes, routes } from 'routing/routes'

import store from 'redux/store'

import Layout from 'pages/Layout'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { SideMenuContextProvider } from 'context/SideMenuContext'
import RequireNoAuth from 'routing/RequireNoAuth'
import RequireAuth from 'routing/RequireAuth'
import { LoadingAppContextProvider } from 'context/LoadingAppContext'

const App = () => {

    const RouterProviders = useComposeProviders(Router, Routes)
    const AppProviders = useComposeProviders(/*SocketContextProvider,*/ ScreenSizeContextProvider,
        SideMenuContextProvider, LoadingAppContextProvider)

    return (
        <ReduxProvider store={store}>
            {/* <ToastContainer /> */}
            <AppProviders>
                <RouterProviders>
                    <Route exact path={routes.home.path} element={<Layout />}>
                        {publicRoutes.map(routeName =>
                            <Route key={routeName} path={routes[routeName].path} element={routes[routeName].element} />
                        )}
                        <Route element={<RequireAuth />}>
                            {requireAuthRoutes.map(routeName =>
                                <Route key={routeName} path={routes[routeName].path} element={routes[routeName].element} />
                            )}
                        </Route>
                    </Route>
                    <Route element={<RequireNoAuth />}>
                        {requireNoAuthRoutes.map(routeName =>
                            <Route key={routeName} path={routes[routeName].path} element={routes[routeName].element} />
                        )}
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </RouterProviders>
            </AppProviders>
        </ReduxProvider>
    )
}

export default App
