import { memo, } from 'react'
import reactFastCompare from 'react-fast-compare'

const ComboBoxList = (props) => {

    const {
        listRef, options, value, handleChange,
        comboboxRef, isOpen, animationOnClose, sortList, reverseList
    } = props

    /*---------------------------------POSITIONING---------------------------------*/
    const windowWidth = window.innerWidth, windowHeight = window.innerHeight
    const style = {}

    if (!animationOnClose) style['display'] = 'none'

    if (comboboxRef.current) {
        const comboLocation = comboboxRef.current.getBoundingClientRect()
        style['width'] = comboLocation.width

        if (comboLocation.top > windowHeight - comboLocation.bottom) style['bottom'] = windowHeight - comboLocation.top
        else style['top'] = comboLocation.bottom

        if (comboLocation.left > windowWidth - comboLocation.right) style['right'] = windowWidth - comboLocation.right
        else style['left'] = comboLocation.left
    }

    /*-----------------------------------OPTIONS-----------------------------------*/
    const createOption = (i, key) => {
        // Ignore data type in key and value comparisson, keys can be numeric or string
        const className = `combobox__list__option ${key == value ? 'combobox__list__option--selected' : ''}`
        return <li {...{ className, key, onClick: () => handleChange(key) }}>
            {options[key]}
        </li>
    }

    let optionsList = []

    Object.keys(options).forEach((k, i) => {
        if (k !== "" && k !== '9999') optionsList.push(createOption(i + 1, k))
    })

    if (sortList) {
        optionsList = optionsList.sort((a, b) => {
            if (options[a.key].toString().toLowerCase() < options[b.key].toString().toLowerCase()) return -1
            if (options[a.key].toString().toLowerCase() > options[b.key].toString().toLowerCase()) return 1
            return 0
        })
    }
    if (reverseList) {
        optionsList = optionsList.reverse()
    }

    if (options['']) optionsList.unshift(createOption(0, ""))
    if (options['9999']) optionsList.push(createOption('9999', '9999'))

    const listClassName = `combobox__list ${!isOpen ? 'combobox__list--invisible' : ''}`

    return <ul ref={listRef} className={listClassName} {...{ style }}>
        {optionsList}
    </ul>
}

export default memo(ComboBoxList, reactFastCompare)