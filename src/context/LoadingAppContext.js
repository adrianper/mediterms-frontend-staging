import { Loading } from "components"
import { createContext, useCallback, useState } from "react"

const initialState = {
    startLoading: () => { },
    stopLoading: () => { },
}

const LoadingAppContext = createContext(initialState)

export const LoadingAppContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [loadingCount, setLoadingCount] = useState(false)

    const startLoading = useCallback(() => {
        setIsLoading(true)
        setLoadingCount(loadingCount => loadingCount++)
    }, [])

    const stopLoading = useCallback(() => {
        if (loadingCount === 1) setIsLoading(false)
        setLoadingCount(loadingCount => loadingCount--)
    }, [loadingCount])

    return (
        <LoadingAppContext.Provider value={{ startLoading, stopLoading }}>
            <Loading isLoading={isLoading} />
            {children}
        </LoadingAppContext.Provider>
    )
}

export default LoadingAppContext
