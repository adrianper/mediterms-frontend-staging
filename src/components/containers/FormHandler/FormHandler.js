import React, { createRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

import { /*usePageMessages, */useRenderInput } from 'hooks'

// import { Text } from 'components'

const FormHandler = (props, ref) => {
    /*--------------------------------------PROPS-----------------------------------*/
    const {
        fields,
        formData,
        setFormData,
    } = props

    /*--------------------------------------STATE-----------------------------------*/

    /*--------------------------------------REFS-----------------------------------*/
    const fieldsRef = useRef(Object.keys(fields).filter(key => !key.includes('label')).map(key => createRef()))

    /*--------------------------------------HOOKS-----------------------------------*/
    const renderInput = useRenderInput()
    // const { messageBox } = usePageMessages()

    /*--------------------------------------FUNCTIONS-----------------------------------*/
    const handleChangeData = useCallback((name, value) => {
        setFormData(formData => ({ ...formData, [name]: value }))
    }, [])

    const setInputProps = (name) => {
        const {
            onChange,
        } = fields[name]

        const handleChangeField = value => {
            handleChangeData(name, value)
            onChange && onChange(value)
        }

        return ({
            onChange: handleChangeField,
            value: formData[name] || fields[name].inputProps && fields[name].inputProps.defaultValue
        })
    }

    /*--------------------------------------IMPERATIVEHANDLE-----------------------------------*/
    const validateFields = useCallback(() => {
        const errors = []
        let valid = true

        fieldsRef.current.map(f => {
            if (f.current.validate && !f.current.validate()) {
                valid = false
                if (f.current.errorMessage != '')
                    errors.push(f.current.errorMessage)
            }
        })

        if (!valid) {
            return console.error('error')
            // messageBox.current.show({ type: 'message-multiple', title: 'Hay campos inválidos', content: errors })
        }

        return valid
    }, [fieldsRef.current/*, messageBox.current*/])

    useImperativeHandle(ref, () => ({
        validate: validateFields,
        fieldsRef: fieldsRef.current,
        // messageBox: messageBox.current,
    }), [validateFields])

    /*--------------------------------------RENDER-----------------------------------*/
    let fieldCount = 0
    return Object.keys(fields).map((key, i) => key.includes('label') ?
        <Text {...{ key, children: fields[key] }} />
        :
        renderInput(fields[key].input, { key, ref: fieldsRef.current[fieldCount++], ...fields[key].inputProps, ...setInputProps(key) })
    )
}

export default forwardRef(FormHandler)