import { TextField, Toggle } from "components"
import React from "react"

function useRenderInput(input, inputProps) {
	switch (input) {
		case "calendar":
			return null //<CalendarV2 {...inputProps} />
		case "date_month_year":
			return null //<DateMonthYear {...inputProps} />
		case "checkbox":
			return null //<CheckBox {...inputProps} />
		case "checkbox_group":
			return null //<CheckBoxGroup {...inputProps} />
		case "combobox":
			return null //<ComboBox {...inputProps} />
		case "combobox_range":
			return null //<ComboBoxRange {...inputProps} />
		case "file_input":
			return null //<FileInput {...inputProps} />
		case "toggle":
			return <Toggle {...inputProps} />
		case "record_group":
			return null //<RecordGroup {...inputProps} />
		case "record_group_checkbox":
			return null //<RecordGroupCheckBox {...inputProps} />
		case "text_field":
			return <TextField {...inputProps} />
		default:
			return null
	}
}

export default useRenderInput
