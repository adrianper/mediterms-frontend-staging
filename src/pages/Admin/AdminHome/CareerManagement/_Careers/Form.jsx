import { Modal, Button, Grid, Text, TextField } from "components"
import { useCallback } from "react"

function CareerForm(props) {
    const {
        setIsModalOpen,
        formData,
        setFormData,
        UPDATE_CAREER,
        CREATE_CAREER
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
            UPDATE_CAREER(formData)
        } else {
            CREATE_CAREER(formData)
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
                    {formData.id ? "Actualizar" : "Crear "} Carrera
                </Text>
                <TextField
                    label="Nombre" value={formData.name} onChange={(v) => onChangeHandler(v, "name")}
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

export default CareerForm