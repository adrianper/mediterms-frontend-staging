
import { useState, useRef, useEffect, forwardRef, useImperativeHandle, memo, useCallback } from 'react'
import reactFastCompare from 'react-fast-compare'
import { useClickOutside, useScrollOutside } from 'hooks'
import _$ from 'jquery';
import { Grid, Text, Icon } from 'components'
import ComboBoxList from './ComboBox__List'

const ComboBox = (props, ref) => {
    let {
        inputClassName = '',
        value = '',
        onChange,
        options = {},
        nullValue = false,
        required = false,
        placeholder = 'Elige una opción',

        w100,
        maxWidth,

        className = '',
        label = '',

        errorMessage = '',
        sortList = true,
        reverseList = false,
        floatingLabel = false,
    } = props

    /*-----------------------------------------------STATE-----------------------------------------------------------*/
    const [isOpen, setIsOpen] = useState(false)
    const [animationOnClose, setAnimationOnClose] = useState(false)
    const [comboStatus, setStatus] = useState('normal')
    const [isFocused, setIsFocused] = useState(false)

    /*-----------------------------------------------REF-----------------------------------------------------------*/
    const comboboxRef = useRef()
    const listRef = useRef()

    /*-----------------------------------------------HOOKS-----------------------------------------------------------*/
    useClickOutside(comboboxRef, () => {
        setIsOpen(false)
    })

    useScrollOutside(listRef, () => {
        setAnimationOnClose(false)
        setIsOpen(false)
    })

    /*-----------------------------------------------FUNCTIONS-----------------------------------------------------------*/
    const handleFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
        setIsFocused(false)
    }, [])

    const handleClickCombobox = useCallback(() => {
        setIsOpen(opened => !opened)
    }, [])

    const handleChange = useCallback((value) => {
        setStatus('normal')
        onChange(value)
        setIsOpen(false)
    }, [onChange])

    /*------------------------------------------IMPERATIVE HANDLE------------------------------------------------------*/
    const validate = useCallback(() => {
        let valid = true

        if (required) {
            if (value === '') {
                setStatus('error')
                valid = false
            }
        }

        return valid
    }, [required, value])

    useImperativeHandle(ref, () => ({
        validate,
        setStatus,
        errorMessage,
    }), [errorMessage, validate, setStatus])

    /*-----------------------------------------------EFFECTS-----------------------------------------------------------*/
    useEffect(() => {
        if (!isOpen) return
        const selectedElement = comboboxRef.current.getElementsByClassName('combobox__list__option--selected')[0]
        if (selectedElement)
            setTimeout(() => {
                _$(comboboxRef.current).find('.combobox__list').scrollTop(selectedElement.offsetTop)
            }, 50)

        if (!animationOnClose) setAnimationOnClose(true)
    }, [isOpen])

    useEffect(() => {
        if (nullValue)
            options[""] = placeholder
    }, [nullValue, options, placeholder])

    /*-----------------------------------------------RENDER------------------------------------------------------------*/
    if (!label) className += ' no_label'
    if (value !== '' || !floatingLabel) className += ' label_up'
    if (isFocused) className += ` combobox--focused`
    className += ` combobox--status--${comboStatus}${floatingLabel ? ' floating_label' : ''}`

    inputClassName += ' combobox'

    /*-----------------------------------------------TEXT-----------------------------------------------------------*/
    const text = value !== '' ? options[value] : (floatingLabel ? '_' : placeholder)

    return (
        <Grid w100={w100} maxWidth={maxWidth} ref={comboboxRef}
            gap='1em' className={`${className} combobox__container`} >
            {label && <label className='combobox__label'>{label}</label>}
            <Grid className={inputClassName} onClick={handleClickCombobox} tabIndex='0'
                contentY="center" itemsY='center' direction='column' gap='1em' columns='1fr auto'
                onFocus={handleFocus} onBlur={handleBlur}>
                <Text className='combobox__text'>{text}</Text>
                <Icon icon='arrow' className='combobox__arrow' direction="right" size='1' />
                <fieldset className='combobox__fieldset'>
                    <legend className='combobox__legend'>{label}</legend>
                </fieldset>
            </Grid>

            <ComboBoxList {...{
                listRef, options, value, handleChange, comboboxRef,
                isOpen, animationOnClose, sortList, reverseList
            }} />
        </Grid>
    )
}

export default memo(forwardRef(ComboBox), reactFastCompare)