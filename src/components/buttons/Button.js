import React from 'react'
import './button.scss'

const Button = props => {
    let {
        className = '',
        ...rest
    } = props

    className += ' button'

    return <button {...{className, ...rest}}>{props.children}</button>

}

export default Button
