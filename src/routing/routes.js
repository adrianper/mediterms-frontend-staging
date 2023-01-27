import { Home, Login, ReduxCounter, Signup, Terms, TestComponents, Account, ChangePassword, FinalDemo, ChangeRecoveredPassword } from 'pages'
import { AiFillHome, AiOutlineLogin, AiOutlineCalculator } from 'react-icons/ai'
import { RiTestTubeFill } from 'react-icons/ri'

export const headerRoutes = ['account']

export const sideMenuRoutes = ['redux_counter', 'testComponents']

export const publicRoutes = ['terms', 'finalDemo', 'changeRecoveredPassword']
export const requireNoAuthRoutes = ['login', 'signup']
export const requireAuthRoutes = ['home', 'redux_counter', 'testComponents', 'account', 'changePassword']

export const routes = {
    home: {
        path: '/',
        linkName: 'Home',
        element: <Home />,
        icon: <AiFillHome />
    },
    terms: {
        path: '/terms/:topic?',
        linkName: 'Terms',
        element: <Terms />,
    },
    login: {
        path: '/login',
        linkName: 'Login',
        element: <Login />,
        icon: <AiOutlineLogin />
    },
    signup: {
        path: '/signup',
        linkName: 'Signup',
        element: <Signup />
    },
    redux_counter: {
        path: '/redux_counter',
        linkName: 'Counter',
        element: <ReduxCounter />,
        icon: <AiOutlineCalculator />
    },
    testComponents: {
        path: '/testComponents',
        linkName: 'Test Components',
        element: <TestComponents />,
        icon: <RiTestTubeFill />
    },
    account: {
        path: '/account',
        linkName: 'Account',
        element: <Account />,
        icon: <img src="https://magiei2.s3.us-east-2.amazonaws.com/public/img/icons/icono_usuario.svg" className='account-icon' />
    },
    changePassword: {
        path: '/changePassword',
        linkName: 'changePassword',
        element: <ChangePassword />
    },
    finalDemo: {
        path: '/finalDemo',
        linkName: 'finalDemo',
        element: <FinalDemo />
    },
    changeRecoveredPassword: {
        path: '/changeRecoveredPassword',
        linkName: 'changeRecoveredPassword',
        element: <ChangeRecoveredPassword />
    },
}