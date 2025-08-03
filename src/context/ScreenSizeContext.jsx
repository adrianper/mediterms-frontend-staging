import { useScreenSize } from './contextHooks'
import React, { createContext } from 'react'

const ScreenSizeContext = createContext('')

export const ScreenSizeContextProvider = ({children}) => {
    
    const screenSize = useScreenSize()
    
    return <ScreenSizeContext.Provider {...{value: screenSize, children}}/>
}

export default ScreenSizeContext