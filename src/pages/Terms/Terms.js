import { Grid } from 'components'
import React from 'react'
import { useParams } from 'react-router-dom'

const Terms = () => {

    const { id } = useParams()

    return (
        <Grid>
            Terms section: {id}
        </Grid>
    )
}

export default Terms
