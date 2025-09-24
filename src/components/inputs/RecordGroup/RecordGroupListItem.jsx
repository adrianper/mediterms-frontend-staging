import { useCallback } from "react"

import { Grid, Icon, Text } from "components"

const RecordGroupListItem = (props) => {
    const { templateColumns, columns, record, openForm, deleteRecord } = props

    const handleClickDelete = useCallback(
        (e) => {
            e.stopPropagation()
            deleteRecord(record)
        },
        [deleteRecord, record]
    )

    return (
        <Grid
            className="record_group__content__record"
            columns={templateColumns}
            itemsY="center"
            gap="0.3em"
            onClick={openForm}
        >
            {columns.map((column, i) => (
                <Text key={i} className='record_group__content__record__label'>
                    {column.format ?
                        column.format(record[column.name], record)
                        :
                        record[column.name]}
                </Text>
            ))}

            <Icon size="1.2em" icon="trash" onClick={handleClickDelete} />
        </Grid>
    )
}

export default RecordGroupListItem
