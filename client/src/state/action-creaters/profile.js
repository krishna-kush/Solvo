export const changeSelected = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_SELECTED',
            payload: to
        })
    }
}