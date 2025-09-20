import axios from "axios"

const signup = async (userData) => {
    const response = await axios.post('/user/signup', userData)

    if (response.data && !response.data.error) {
        localStorage.setItem('paymentStatus', response.data.paymentStatus)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    } else {
        localStorage.removeItem('paymentStatus')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post('/user/login', userData)
    if (response.data && !response.data.error) {
        localStorage.setItem('paymentStatus', response.data.paymentStatus)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('md_v_u_s', response.data.verified)
        localStorage.setItem('md_ac_u_s', response.data.accountStatus)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    } else {
        window.clearSession()
    }

    return response.data
}

const authFunctions = { signup, login }

export default authFunctions