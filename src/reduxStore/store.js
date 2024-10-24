import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth/authSlice'
import counterReducer from './reducers/counter/counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authSlice
    },
    //*******************************UNCOMMENT FOR PRODUCTION*******************************
    // devTools: false
}) 