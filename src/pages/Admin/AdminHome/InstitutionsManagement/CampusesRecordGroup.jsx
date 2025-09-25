import { useRef, useState } from "react"

import { Grid, RecordGroup } from "components"
import { Button, TextField } from "components"

const campusInitialState = { name: "" }


const useRecordGroup = ({ initialFormState, value, onChange }) => {
    const [formData, setFormData] = useState([...initialFormState])
    const $recordGroup = useRef()

    const handleOpenCloseRecordGroup = (record) => {
        if (record) {
            setFormData(record)
        } else {
            setFormData(campusInitialState)
        }
    }

    const handleChangeFormData = (value, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSave = () => {
        if (!value.find(({ id }) => id === formData.id)) {
            
            onChange((prevState) => [...prevState, formData])
        } else {
            onChange((prevState) =>{

                return prevState.map(
                    (record) => {
                        return record.id === formData.id 
                        ? {...formData, id: record.id} 
                        : record
                    }
                )
            }
            )
        }
        $recordGroup.current.closeForm()
    }

    const handleCancel = () => {
        $recordGroup.current.closeForm()
    }

    return {
        formData,
        handleChangeFormData,
        handleCancel,
        handleSave,
        handleOpenCloseRecordGroup,
        $recordGroup,
    }
}

const CampusesForm = ({ formData, onChange, onCancel, onSave }) => {
    const handleSumbit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        onSave()
    }

    return (
        <form style={{maxWidth: "280px"}}>
            <Grid gap="1rem">
                <TextField
                    label="Campus/Plantel"
                    value={formData.name}
                    onChange={value => onChange(value, "name")}
                />
                <Grid gap="1rem" direction="column" contentX="center">
                    <Button onClick={onCancel} type="button" variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleSumbit(e)}>Save</Button>
                </Grid>
            </Grid>
        </form>
    )
}

const CampusesRecordGroup = (props) => {
    const { externalFormData, onChange} = props
    const {
        formData,
        handleChangeFormData,
        handleCancel,
        handleSave,
        handleOpenCloseRecordGroup,
        $recordGroup,
    } = useRecordGroup({
        value: externalFormData || [],
        onChange: onChange,
        initialFormState: [],
    })

    return (
        <Grid gap="1rem" style={{ maxWidth: "280px"}}>
            <RecordGroup
                ref={$recordGroup}
                columns={[
                    { name: "name", label: "Nombre del plantel/campus" }
                ]}
                initialFormState={campusInitialState}
                value={externalFormData}
                onChange={onChange}
                onOpenForm={handleOpenCloseRecordGroup}
                onCloseForm={handleOpenCloseRecordGroup}
                style={{
                    maxWidth: "280px"
                }}
                maxWidth="280px"
                formContent={
                    <CampusesForm
                        formData={formData}
                        onChange={handleChangeFormData}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                }
            />
        </Grid>
    )
}

export default CampusesRecordGroup