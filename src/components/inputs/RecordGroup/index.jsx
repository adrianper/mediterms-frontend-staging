import { useCallback, useImperativeHandle, useState, } from "react"

import { Flex, Grid, Slider } from "components"

import RecordGroupList from "./RecordGroupList"

import "./RecordGroup.scss"

const RecordGroup = (props) => {
    /*--------------------------------------PROPS-----------------------------------*/
    const {
        columns = [],
        deletingMessage = "¿Estás seguro que quieres borrar este registro?",
        formContent,
        initialFormState,
        maxWidth,
        onChange,
        onOpenForm,
        onCloseForm,
        ref,
        style,
        value = {},
    } = props

    let { className = "" } = props

    /*--------------------------------------STATE-----------------------------------*/
    const [sliderScreen, setSliderScreen] = useState(0)

    /*--------------------------------------FUNCTIONS-----------------------------------*/
    const openForm = useCallback(
        (record = initialFormState) => {
            let lastRecordId = record.id || null
            if (lastRecordId) {
                lastRecordId = (value.filter(({ id }) => id < 0).pop()?.id || 0) - 1
                record.isNewRecord = true
                record.id = lastRecordId
            } else {
                record.isNewRecord = false
            }

            if (onOpenForm) onOpenForm(record)
            setSliderScreen(1)
        },
        [onOpenForm, value]
    )

    const closeForm = useCallback(() => {
        if (onCloseForm) onCloseForm()
        setSliderScreen(0)
    }, [])

    const deleteRecord = useCallback(
        (record) => {
            console.log(record)
            if (confirm(deletingMessage)) {
                onChange((prevState) => prevState.filter(({ id }) => id !== record.id))
            }
        },
        [deletingMessage, onChange]
    )

    useImperativeHandle(ref, (() => ({
        openForm,
        closeForm,
    })), [openForm, closeForm])

    /*--------------------------------------RENDER-----------------------------------*/
    const templateColumns = `repeat(${columns.length}, 1fr) auto`
    className = `${className} record_group record_group--status--${"normal"}`

    return (
        <Flex style={{ ...style, maxWidth }} tabIndex={0} className={className}>
            <Slider currentScreen={sliderScreen}>
                <RecordGroupList
                    value={value}
                    columns={columns}
                    templateColumns={templateColumns}
                    openForm={openForm}
                    deleteRecord={deleteRecord}
                />
                <Grid
                    className="record_group__form"
                    padding="1.75rem 2.25rem"
                    gap="1em"
                >
                    {formContent}
                </Grid>
            </Slider>
        </Flex>
    )
}

export default RecordGroup
