const reducer = (state = [], action) => {
    
    switch (action.type) {
        case 'TOP_SHOW_ADD_IDS':
            return [...state, ...action.payload._ids]
        case 'TOP_SHOW_CLEAR':
            return []
        default:
            return state
    }
}

export default reducer