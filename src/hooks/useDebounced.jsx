import { useRef } from 'react'
import _ from 'lodash'

const useDebounced = (func, delay = 250) => {
    const debouncedFunction = useRef(_.debounce(func, delay))
    return debouncedFunction.current
}

export default useDebounced