import { createContext, useCallback, useState } from "react"

const SideMenuContext = createContext({isOpen: false})

export const SideMenuContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleSideMenu = useCallback(() => {
        setIsOpen(isOpen => !isOpen)
    }, [])

    return <SideMenuContext.Provider {...{value: {isOpen, toggleSideMenu}, children}} />
}

export default SideMenuContext