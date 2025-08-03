import { MessageBox } from "components"
import { createContext, useCallback, useRef } from "react"

const initialState = {
    showMB: () => { },
    hideMB: () => { }
}

const MessageBoxContext = createContext(initialState)

export const MessageBoxContextProvider = ({ children }) => {
    const messageBoxRef = useRef()

    const showMB = useCallback((title = '', content = '') => {
        messageBoxRef.current.show({ title, content })
    }, [])

    const hideMB = useCallback(() => {
        messageBoxRef.current.hide()
    }, [])

    return (
        <MessageBoxContext.Provider value={{ showMB, hideMB }}>
            <MessageBox ref={messageBoxRef} />
            {children}
        </MessageBoxContext.Provider>
    )
}

export default MessageBoxContext