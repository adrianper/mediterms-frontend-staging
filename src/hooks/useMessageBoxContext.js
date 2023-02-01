import MessageBoxContext from "context/MessageDialogContext"
import { useContext } from "react"

const useMessageBoxContext = () => useContext(MessageBoxContext)

export default useMessageBoxContext