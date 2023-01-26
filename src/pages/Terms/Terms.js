import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid, Text } from 'components'
import axios from 'axios'
import { actions, initialState, reducer } from './termsReducer'
import { useLoadingAppContext } from 'hooks'
import { routes } from 'routing/routes'
import { reset } from 'redux/reducers/auth/authSlice'

import './terms.scss'

const initErrorLbl = 'Error al cargar la información'

const Terms = () => {
    /*--------STATE--------*/
    const [errorLabel, setErrorLabel] = useState(initErrorLbl)
    const [showFinalDemo, setShowFinalDemo] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    const { term, selectedAnswer, answeredCorrect, fetchTermError, retryFetchTerm } = state

    const { authenticated } = useSelector(store => store.auth)

    /*--------HOOKS--------*/
    const navigate = useNavigate()
    const location = useLocation()
    const reduxDispatch = useDispatch()
    const { startLoading, stopLoading } = useLoadingAppContext()
    const { topic } = useParams()

    /*--------REFS--------*/
    const answeredTermsRef = useRef(0)
    const answeredIdsRef = useRef([])

    /*--------FUNCTIONS--------*/
    const requestNextTerm = useCallback((answeredIds = []) => {
        startLoading()

        const requestUrl = authenticated ?
            `/terms?previousIds=${JSON.stringify(answeredIds)}${topic ? `&topicId=${topic}` : ''}`
            :
            `/terms/samples?previousIds=${JSON.stringify(answeredIds)}`

        axios.get(requestUrl)
            .then(response => {
                dispatch({ type: actions.SET_TERM, payload: response.data })
            })
            .finally(() => {
                setTimeout(() => {
                    stopLoading()
                }, 300)
            })
            .catch((error) => {
                if (error.response.data.code) {
                    switch (error.response.data.code) {
                        case "MDT_DB_OUT_BOUNDARIES":
                        setTimeout(() => {
                                navigate(authenticated ? routes.home.path : (setShowFinalDemo(true),routes.finalDemo.path) ,
                                    { state: { from: location } })
                            }, 1000)
                            break
                        case "FST_JWT_AUTHORIZATION_TOKEN_INVALID":
                        case "MDT_APP_TOKEN_NOT_VALID":
                            setErrorLabel('Por favor inicia sesion')
                            reduxDispatch(reset())
                            global.clearSession()
                            setTimeout(() => {
                                navigate(routes.login.path, { state: { from: location } })
                            }, 2000)
                            break
                        default:
                            break
                    }

                    dispatch({ type: actions.SET_FETCH_TERM_ERROR, payload: false })
                } else {
                    console.error(error)
                    setErrorLabel(`${initErrorLbl}\n${error.message}`)
                    dispatch({
                        type: actions.SET_FETCH_TERM_ERROR, payload: true
                    })
                }
            })
    }, [authenticated, location, navigate, reduxDispatch, startLoading, stopLoading, topic])

    const handleClickDefinitionBtn = useCallback((index, isCorrectAnswer, termTopic) => {
        answeredIdsRef.current[answeredTermsRef.current] = term.id
        answeredTermsRef.current = answeredTermsRef.current < 19 ? answeredTermsRef.current + 1 : 0

        if (authenticated && isCorrectAnswer) {
            const topicId = topic ? topic : termTopic
            axios.post(`/terms/correct/${topicId}`)
                .catch(error => {
                    console.error('|ERR_SAVE_CORRECT_ANSWER|', error)
                })
        }

        dispatch({ type: actions.SET_SELECTED_ANSWER, payload: { selectedAnswer: index, answeredCorrect: isCorrectAnswer } })

        setTimeout(() => {
            requestNextTerm(answeredIdsRef.current)
        }, 3000)

    }, [authenticated, requestNextTerm, term.id, topic])

    /*--------EFFECTS--------*/
    useEffect(() => {
        requestNextTerm()
        // eslint-disable-next-line
    }, [])

    /*--------RENDER--------*/
    return (
        <Grid className="terms" itemsX="center" padding="1.41em 0.62em">
            <Grid w100 className="terms__term_container" gap="1.71em" padding="1.71em 0.62em">

                {term && <Text bold align="center" size="5" className="terms__term">{term.term}</Text>}

                <Grid gap="0.71em" itemsX="center">
                    {term && term.definitions.map((definition, i) =>
                        <Grid w100 key={i}
                            className="terms__definition_btn"
                            padding="1.71em 0.85em"
                            onClick={() => { handleClickDefinitionBtn(i, definition.correct_answer, term.topicId) }}
                            style={{
                                backgroundColor: (selectedAnswer === null ? '' :
                                    definition.correct_answer ? '#D9FFCC' :
                                        i === selectedAnswer ? '#E6A4A4' : ''),
                                pointerEvents: selectedAnswer !== null ? 'none' : '',
                                border: (selectedAnswer === null ? '' :
                                    definition.correct_answer ? 'solid 2px #39E600' :
                                        i === selectedAnswer ? 'solid 2px #ff0000' : ''),
                            }}
                        >
                            <Text medium align="center">{definition.answer}</Text>
                        </Grid>
                    )}
                </Grid>

                {(fetchTermError && showFinalDemo ) &&
                    <Grid className="terms__error_label" style={{ color: 'red' }}>
                        {errorLabel}
                        {retryFetchTerm && <Button onClick={() => requestNextTerm()}>Reintentar</Button>}
                    </Grid>
                }

                <Grid className="terms__result_banner"
                    style={{
                        visibility: selectedAnswer === null ? 'hidden' : '',
                        backgroundColor: answeredCorrect ? '#00ff00' : '#ff0000'
                    }}>
                    <Text bold size="5" color="white" align="center">{answeredCorrect ? 'Correcto' : 'Incorrecto'}</Text>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Terms
