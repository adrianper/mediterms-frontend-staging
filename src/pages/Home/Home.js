import React from 'react'

import { Flex, Grid } from 'components'

import './home.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <Grid className="home_page" gap="1.5rem">
            <Flex onClick={() => { navigate(`/terms/all`) }} className="section_card">
                <b>Todos los terminos</b>
            </Flex>
            <Grid gap="1rem">
                <Flex onClick={() => { navigate(`/terms/suffixes`) }} className="section_card" direction="column">
                    <b>Subfijos</b>
                    <p>Principiante</p>
                </Flex>
                <Flex onClick={() => { navigate(`/terms/prefixes`) }} className="section_card" direction="column">
                    <b>Prefijos</b>
                    <p>Principiante</p>
                </Flex>
                <Flex onClick={() => { navigate(`/terms/hospital`) }} className="section_card" direction="column">
                    <b>Terminos hospitalarios</b>
                    <p>Principiante</p>
                </Flex>
            </Grid>
        </Grid>
    )
}

export default Home
