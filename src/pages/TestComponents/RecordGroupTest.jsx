import { useRef, useState } from "react"

import { Grid, RecordGroup } from "components"
import { Button, TextField } from "../../components"

const userInitialState = { name: "", email: "" }

const mockRecords = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
    { id: 3, name: "Clara Lee", email: "clara.lee@example.com" },
    { id: 4, name: "David Kim", email: "david.kim@example.com" },
    { id: 5, name: "Eva Martinez", email: "eva.martinez@example.com" },
]

const useRecordGroup = ({ initialFormState, value, onChange }) => {
    const [formData, setFormData] = useState(initialFormState)
    const $recordGroup = useRef()

    const handleOpenCloseRecordGroup = (record) => {
        if (record) {
            setFormData(record)
        } else {
            setFormData(userInitialState)
        }
    }

    const handleChangeFormData = (value, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSave = () => {
        if (!value.find(({ id }) => id === formData.id)) {
            onChange((prevState) => [...prevState, formData])
        } else {
            onChange((prevState) =>
                prevState.map((record) => record.id === formData.id ? formData : record)
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

const UserEmailsForm = ({ formData, onChange, onCancel, onSave }) => {
    const handleSumbit = (event) => {
        event.preventDefault()
        onSave()
    }

    return (
        <form onSubmit={handleSumbit}>
            <Grid gap="1rem">
                <TextField
                    label="name"
                    value={formData.name}
                    onChange={value => onChange(value, "name")}
                />
                <TextField
                    label="email"
                    type="email"
                    value={formData.email}
                    onChange={value => onChange(value, "email")}
                />

                <Grid gap="1rem" direction="column" contentX="center">
                    <Button onClick={onCancel} type="button" variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </Grid>
            </Grid>
        </form>
    )
}

const RecordGroupTest = () => {
    const [users, setUsers] = useState(mockRecords)

    const {
        formData,
        handleChangeFormData,
        handleCancel,
        handleSave,
        handleOpenCloseRecordGroup,
        $recordGroup,
    } = useRecordGroup({
        value: users,
        onChange: setUsers,
        initialFormState: userInitialState,
    })

    return (
        <Grid gap="1rem">
            <RecordGroup
                ref={$recordGroup}
                columns={[
                    { name: "name", label: "Name" },
                    { name: "email", label: "Email" },
                ]}
                initialFormState={userInitialState}
                value={users}
                onChange={setUsers}
                onOpenForm={handleOpenCloseRecordGroup}
                onCloseForm={handleOpenCloseRecordGroup}
                formContent={
                    <UserEmailsForm
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

export default RecordGroupTest
