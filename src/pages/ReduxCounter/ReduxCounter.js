import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Grid, TextField } from 'components'
import { decrement, increment, incrementQuantity } from 'redux/reducers/counter/counterSlice'

const ReduxCounter = () => {
    const [amount, setAmount] = useState()
    const { counter } = useSelector(store => store)

    const dispatch = useDispatch()

    return (
        <Grid gap="1em" itemsX="center">
            <TextField type="number" label="Quantity" value={amount} onChange={setAmount} />
            <p>Count: {counter.count}</p>
            <Grid gap="1em" columns="repeat(3, auto)">
                <Button onClick={() => dispatch(increment())}>+ 1</Button>
                <Button onClick={() => dispatch(decrement())}>- 1</Button>
                <Button onClick={() => dispatch(incrementQuantity(amount))}>+ Quantity</Button>
            </Grid>
        </Grid>
    )
}

export default ReduxCounter

