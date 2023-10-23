const reducer = (state = {
    questions: [],
    answers: [],
}, action) => {
    
    switch (action.type) {
        case 'TOP_SHOW_ADD_IDS':
            return {
                ...state,
                [action.what] : [...action.payload._ids]
            }
        case 'TOP_SHOW_CLEAR':
            return {
                ...state,
                [action.what] : []
            }
        default:
            return state
    }
}

export default reducer