export const changeShow = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_SELECT_SHOW',
            payload: to
        })
    }
}
export const changeOptions = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_SELECT_OPTIONS',
            payload: to
        })
    }
}
export const changeSelected = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_SELECTED',
            payload: to
        })
    }
}
export const updateSelectorId = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_SELECTOR_ID',
            payload: to
        })
    }
}
export const updateSelectedId = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_SELECTED_ID',
            payload: to
        })
    }
}