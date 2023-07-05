import {
    Home, Login, ReduxCounter, Signup, Terms, TestComponents, Account, ChangePassword, FinalDemo,
    ChangeRecoveredPassword, Institutions, PaymentRenewal, UserSignup, NoVerifiedAccount,
    VerifiedAccount, Payment, Privacy
} from 'pages'
import { AiFillHome, AiOutlineLogin, AiOutlineCalculator } from 'react-icons/ai'
import { RiTestTubeFill } from 'react-icons/ri'

export const headerRoutes = ['account']

export const sideMenuRoutes = ['redux_counter', 'testComponents']

export const publicRoutes = ['terms', 'finalDemo', 'changeRecoveredPassword', 'institutions', 'privacy']
export const requireNoAuthRoutes = ['login', 'signup', 'userSignup', 'verifiedAccount']
export const requireAuthRoutes = ['home', 'redux_counter', 'testComponents', 'account', 'changePassword', 'paymentRenewal', 'payment']

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
    paymentRenewal: {
        path: '/payment_renewal',
        linkName: 'PaymentRenewal',
        element: <PaymentRenewal />
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
    institutions: {
        path: '/institutions',
        linkName: 'institutions',
        element: <Institutions />
    },
    userSignup: {
        path: '/userSignup',
        linkName: 'userSignup',
        element: <UserSignup />
    },
    noVerifiedAccount: {
        path: '/noVerifiedAccount',
        linkName: 'noVerifiedAccount',
        element: <NoVerifiedAccount />
    },
    verifiedAccount: {
        path: '/verifiedAccount',
        linkName: 'verifiedAccount',
        element: <VerifiedAccount />
    },
    payment: {
        path: '/payment',
        linkName: 'payment',
        element: <Payment />
    },
    privacy: {
        path: '/privacidad',
        linkName: 'privacy',
        element: <Privacy />

    }
}

export const noRedirectPaths = [routes.account.path, routes.changePassword.path]
