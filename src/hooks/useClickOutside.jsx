
import { useEffect } from 'react'
import $ from 'jquery';
const useClickOutside = (ref, callback) => {

    useEffect(() => {
        const onOutsideClick = e => {
            if (ref.current && !ref.current.contains(e.target))
                if ($(e.target).parents('*[data-skip-click-outside="1"]').length === 0)
                    if (e.target.dataset.skipClickOutside !== '1')
                        callback(e)
        }
        window.addEventListener('mousedown', onOutsideClick)
        return () => {
            window.removeEventListener('mousedown', onOutsideClick)
        }
    }, [callback, ref])
}

export default useClickOutside
