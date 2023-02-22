export const actions = {
    RESET_STATE: 'RESET_STATE',
    SET_STATE: 'UPDATE_STATE',
    SET_TERM: 'SET_TERM',
    SET_LOADING_TERM: 'SET_LOADING_TERM',
    SET_SELECTED_ANSWER: 'SET_SELECTED_ANSWER',
    SET_FETCH_TERM_ERROR: 'SET_FETCH_TERM_ERROR',
}

const termMock = {
    term: '',
    definitions: []
}

export const initialState = {
    term: termMock,
    selectedAnswer: null,
    answeredCorrect: null,
    loadingTerm: true,
    fetchTermError: false,
    retryFetchTerm: false,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.RESET_STATE:
            return initialState
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        case actions.SET_TERM:
            return { ...state, term: action.payload, selectedAnswer: null, loadingTerm: false, fetchTermError: false, retryFetchTerm: false }
        case actions.SET_LOADING_TERM:
            return { ...state, loadingTerm: action.payload }
        case actions.SET_SELECTED_ANSWER:
            return { ...state, selectedAnswer: action.payload.selectedAnswer, answeredCorrect: action.payload.answeredCorrect }
        case actions.SET_FETCH_TERM_ERROR:
            return { ...state, fetchTermError: true, loadingTerm: false, retryFetchTerm: action.payload }
        default:
            return initialState
    }
}