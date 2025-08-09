import axios from "axios"
import { ENVS } from "../scripts/generalVariables"

axios.defaults.baseURL = ENVS.hostUrl


if (localStorage.getItem('token'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
