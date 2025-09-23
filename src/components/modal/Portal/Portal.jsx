import { memo } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }) => createPortal(children, document.body)

export default memo(Portal)