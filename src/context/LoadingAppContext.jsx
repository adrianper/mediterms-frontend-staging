import { Loading } from "components"
import { createContext, useCallback, useState } from "react"

const initialState = {
    startLoading: () => { },
    stopLoading: () => { },
}

const LoadingAppContext = createContext(initialState)

export const LoadingAppContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const setLoadingCount = useState(0)[1]

    const startLoading = useCallback(() => {
        setIsLoading(true)
        setLoadingCount(loadingCount => ++loadingCount)
    }, [setLoadingCount])

    const stopLoading = useCallback(() => {
        setLoadingCount(loadingCount => {
            if (loadingCount === 1) setIsLoading(false)
            return --loadingCount
        })
    }, [setLoadingCount])

    return (
        <LoadingAppContext.Provider value={{ startLoading, stopLoading }}>
            <Loading isLoading={isLoading} />
            {children}
        </LoadingAppContext.Provider>
    )
}

export default LoadingAppContext
