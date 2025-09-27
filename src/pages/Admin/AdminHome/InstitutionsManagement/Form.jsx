import axios from "axios"
import { Modal, Button, Grid, Text, TextField, } from "components"
import { useCallback, useEffect, useState } from "react"
import { ComboBox } from "../../../../components"
import CampusesRecordGroup from "./CampusesRecordGroup"

function InsititutionForm(props) {
    const {
        setIsModalOpen,
        formData,
        setFormData,
        CREATE_INSTITUTION,
        UPDATE_INSTITUTION
    } = props

    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    const getStates = useCallback(async () => {
        try {
            const response = await axios.get("/general/states", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data) {
                const newStateOptions = {}
                response.data.response.forEach(state => newStateOptions[state.id] = state.name)
                setStates(newStateOptions)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        getStates()
    }, [getStates])


    useEffect(() => {
        if (formData.stateId === "") {
            setCities({})
        } else {
            const getCities = async () => {
                try {
                    const response = await axios.get(`/general/cities?stateId=${formData.stateId}`)
                    if (response.data) {
                        const newCityOptions = {}
                        response.data.response.forEach(state => newCityOptions[state.id] = state.name)
                        setCities(newCityOptions)
                    }
                } catch (error) {
                    console.error(error)
                }
            }

            getCities()
        }
    }, [formData.stateId])


    const onChangeHandler = useCallback((value, key) => {
        setFormData(datum => {
            const newFormData = { ...datum }
            newFormData[key] = value

            if (key === "stateId") {
                newFormData["cityId"] = ""
            }

            if (key === "campuses") {
                newFormData["campuses"] = null
                newFormData["campuses"] = value
            }
            return newFormData
        })
    }, [])
    const OnSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (formData.id) {
            UPDATE_INSTITUTION(formData)
        } else {
            CREATE_INSTITUTION(formData)
        }
        setFormData({ id: "", name: "" })
        setIsModalOpen(false)
    }

    const onClose = () => {
        setIsModalOpen(false)
        setFormData({ id: "", term: "" })
    }

    return <Modal>
        <form onSubmit={OnSubmit} style={{
            justifyItems: "center",
            display: "grid",
            gridTemplateColumns: "1fr"
        }}>
            <Grid w100 padding="1.72em 1.1em" className="term_definition__form" gap="1.3em" maxWidth="22em">
                <Text size="5" align="center" bold>
                    {formData.id ? "Actualizar" : "Crear "} Institucion
                </Text>
                <TextField
                    label="Nombre" value={formData.name} onChange={(v) => onChangeHandler(v, "name")}
                />
                <ComboBox
                    label="Estado" options={states} value={formData.stateId} onChange={v => onChangeHandler(v, "stateId")}
                />
                <ComboBox
                    label="Ciudad" options={cities} value={formData.cityId} onChange={v => onChangeHandler(v, "cityId")}
                />
                <CampusesRecordGroup
                    externalFormData={formData.campuses}
                    onChange={(v) => {
                        console.log("previous campuses", formData.campuses)
                        console.log(v(formData.campuses || []))
                        onChangeHandler(v(formData.campuses || []), "campuses")
                    }}
                />
                <Grid w100 columns="1fr 1fr" gap="1rem">
                    <Button variant="error" type="button" onClick={onClose}>
                        Cerrar
                    </Button>
                    <Button type="submit"  >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Modal>

}

export default InsititutionForm