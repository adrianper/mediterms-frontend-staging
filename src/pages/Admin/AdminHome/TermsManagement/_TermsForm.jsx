import { Modal, Button, Grid, Text, TextField, ComboBox } from "components"
import { useCallback } from "react"

function TermsForm(props) {
    const {
        setIsModalOpen,
        topics,
        formData,
        setFormData,
        UPDATE_TERM,
        CREATE_TERM
    } = props


    const onChangeHandler = useCallback((value, key) => {
        setFormData(datum => {
            const newFormData = { ...datum }
            newFormData[key] = value
            return newFormData
        })
    }, [])
    const OnSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (formData.id) {
            UPDATE_TERM(formData)
        } else {
            CREATE_TERM(formData)
        }
        setFormData({ id: "", term: "", definition: "", topicId: "" })
        setIsModalOpen(false)
    }

    const onClose = () => {
        setIsModalOpen(false)
        setFormData({ id: "", term: "", definition: "", topicId: "" })
    }

    return <Modal>
        <form onSubmit={OnSubmit} style={{
            justifyItems: "center",
            display: "grid",
            gridTemplateColumns: "1fr"
        }}>
            <Grid w100 padding="1.72em 1.1em" className="term_definition__form" gap="1.3em" maxWidth="22em">
                <Text size="5" align="center" bold>
                    {formData.id ? "Actualizar" : "Crear "} Termino
                </Text>
                <TextField
                    label="Termino" value={formData.term} onChange={(v) => onChangeHandler(v, "term")}
                />

                <ComboBox
                    label="Terma" options={topics} value={formData.topicId} onChange={v => onChangeHandler(v, "topicId")}
                />

                <TextField
                    label="Definicion" value={formData.definition} onChange={(v) => onChangeHandler(v, "definition")}
                />
                <Grid w100 columns="1fr 1fr" gap="1rem">
                    <Button variant="error" onClick={onClose}>
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

export default TermsForm