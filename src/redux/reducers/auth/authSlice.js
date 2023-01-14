import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initState = {
    user: null,
    authenticated: false,
    isLoading: false,
    message: '',
}

export const signup = createAsyncThunk('/auth/signup', async (userData, thunkAPI) => {
    try {
        return await authService.signup(userData)
    } catch (error) {
        const errorMessage = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const login = createAsyncThunk('/auth/login', async (userData, thunkAPI) => {
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
    initialState: {
        ...initState,
        user: user ?? null
    },
    reducers: {
        reset: state => {
            Object.keys(state).forEach(key => {
                state[key] = initState[key]
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, state => {
                state.isLoading = true
            })
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

export const { reset } = authSlice.actions

export default authSlice.reducer