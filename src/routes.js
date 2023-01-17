import { Home, Login, ReduxCounter, Signup, Terms, TestComponents } from 'pages'
import { AiFillHome, AiOutlineLogin, AiOutlineCalculator } from 'react-icons/ai'
import { RiTestTubeFill } from 'react-icons/ri'

export const headerRoutes = ['home', 'login', 'signup']

export const sideMenuRoutes = ['redux_counter', 'testComponents']

export const routes = {
    home: {
        path: '/',
        linkName: 'Home',
        element: <Home />,
        icon: <AiFillHome />
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
    terms: {
        path: '/terms/:id',
        linkName: 'Terms',
        element: <Terms />,
    }
}