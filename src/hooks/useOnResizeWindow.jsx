import { useCallback, useEffect } from 'react'

const useOnResizeWindow = (callback) => {
    const onResize = useCallback(e => {
        callback(e)
    }, [callback])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])
}

export default useOnResizeWindow