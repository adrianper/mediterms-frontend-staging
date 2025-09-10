
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useReducer } from 'react'

import { Button, Flex, Grid, Text } from 'components'

const initReducer = {
    isOpen: false,
    messageType: 'message-single',
    messageContent: '',
    messageTitle: '',
    closeBtnText: 'Cerrar',
    onCloseCallback: () => { },
    // messageAnimation: 'MD-Alerta',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return initReducer
        case 'show':
            return { ...state, ...action.payload, isOpen: true }
        case 'hide':
            return { ...initReducer, isOpen: false }
        default:
            return initReducer
    }
}

export default memo(forwardRef(function CustomMessageBox(props, ref) {

    let {
        className = '',
        // buttons
    } = props

    const [state, dispatch] = useReducer(reducer, initReducer)

    /*---------------------------------------STATE-------------------------------------------*/
    const {
        isOpen, messageContent, messageType, messageTitle, closeBtnText, onCloseCallback,
        /*messageAnimation,*/
    } = state

    /*---------------------------------------REFS--------------------------------------------*/
    const messageBoxRef = useRef()

    /*---------------------------------EXTERNAL FUNCTIONS------------------------------------*/
    const show = useCallback(({
        content = '', title = '', type = 'message-single', closeText = "Cerrar", onClose = () => { }
        //, animation = 3
    }) => {
        if (type === 'message-list' && content === '') content = []

        dispatch({
            type: 'show', payload: {
                messageContent: content,
                messageType: type,
                messageTitle: title,
                closeBtnText: closeText,
                onCloseCallback: onClose,
                // messageAnimation: window.switchMDAnimation(animation ?? 3),
            }
        })
    }, [dispatch])

    const hide = useCallback(() => {
        onCloseCallback && onCloseCallback()
        dispatch({ type: 'hide' })
    }, [onCloseCallback, dispatch])

    const error = useCallback((errors = [], animation = 2) => {
        show({ type: 'message-list', title: 'Hubo un problema', content: errors, animation })
    }, [show])

    useImperativeHandle(ref, () => ({
        show,
        hide,
        error,
    }))

    /*--------------------------------------RENDER-------------------------------------------*/
    className = className ? `message_box ${className}` : 'message_box'

    const containerProps = { className: 'message_box__content', gap: '1em', w100: true }

    if (!isOpen) return null

    else {
        let contentRender
        switch (messageType) {
            case 'message-single':
                contentRender = (
                    <Grid {...containerProps}>
                        <Text>
                            {messageContent}
                        </Text>
                    </Grid>
                )
                break
            case 'message-list':
                contentRender = (
                    <Grid {...containerProps}>
                        <ul>
                            {messageContent.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </Grid>
                )
                break
            default: contentRender = null
        }

        return (
            <Flex w100 h100 align='center' justify='center' className='message_box_modal' ref={messageBoxRef}>
                <Grid w100 className={className} padding='2em' gap='1em' rows={messageTitle !== '' ? 'auto 1fr auto' : '1fr auto'}>
                    {/* <Flex centerX maxHeight='10em'>
                        <Animation autoplay loop animation={messageAnimation} />
                    </Flex> */}
                    {messageTitle !== '' && <Text bold className='message_box__title'>{messageTitle}</Text>}
                    {contentRender}
                    <Flex wrap className='message_box__buttons' justify='center'>
                        <Button onClick={hide}>{closeBtnText}</Button>
                    </Flex>
                </Grid>
            </Flex>
        )
    }
}))