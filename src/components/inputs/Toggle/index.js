import React, { forwardRef, memo, useCallback } from 'react'

import './styles.scss'

const Toggle = (props, ref) => {
    const {
        label1,
        label2,
        value = false,
        onChange,
    } = props

    const handleChange = useCallback(() => {
        onChange(value => !value)
    }, [onChange])

    return (
        <div className="toggle_switch">
            {label1 && <label className="toggle_switch__label label1">{label1}</label>}
            <div className="toggle_switch__switch" onClick={handleChange}>
                <span className={`toggle_switch__slider${value ? ' active' : ''}`}></span>
            </div>
            {label2 && <label className="toggle_switch__label label2">{label2}</label>}
        </div>
    )
}

export default memo(forwardRef(Toggle))