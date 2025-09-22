import { Icon, Text } from "components"

const FilterTableHeader = ({ columns, sortColumn, ascSort, toggleAscSort }) => {

    return (
        <div className="table__header">
            {columns.map((col, i) =>
                <div key={i} className="header__data" onClick={() => toggleAscSort(col.name)}>
                    <Text className="header_data__text">{col.displayName}</Text>
                    {sortColumn === col.name && <Icon size="1" icon="arrow" direction={ascSort ? "right" : "left"} />}
                </div>
            )}
        </div>
    )
}

export default FilterTableHeader
