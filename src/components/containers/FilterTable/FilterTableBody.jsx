import { useCallback } from "react"

import { Icon, Loading } from "components"

const FilterTableBody = ({ columns, rows, isLoadingRows, onClickRow, rowButtons }) => {

    const handleClickRow = useCallback((data) => {
        onClickRow && onClickRow(data)
    }, [onClickRow])

    const handleClickRowBtn = useCallback((e, callback, data) => {
        e.stopPropagation()
        callback(data)
    }, [])

    const cardRowsTemplate = `repeat(${columns.length}, auto)`

    return (
        <div className="table__body">
            {rows.map((row, i) =>
                <div key={i} className={`table__row${!!onClickRow ? " clickable" : ""}`} onClick={() => { handleClickRow(row) }} style={{ "--var-card-rows-template": cardRowsTemplate }}>
                    {columns.map((col, j) => {
                        const value = row[col.name]
                        return (
                            <div key={`${i}-${j}`} className="row__data">
                                <p className="row_data__text">
                                    {typeof col.format === "function" ?
                                        col.format(value, row)
                                        :
                                        value
                                    }
                                </p>
                            </div>
                        )
                    }
                    )}
                    {rowButtons.map((button, key) =>
                        <Icon key={key} size="1.2em" icon={button.icon} onClick={(e) => { handleClickRowBtn(e, button.onClick, row) }} />
                    )}
                </div>
            )}
            <Loading isLoading={isLoadingRows} />
        </div>
    )
}

export default FilterTableBody
