const reducer = (state = {
    selected: 'following'
}, action) => {
    
    switch (action.type) {
        case 'SET_SELECTED':
            return {...state, selected: action.payload}
        default:
            return state
    }
}

export default reducer