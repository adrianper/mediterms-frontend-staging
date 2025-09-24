import axios from "axios"
import { useCallback, useEffect, useState } from "react"


function useTerms(){
    const [terms, setTerms] = useState([])
    const [topics, setTopics] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        term: "",
        definition: "",
        topicId: ""
    })



    const GET_ALL_TOPICS =  useCallback(async () => {
        try {
            const response = await axios.get("/admin/catalog/topics", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data) {
                const newTopicData = {}
                response.data.forEach(topic => newTopicData[topic.id] = topic.name)
                setTopics(newTopicData)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const GET_ALL_TERMS = useCallback(async (searchFor = null) => {
        setLoading(true)
        try {
            const searchingQuery = searchFor ? `?searchFor=${searchFor}` : ""
            const response = await axios.get("/admin/catalog/terms" + searchingQuery, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data) {
                setTerms(response.data)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        GET_ALL_TOPICS()
    }, [GET_ALL_TOPICS])

    useEffect(() => {
        GET_ALL_TERMS()
    }, [GET_ALL_TERMS])

     const CREATE_TERM = useCallback(async(formData) => {
        try {
            await axios.post("/admin/catalog/terms",
                formData, 
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            GET_ALL_TERMS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_TERMS])


    const UPDATE_TERM = useCallback(async(formData) => {
        try {
            await axios.put(`/admin/catalog/terms/${formData.id}`,
                formData, 
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            GET_ALL_TERMS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_TERMS])


    const DELETE_TERM = useCallback( async(id) => {
        try {
            await axios.delete("/admin/catalog/terms/"+id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            GET_ALL_TERMS()
        } catch (error) {
            console.error(error)
        }
    }, [GET_ALL_TERMS])

    return {
        terms,
        topics,
        formData,
        setFormData,
        isLoading,
        GET_ALL_TERMS,
        CREATE_TERM,
        UPDATE_TERM,
        DELETE_TERM
    }
}


export default useTerms