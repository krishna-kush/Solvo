const reducer = (state = {
    post: true,
    topShow: true,
}, action) => {
    
    switch (action.type) {
        case 'SET_HOME_LAYOUT':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default reducer