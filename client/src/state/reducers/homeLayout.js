const reducer = (state = (localStorage.getItem('homeLayout') ? JSON.parse(localStorage.getItem('homeLayout')) : {
    post: true,
    topShow: true
}), action) => {
    
    switch (action.type) {
        case 'SET_HOME_LAYOUT':
            const curr_layout = {...state, ...action.payload}

            localStorage.setItem('homeLayout', JSON.stringify(curr_layout))

            return curr_layout
        default:
            return state
    }
}

export default reducer