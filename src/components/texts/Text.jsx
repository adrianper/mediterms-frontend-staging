import React, { memo, forwardRef } from 'react'
import reactFastCompare from 'react-fast-compare'
import './text.scss'

export default memo ( forwardRef(function Text (props, ref) {
    let {
        children = '',
        size = '',
        regular = false,
        medium = false,
        bold = false,
        align = '',
        color = '',
        unselectable = false,
        className = '',
        flexWrap = false,
        width = '',
        height = '',
        maxWidth = '',
        w100 = false,
        h100 = false,
        list = false,
        span = false,
        elipsis = false,
        elipsisLines = 1,
        style = {},
        
        onClick = () => {},
        ...rest
    } = props
    
    
    const tp = (propName, prop) => {
        if(prop !== '' && prop !== undefined) return ` text-${propName}--${prop}`
        else return ''
    }
    
    className += ` text`
    className += tp('size',size)
    className += tp('align',align)
    className += tp('color',color)
    if(regular) className += ' text--regular'
    if(medium) className += ' text--medium'
    if(bold) className += ' text--bold'
    className += flexWrap ? ' flex--wrap' : ''
    if(unselectable) className += ' text--unselectable' 
    
    if(w100) width = '100%'
    if(h100) height = '100%'
    
    // style['width'] = width
    // style['height'] = height
    // style['maxWidth'] = maxWidth
    // style['justifyContent'] = (flexWrap && align == 'center') ? 'center' : ''
    style = {
        ...style,
        width,
        height,
        maxWidth,
        justifyContent: (flexWrap && align === 'center') ? 'center' : ''
    }
    
    if(elipsis){ 
        className += ' text--elipsis'
        style['WebkitLineClamp'] = elipsisLines
    }
    
    const tagProps = {className, style, onClick,  ref}
    
    if(list) return <li {...tagProps} > {children}</li>
    if(span) return <span {...tagProps}> {children}</span>

    switch(parseInt(size)){
        case 10: return <h1 {...{...tagProps, ...rest}}> {children} </h1>
        case 9: return <h2 {...{...tagProps, ...rest}}> {children} </h2>
        case 8: return <h3 {...{...tagProps, ...rest}}> {children} </h3>
        case 7: return <h4 {...{...tagProps, ...rest}}> {children} </h4>
        case 6: return <h5 {...{...tagProps, ...rest}}> {children} </h5>
        default: return <p {...{...tagProps, ...rest}}> {children} </p>
    }
}), reactFastCompare)