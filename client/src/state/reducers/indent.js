const reducer = (state = '', action) => {
    
    switch (action.type) {
        case 'SET_INDENT':
            return action.payload
        default:
            return state
    }
}

export default reducer