import { memo } from 'react'
import reactFastCompare from 'react-fast-compare'

import { iconS3 } from 'scripts/assetsS3'
import './icon.scss'

const Icon = (props) => {
    let {
        icon = '',
        className = '',
        size = '',
        direction = 'top',
        style = {},
        filter = '',
        onClick
    } = props

    className += ' icon'
    className += icon !== '' ? ` icon--${icon}` : ''

    let rotation = ''
    switch (direction) {
        case 'left': rotation = -90; break
        case 'right': rotation = 90; break
        case 'bottom': rotation = 180; break
        default: break
    }

    if (filter !== '') style['filter'] = `var(--filter--${filter})`

    let styleSpan = {
        width: `${size}em`,
        height: `${size}em`,
        backgroundImage: `url(${iconS3(icon)})`,
        transform: `rotateZ(${rotation}deg)`,
        ...style
    }

    return (
        <span className={className} style={styleSpan} onClick={onClick} />
    )
}

export default memo(Icon, reactFastCompare)