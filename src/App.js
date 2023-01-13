import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useComposeProviders } from 'hooks'

import { Provider as ReduxProvider } from 'react-redux'
// import { SocketContextProvider } from 'context/SocketContext'
import { ScreenSizeContextProvider } from 'context/ScreenSizeContext'
import { routes } from './routes'

// import store from 'redux/store'

import Layout from 'pages/Layout'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { SideMenuContextProvider } from 'context/SideMenuContext'

const App = () => {
    const RouterProviders = useComposeProviders(Router, Routes)
    const AppProviders = useComposeProviders(/*SocketContextProvider,*/ ScreenSizeContextProvider, SideMenuContextProvider)

    return (
        // <ReduxProvider store={store}>
        //     <ToastContainer />
            <AppProviders>
                <RouterProviders>
                    <Route path={routes.home.path} element={<Layout />}>
                        {Object.keys(routes).map(route =>
                            <Route key={route} path={routes[route].path} element={routes[route].element} />
                        )}
                    </Route>
                    {/* <Route path='' */}
                </RouterProviders>
            </AppProviders>
        // </ReduxProvider>
    )
}

export default App
