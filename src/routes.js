import { Home, /*TestComponents*/ } from 'pages'
// import { FaReact } from 'react-icons/fa'
import { AiFillHome/*, AiOutlineLogin, AiOutlineCalculator */} from 'react-icons/ai'
// import { BsFilePost, BsFillChatLeftDotsFill } from 'react-icons/bs'

export const headerRoutes = ['home']//, 'login', 'signup']

export const sideMenuRoutes = []//['chat', 'users_posts', 'app', 'redux_counter']

export const routes = {
    home: {
        path: '/',
        linkName: 'Home',
        element: <Home />,
        icon: <AiFillHome />
    },
    // login: {
    //     path: '/login',
    //     linkName: 'Login',
    //     element: <Login />,
    //     icon: <AiOutlineLogin />
    // },
    // signup: {
    //     path: '/signup',
    //     linkName: 'Signup',
    //     element: <Signup />
    // },
    // redux_counter: {
    //     path: '/redux_counter',
    //     linkName: 'Counter',
    //     element: <ReduxCounter />,
    //     // icon: <AiOutlineCalculator />
    // },
    // testComponents: {
    //   path: '/testComponents',
    //   linkName: 'Test Components',
    //   element: <TestComponents />
    // },
}