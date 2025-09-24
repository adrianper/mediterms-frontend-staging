import axios from "axios"
import { useCallback, useEffect, useState } from "react"


function useCareers(){
    const [careers, setCareers] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        name: ""
    })


    const GET_ALL_CAREERS = useCallback(async (searchFor = null) => {
        setLoading(true)
        try {
            const searchingQuery = searchFor ? `?searchFor=${searchFor}` : ""
            const response = await axios.get("/admin/catalog/careers" + searchingQuery, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data) {
                setCareers(response.data)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        GET_ALL_CAREERS()
    }, [GET_ALL_CAREERS])

     const CREATE_CAREER = useCallback(async(formData) => {
        try {
            await axios.post("/admin/catalog/careers",
                formData, 
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            GET_ALL_CAREERS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_CAREERS])


    const UPDATE_CAREER = useCallback(async(formData) => {
        try {
            await axios.put(`/admin/catalog/careers/${formData.id}`,
                formData, 
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            GET_ALL_CAREERS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_CAREERS])


    const DELETE_CAREER = useCallback( async(id) => {
        try {
            await axios.delete("/admin/catalog/careers/"+id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            GET_ALL_CAREERS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_CAREERS])

    return {
        careers,
        formData,
        setFormData,
        isLoading,
        GET_ALL_CAREERS,
        CREATE_CAREER,
        UPDATE_CAREER,
        DELETE_CAREER
    }
}


export default useCareers