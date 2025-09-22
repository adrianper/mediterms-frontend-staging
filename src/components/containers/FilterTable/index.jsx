import { useCallback, useMemo, useState } from "react"
import { useDebounced } from "hooks"

import { Icon, TextField } from "components"

import "./FilterTable.scss"
import FilterTableBody from "./FilterTableBody"
import FilterTableHeader from "./FilterTableHeader"

const FilterTable = (props) => {
    /*---------------------------------------PROPS-----------------------------------------*/
    let { className = "" } = props

    const {
        columns = [],
        rows = [],
        isLoadingRows = false,
        onChangeFilter = "",
        onClickRow,
        rowButtons = [],
        columnsTemplate,
    } = props

    /*---------------------------------------STATE-----------------------------------------*/
    const [filterValue, setFilterValue] = useState("")
    const [cardsLayout, setCardsLayout] = useState(false)
    const [sortColumn, setSortColumn] = useState(null)
    const [ascSort, setAscSort] = useState(true)

    /*---------------------------------------FUNCTIONS-----------------------------------------*/
    const debouncedChangeFilter = useDebounced((value) => {
        onChangeFilter(value)
    }, 500)

    const handleChangeFilterValue = useCallback(value => {
        setFilterValue(value)
        debouncedChangeFilter(value)
    }, [debouncedChangeFilter])

    const toggleAscSort = useCallback((column) => {
        setSortColumn(column)
        if (sortColumn && sortColumn === column) {
            setAscSort(currentVal => !currentVal)
        }
    }, [sortColumn])

    /*---------------------------------------RENDER-----------------------------------------*/
    const containerStyle = useMemo(() => ({
        "--filter-table-rows-template": `${columnsTemplate || `repeat(${columns.length}, 1fr)`}${rowButtons.length ? ` repeat(${rowButtons.length}, 1.2em)` : ""}`
    }), [columnsTemplate, columns.length, rowButtons.length])

    className += " filter_table_container"

    let sortedRows
    if (sortColumn) {
        const columnSortMethod = columns.find(({ name, sortMethod }) => sortMethod && name === sortColumn)?.sortMethod

        sortedRows = columnSortMethod ?
            rows.sort((a, b) => columnSortMethod(a, b, sortColumn, ascSort))
            :
            rows.sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return ascSort ? -1 : 1
                if (a[sortColumn] > b[sortColumn]) return ascSort ? 1 : -1
                return 0
            })
    }

    return (
        <div className={className} style={containerStyle}>
            <div className="filter_container">
                <TextField value={filterValue} onChange={handleChangeFilterValue}
                    autoComplete="nope"
                    placeholder="Buscar"
                />
                <div className="layout_selector">
                    <Icon
                        onClick={() => { setCardsLayout(true) }}
                        className={cardsLayout ? "active" : ""}
                        icon="vista-tarjeta" />
                    <Icon
                        onClick={() => { setCardsLayout(false) }}
                        className={!cardsLayout ? "active" : ""}
                        icon="vista-tabla" />
                </div>
            </div>

            <div className={`filter_table ${cardsLayout ? "cards_layout" : ""}`}>
                <FilterTableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    ascSort={ascSort}
                    toggleAscSort={toggleAscSort} />
                <FilterTableBody
                    columns={columns}
                    rows={sortColumn ? sortedRows : rows}
                    isLoadingRows={isLoadingRows}
                    onClickRow={onClickRow}
                    rowButtons={rowButtons} />
            </div>
        </div >
    )
}

export default FilterTable