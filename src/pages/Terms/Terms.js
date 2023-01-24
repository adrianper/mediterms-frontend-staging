import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid } from 'components'
import axios from 'axios'
import { actions, initialState, reducer } from './termsReducer'
import { useLoadingAppContext } from 'hooks'
import { routes } from 'routing/routes'
import { reset } from 'redux/reducers/auth/authSlice'

const definitionBtnStyle = {
    padding: '1em',
    border: '1px solid var(--text-color--first)',
    borderRadius: '1em',
    cursor: 'pointer',
    userSelect: 'none'
}

const resultBannerStyles = {
    padding: '1em',
    userSelect: 'none',
    alignSelf: 'end',
    color: 'white',
    left: '-1em',
    bottom: '-1em',
    width: 'calc(100% + 2em)',
}

const initErrorLbl = 'Error al cargar la información'

const Terms = () => {
    /*--------STATE--------*/
    const [errorLabel, setErrorLabel] = useState(initErrorLbl)
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
                            setErrorLabel(error.response.data.errors[0])
                            setTimeout(() => {
                                navigate(authenticated ? routes.home.path : routes.signup.path,
                                    { state: { from: location } })
                            }, 3000)
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
        <Grid className="terms" itemsX="center">
            <Grid className="terms__term_container" gap="1em" padding="1em" contentY="stretch"
                style={{ minHeight: '400px', minWidth: '350px', background: 'white', borderRadius: '1em', overflow: 'hidden' }}>

                {term && <h1 className="terms__term">{term.term}</h1>}

                <Grid gap="1em" itemsX="center">
                    {term && term.definitions.map((definition, i) =>
                        <Grid key={i}
                            className="terms__definition_btn"
                            onClick={() => { handleClickDefinitionBtn(i, definition.correct_answer, term.topicId) }}
                            style={{
                                ...definitionBtnStyle,
                                backgroundColor: (selectedAnswer === null ? '' :
                                    definition.correct_answer ? '#00ff0066' :
                                        i === selectedAnswer ? '#ff000066' : ''),
                                pointerEvents: selectedAnswer !== null ? 'none' : ''
                            }}
                        >
                            {definition.answer}
                        </Grid>
                    )}
                </Grid>

                {fetchTermError &&
                    <Grid className="terms__error_label" style={{ color: 'red' }}>
                        {errorLabel}
                        {retryFetchTerm && <Button onClick={() => requestNextTerm()}>Reintentar</Button>}
                    </Grid>
                }

                <Grid className="terms__result_banner"
                    style={{
                        ...resultBannerStyles,
                        visibility: selectedAnswer === null ? 'hidden' : '',
                        backgroundColor: answeredCorrect ? '#00ff00' : '#ff0000'
                    }}>
                    {answeredCorrect ? 'Correcto' : 'Incorrecto'}
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Terms
