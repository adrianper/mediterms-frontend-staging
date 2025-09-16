import React from 'react'
import './button.scss'

const Button = props => {
    let {
        className = '',
        width = '',
        maxWidth = '',
        alignSelf = '',
        justifySelf = '',
        selfCenter = false,
        style = {},
        disabled = false,
        ...rest
    } = props

    if(selfCenter){justifySelf = 'center'; alignSelf = 'center'}
    style = {
        ...style,
        width,
        maxWidth,
        alignSelf,
        justifySelf
    }
    className += ' button'

    if(disabled)
        className += ' disabled'

    return <button {...{className, style, ...rest}}>{props.children}</button>

}

export default Button
