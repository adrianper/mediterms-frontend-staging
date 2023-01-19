import axios from "axios"
import { hostURL } from "scripts/generalVariables"

axios.defaults.baseURL = hostURL
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token') ?? ''}`
axios.interceptors.response.use((response) => {
    //Any status code within the range 2xx
    return response
}, (error) => {
    //Any status code that falls outside the range of 2xx
    if (error.response.data.errors) {
        if (response.data.code === 'TOKEN_EXPIRED')
            window.location.href = window.location.href.split('#')[0] + '#/login'

        console.error('Error code: ', error.response.data.code)
        console.error(error.response.data.errors)
    }
    return Promise.reject(error)
})