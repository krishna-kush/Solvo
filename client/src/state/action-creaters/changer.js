export const change = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_CONTENT',
            payload: to
        })
    }
}