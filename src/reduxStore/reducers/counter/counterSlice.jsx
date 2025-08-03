import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
    },
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementQuantity: (state, action) => {
            if (isNaN(action.payload) || action.payload.includes('e')) return
            
            state.count += parseFloat(action.payload)
        },
    },
})

export const { increment, decrement, incrementQuantity } = counterSlice.actions

export default counterSlice.reducer