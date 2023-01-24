import axios from "axios"
import { routes } from "routing/routes"
import { hostURL } from "scripts/generalVariables"

axios.defaults.baseURL = hostURL
// axios.defaults.withCredentials = true
if (localStorage.getItem('token'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

axios.interceptors.response.use((response) => {
    //Any status code within the range 2xx
    return response
}, (error) => {
    //Any status code that falls outside the range of 2xx
    if (error.response.data.errors) {
        if (error.response.data.code === 'TOKEN_EXPIRED')
            global.redirectTo(routes.login.path)

        // console.error('Error code: ', error.response.data.code)
        // console.error(error.response.data.errors)
    }
    return Promise.reject(error)
})