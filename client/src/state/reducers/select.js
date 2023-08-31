const reducer = (state = {
    show: false,
    options: [],
    selected: null,
    selectorId: null,
    selectedId: null,
}, action) => {
    
    switch (action.type) {
        case 'CHANGE_SELECT_SHOW':
            return {...state, show: action.payload}
        case 'CHANGE_SELECT_OPTIONS':
            return {...state, options: action.payload}
        case 'CHANGE_SELECTED':
            return {...state, selected: action.payload}
        case 'UPDATE_SELECTOR_ID':
            return {...state, selectorId: action.payload}
        case 'UPDATE_SELECTED_ID':
            return {...state, selectedId: action.payload}
        default:
            return state
    }
}

export default reducer