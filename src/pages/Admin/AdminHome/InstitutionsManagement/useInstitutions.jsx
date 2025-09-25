import axios from "axios"
import { useCallback, useEffect, useState } from "react"


function useCareers(){
    const [institutions, setInstitution] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        cityId: "",
        stateId: "",
        campuses: []
    })


    const GET_ALL_INSTITUTIONS = useCallback(async (searchFor = null) => {
        setLoading(true)
        try {
            const searchingQuery = searchFor ? `?searchFor=${searchFor}` : ""
            const response = await axios.get("/admin/catalog/institutions" + searchingQuery, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data) {
                setInstitution(response.data)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        GET_ALL_INSTITUTIONS()
    }, [GET_ALL_INSTITUTIONS])


    const GET_INSTITUTION_DATA = useCallback(async (id) => {
        try {
            const response = await axios.get("/admin/catalog/institutions/" + id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data) {
                setFormData({...response.data, id})
            }
        } catch (error) {
            console.error(error)
        }
    }, [])



     const CREATE_INSTITUTION = useCallback(async(formData) => {
        try {
            await axios.post("/admin/catalog/institutions",
                formData, 
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            GET_ALL_INSTITUTIONS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_INSTITUTIONS])


    const UPDATE_INSTITUTION = useCallback(async(formData) => {
        try {
            await axios.put(`/admin/catalog/institutions/${formData.id}`,
                {
                    ...formData,
                    campuses: formData?.campuses.map(fm => {
                        if(fm.id < 0) {
                            delete fm.id
                            return fm
                        }
                        return fm
                    })
                },
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            GET_ALL_INSTITUTIONS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_INSTITUTIONS])


    const DELETE_INSTITUTION = useCallback( async(id) => {
        try {
            await axios.delete("/admin/catalog/institutions/"+id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            GET_ALL_INSTITUTIONS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_INSTITUTIONS])

    
    return {
        institutions,
        formData,
        setFormData,
        isLoading,
        GET_ALL_INSTITUTIONS,
        GET_INSTITUTION_DATA,
        CREATE_INSTITUTION,
        DELETE_INSTITUTION,
        UPDATE_INSTITUTION
    }
}


export default useCareers