import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const useEducationalBackgroundOptions = ({
    stateId, cityId, educationalInstitutionId
}) => {
    const [stateOptions, setStateOptions] = useState({})
    const [cityOptions, setCityOptions] = useState({})
    const [institutionOptions, setInstitutionOptions] = useState({})
    const [programOptions, setProgramOptions] = useState({})
    const [careerOptions, setCareerOptions] = useState({})

    const getStates = useCallback(async () => {
        try {
            const response = await axios.get("/general/states")
            if (response.data) {
                const newStateOptions = {}
                response.data.response.forEach(state => newStateOptions[state.id] = state.name)
                setStateOptions(newStateOptions)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const getCareers = useCallback(async () => {
        try {
            const response = await axios.get("/general/careers")
            if (response.data) {
                const newCareerOptions = {}
                response.data.response.forEach(state => newCareerOptions[state.id] = state.name)
                setCareerOptions(newCareerOptions)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        getStates()
        getCareers()
    }, [])

    useEffect(() => {
        if (stateId === "") {
            setCityOptions({})
        } else {
            const getCities = async () => {
                try {
                    const response = await axios.get(`/general/cities?stateId=${stateId}`)
                    if (response.data) {
                        const newCityOptions = {}
                        response.data.response.forEach(state => newCityOptions[state.id] = state.name)
                        setCityOptions(newCityOptions)
                    }
                } catch (error) {
                    console.error(error)
                }
            }

            getCities()
        }
    }, [stateId])

    useEffect(() => {
        if (cityId === "") {
            setInstitutionOptions({})
        } else {
            const getInstitutions = async () => {
                try {
                    const response = await axios.get(`/general/institutions?cityId=${cityId}`)
                    if (response.data) {
                        const newInsitutionOptions = { "0": "Otro" }
                        response.data.response.forEach(state => newInsitutionOptions[state.id] = state.name)
                        setInstitutionOptions(newInsitutionOptions)
                    }
                } catch (error) {
                    console.error(error)
                }
            }

            getInstitutions()
        }
    }, [cityId])

    useEffect(() => {
        if (educationalInstitutionId === "") {
            setProgramOptions({})
        } else {
            const getPrograms = async () => {
                try {
                    const response = await axios.get(`/general/programs?educationalInstitutionId=${educationalInstitutionId}`)
                    if (response.data) {
                        const newProgramOptions = { "0": "Otro" }
                        response.data.response.forEach(state => newProgramOptions[state.id] = state.name)
                        setProgramOptions(newProgramOptions)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            getPrograms()
        }
    }, [educationalInstitutionId])

    return {
        stateOptions, cityOptions, institutionOptions, programOptions, careerOptions,
    }
}

export default useEducationalBackgroundOptions