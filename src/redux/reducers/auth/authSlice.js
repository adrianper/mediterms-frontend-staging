import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))
const userInitialState = {
    photoUrl: "",
    name: '',
    email: ''
}
const initialState = {
    user: { ...userInitialState,...user},
    authenticated: !!user,
    isLoading: false,
    message: '',
}

export const signup = createAsyncThunk('/user/signup', async (userData, thunkAPI) => {
    try {
        return await authService.signup(userData)
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const login = createAsyncThunk('/user/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        reset: state => {
            state.user = null
            state.accountInfo  = {}
            state.authenticated = false
            state.isLoading = false
            state.message = ''
        },
        setUser: (state, action) => {
            // if(isNaN(action.payload)) return;
            state.user = {...state.user, ...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, state => {
                state.isLoading = true
            })
            // .addCase(signup)
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.authenticated = !action.payload.error
                state.message = action.payload.error ? action.payload.error : ''
                state.user = action.payload.error ? null : action.payload.user
            })
            .addCase(signup.rejected, (state, action) => {
                state.user = null
                state.authenticated = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.authenticated = !action.payload.error
                state.message = action.payload.error ? action.payload.error : ''
                state.user = action.payload.error ? null : action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null
                state.authenticated = false
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset,  setUser} = authSlice.actions

export default authSlice.reducer