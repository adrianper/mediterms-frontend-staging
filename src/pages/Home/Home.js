import React from 'react'

import { Flex, Grid, Text } from 'components'

import './home.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <Grid className="home_page" itemsX="center" padding="1.14em 0.42em">
            <Grid w100 gap="1.7em" padding="1.7em 1.85em" className="home_page__list">
                <Text bold size="5" align="center">¿Qué quieres estudiar?</Text>
                <Text bold color="first" onClick={() => { navigate(`/terms`) }} className="section_card all_terms">
                    Todos los terminoss
                </Text>
                <Grid gap="0.7em">
                    <Grid onClick={() => { navigate(`/terms/1`) }} className="section_card">
                        <Text bold>Subfijos</Text>
                        <Text medium>Principiante</Text>
                    </Grid>
                    <Grid onClick={() => { navigate(`/terms/2`) }} className="section_card">
                        <Text bold>Prefijos</Text>
                        <Text medium>Principiante</Text>
                    </Grid>
                    <Grid onClick={() => { navigate(`/terms/3`) }} className="section_card">
                        <Text bold>Terminos hospitalarios</Text>
                        <Text medium>Principiante</Text>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
