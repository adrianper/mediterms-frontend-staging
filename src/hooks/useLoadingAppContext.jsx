import { useContext } from 'react'

import LoadingAppContext from 'context/LoadingAppContext'

const useLoadingAppContext = () => useContext(LoadingAppContext)

export default useLoadingAppContext