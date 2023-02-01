import axios from "axios"
import { useMessageBoxContext } from "hooks"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"
import { reset } from "redux/reducers/auth/authSlice"
import { routes } from "routing/routes"
import { hostURL, notValidTokenCodes } from "scripts/generalVariables"

// const axiosInstance = axios.create({
//     baseURL: hostURL,
//     withCredentials: true,
//     headers: {
//         common: {
//             Authorization: `Bearer ${global.getCookieToken()}`
//         }
//     }
// })

const AxiosProvider = ({ children }) => {

    const dispatch = useDispatch()

    const { showMB } = useMessageBoxContext()

    if (localStorage.getItem('token'))
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    useEffect(() => {
        const resInterceptor = response => response

        const errInterceptor = error => {
            if (error.response.data.errors) {
                if (notValidTokenCodes.includes(error.response.data.code)) {
                    showMB('Por favor inicia sesión', error.response.data.errors[0])
                    global.clearSession()
                    dispatch(reset())
                    global.redirectTo(routes.login.path)
                }
            }

            return Promise.reject(error)
        }

        const interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor)

        return () => axios.interceptors.response.eject(interceptor)

        // eslint-disable-next-line
    }, [])

    return <Outlet />
}

export default AxiosProvider