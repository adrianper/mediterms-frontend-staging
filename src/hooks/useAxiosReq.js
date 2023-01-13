import axios from "axios"

const useAxiosReq = () => {
    const axiosInstance = axios.create({
        // baseURL: 'https://fp-api.magiei.app', //*****PRODUCTION*****
        baseURL: 'http://localhost:8080',
        withCredentials: true,
        headers: {
            common: {
                Authorization: `Bearer ${global.getCookieToken()}`
            }
        }
    })

    return axiosInstance
}

export default useAxiosReq