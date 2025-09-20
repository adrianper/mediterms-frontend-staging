import { useCallback, useEffect, useState } from "react"

import axios from "axios"

import { Button, ComboBox, Grid, Text, TextField } from "components"

import { useEducationalBackgroundOptions } from "@app_hooks"

import "./account_profile_info.scss"

const EducationalBackground = () => {
    const [isDirty, setIsDirty] = useState(false)
    const [formData, setFormData] = useState({
        stateId: "",
        cityId: "",
        educationalInstitutionId: "",
        institutionName: "",
        programId: "",
        programName: "",
        careerId: "",
    })
    const [error, setError] = useState("")

    const {
        stateOptions, cityOptions, institutionOptions, programOptions, careerOptions,
    } = useEducationalBackgroundOptions(formData)

    const getAccountInfo = useCallback(async () => {
        try {
            const response = await axios.get("/user/account")
            if (response.data) {
                let {
                    stateId,
                    cityId,
                    educationalBackground: { educationalInstitutionId, institutionName, programId, programName },
                    careerId
                } = response.data.user

                if (educationalInstitutionId === 0) {
                    programId = "0"
                }

                setFormData(prevState => ({ ...prevState, stateId, cityId, educationalInstitutionId, institutionName, programId, programName, careerId }))
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const handleChange = useCallback((value, name) => {
        setIsDirty(true)
        setFormData(prevState => {
            const result = { ...prevState, [name]: value }
            switch (name) {
                case "stateId":
                    result.cityId = ""
                    result.educationalInstitutionId = ""
                    result.institutionName = ""
                    result.programId = ""
                    result.programName = ""
                    break
                case "cityId":
                    result.educationalInstitutionId = ""
                    result.institutionName = ""
                    result.programId = ""
                    result.programName = ""
                    break
                case "educationalInstitutionId":
                    result.programId = ""
                    result.programName = ""
                    break
            }
            return result
        })
    }, [])

    const updateEducationalBackground = async () => {
        const { stateId, cityId, educationalInstitutionId, institutionName, programId, programName, careerId } = formData
        try {
            const educationalBackground = {
                educationalInstitutionId,
                programId,
                institutionName,
                programName
            }

            if (educationalInstitutionId === "0")
                delete educationalBackground.educationalInstitutionId
            else
                delete educationalBackground.institutionName
            if (programId === "0")
                delete educationalBackground.programId
            else
                delete educationalBackground.programName

            const response = await axios.patch("user/medical-background", {
                stateId,
                cityId,
                careerId,
                educationalBackground
            })

            if (response.data)
                setIsDirty(false)

        } catch (error) {
            console.error(error)
        }
    }

    const handleClickSave = async () => {
        const { stateId: state, cityId: city, educationalInstitutionId: institution, institutionName, programId: program, programName, careerId: career } = formData
        if (
            state === "" ||
            city === "" ||
            institution === "" ||
            (institution === "0" && institutionName === "") ||
            program === "" ||
            (program === "0" && programName === "") ||
            career === ""
        ) {
            setError("Hay campos vacios o inválidos")
            return
        }

        updateEducationalBackground()
    }

    useEffect(() => {
        getAccountInfo()
    }, [])

    return (
        <Grid w100 className="profile_info__educational_background" gap="1rem">
            <ComboBox
                label="Estado" options={stateOptions} value={formData.stateId} onChange={v => handleChange(v, "stateId")}
            />

            <ComboBox
                label="Ciudad" options={cityOptions} value={formData.cityId} onChange={v => handleChange(v, "cityId")}
            />

            <ComboBox
                label="Institucion" options={institutionOptions} value={formData.educationalInstitutionId} onChange={v => handleChange(v, "educationalInstitutionId")}
            />
            {formData.educationalInstitutionId == "0" &&
                < TextField
                    label="Nombre de la institucion" value={formData.institutionName} onChange={(v) => handleChange(v, "institutionName")}
                />
            }

            <ComboBox
                label="Programa" options={programOptions} value={formData.programId} onChange={v => handleChange(v, "programId")}
            />
            {formData.programId == "0" &&
                <TextField
                    label="Nombre del programa" value={formData.programName} onChange={(v) => handleChange(v, "programName")}
                />
            }

            <ComboBox
                label="Carrera" options={careerOptions} value={formData.careerId} onChange={v => handleChange(v, "careerId")}
            />

            {error !== "" && (
                <Text align="center" size="2" color="error">
                    {error}
                </Text>
            )}
            {isDirty &&
                <>
                    <Button selfCenter onClick={handleClickSave}>Guardar</Button>
                    <div className="separator"/>
                </>
            }
        </Grid>
    )
}

export default EducationalBackground