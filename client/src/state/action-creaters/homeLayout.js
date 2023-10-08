export const changeHomeLayout = (to) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_HOME_LAYOUT',
            payload: to // {}
        })
    }
}