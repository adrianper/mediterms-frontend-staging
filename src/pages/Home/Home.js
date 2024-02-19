import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Grid, Text } from 'components'

import './home.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [topics, setTopics] = useState([])

    const navigate = useNavigate()

    const getTopics = async () => {
        try {
            const response = await axios.get(`/topics/`)
            if (response.data) {
                setTopics(response.data)
            }
        } catch (error) {
            console.error('GET_TOPICS_ERROR', error)
        }
    }

    useEffect(() => {
        getTopics()
        // eslint-disable-next-line
    }, [])

    const priority = { Principiante: 3, Intermedio: 2, Avanzado: 1 }
    const sortedTopics = topics.sort((a, b) => priority[b.level] - priority[a.level]);
    
    return (
        <Grid className="home_page" itemsX="center" padding="1.14em 0.42em">
            <Grid w100 gap="1.7em" padding="1.7em 1.85em" className="home_page__list">
                <Text bold size="5" align="center">¿Qué quieres estudiar?</Text>
                <Text bold color="first" onClick={() => { navigate(`/terms`) }} className="section_card all_terms">
                    Todos los terminos
                </Text>
                <Grid gap="0.7em">
                    {sortedTopics.map((topic, key) =>
                        <Grid onClick={() => { navigate(`/terms/${topic.id}`) }} key={key} className="section_card">
                            <Text bold>{topic.name}</Text>
                            <Text medium>{topic.level}</Text>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
