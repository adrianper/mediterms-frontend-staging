import axios from "axiosInstance"

const signup = async (userData) => {
    const response = await axios.post('/user/signup', userData)

    if (response.data && !response.data.error) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    } else {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post('/user/login', userData)

    if (response.data && !response.data.error) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    } else {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return response.data
}

const authFunctions = { signup, login }

export default authFunctions