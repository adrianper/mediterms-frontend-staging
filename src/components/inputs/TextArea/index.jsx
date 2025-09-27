import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import "./TextArea.scss"

const TextArea = (props) => {
    /*------------------------------------PROPS--------------------------------*/
    let {
        className, label, value = '', onChange, placeholder,
        padding, margin, w100, h100, maxWidth, style, ref, ...rest
    } = props

    /*------------------------------------STATE---------------------------------*/
    const [focused, setFocused] = useState(false)

    /*------------------------------------REFS--------------------------*/
    const textFieldRef = useRef()

    /*------------------------------------FUNCTIONS--------------------------*/
    const handleFocus = useCallback(() => {
        setFocused(focused => !focused)
    }, [])

    /*------------------------------------EXTERNAL FUNCTIONS-------------------------------*/
    useImperativeHandle(ref, () => ({
        focus: () => textFieldRef.current.focus(),
        value,
    }), [textFieldRef, value])

    /*------------------------------------EFFECT-------------------------------*/
    useEffect(() => () => { }, [])

    /*------------------------------------RENDER-------------------------------*/
    className = className ? `${className} text_area_container` : 'text_area_container'

    style = useMemo(() => ({
        padding,
        margin,
        width: w100 && '100%',
        height: h100 && '100%',
        maxWidth,
        ...style
    }), [padding, margin, w100, h100, maxWidth, style])

    !label && (className += ' no_label')
    if (value !== '' || focused) className += ' label_up'
    focused && (className += ' focused')

    return (
        <div className={className} style={style}>
            {label && <label className='text_area__label'>{label}</label>}
            <div className='text_area'>
                <textarea
                    ref={textFieldRef}
                    className='text_area__input'
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    placeholder={(focused || !label) ? placeholder : ''}
                    value={value}
                    {...rest}
                />
                <fieldset className='text_area__fieldset'>
                    <legend className='text_area__legend'>{label}</legend>
                </fieldset>
            </div>
        </div>
    )
}

export default TextArea
