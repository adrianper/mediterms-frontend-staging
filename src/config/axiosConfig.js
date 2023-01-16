import axios from "axios"
import { hostURL } from "scripts/generalVariables"

axios.defaults.baseURL = hostURL
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = `Bearer ${global.getCookieToken()}`