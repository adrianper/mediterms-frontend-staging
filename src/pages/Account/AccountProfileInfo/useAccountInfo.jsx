import axios from "axios"
import { useCallback } from "react"

const useAccountInfo = () => {
    const getAccountInfo = useCallback(async () => {
        try {
            const response = await axios.get("/user/account")
            if (response.data)
                return response.data.user
        } catch (error) {
            console.error(error)
        }
    }, [])

    return {
        getAccountInfo
    }
}

export default useAccountInfo