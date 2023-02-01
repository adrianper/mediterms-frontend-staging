import axios from "axios"
import { useMessageBoxContext } from "hooks"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
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

const axiosInstance = axios.create({
    baseURL: hostURL,
})

export const AxiosProvider = ({ children }) => {

    const dispatch = useDispatch()

    const { showMB } = useMessageBoxContext()

    if (localStorage.getItem('token'))
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

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

        const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor)

        return () => axiosInstance.interceptors.response.eject(interceptor)

        // eslint-disable-next-line
    }, [])

    return children
}

export default axiosInstance