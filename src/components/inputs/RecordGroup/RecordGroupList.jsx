import { useCallback } from "react"

import { Grid, Icon, Text } from "components"

import ListItem from "./RecordGroupListItem"

const RecordGroupList = (props) => {
    const { value, columns, templateColumns, openForm, deleteRecord } = props

    const handleClickAdd = useCallback(() => {
        openForm()
    }, [openForm])

    return (
        <Grid className="record_group__list" columns="100%">
            <Grid
                className="record_group__header"
                itemsY="center"
                direction="column"
                columns={templateColumns}
                pad="0.3em 1em"
            >
                {columns.map((column, i) => (
                    <Text key={i} className="record_group__header__text" size="2">{column.label}</Text>
                    // <Grid key={i} columns={`auto${column.helpText ? ' 1fr' : ''}`} gap="0.5em">
                    //     <Text className="record_group__header__text" size="2">{column.label}</Text>
                    //     {column.helpText && <HelpButton>{column.helpText}</HelpButton>}
                    // </Grid>
                ))}
                <Icon icon='add' size='1.25' onClick={handleClickAdd} />
            </Grid>
            <Grid className="record_group__content">
                {value.map((record, key) => (
                    <ListItem
                        key={key}
                        templateColumns={templateColumns}
                        columns={columns}
                        record={record}
                        openForm={() => openForm(record)}
                        deleteRecord={deleteRecord}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default RecordGroupList
