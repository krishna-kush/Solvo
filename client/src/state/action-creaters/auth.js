import { gAuth, checkToken } from '../../API/auth'
import { CREATE, CHECK, UPDATE } from '../../constants/actionTypes'


export const updateInput = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE,
            payload: data
        })
    }
}

export const google = async (data) => {

    const ans = await gAuth(data);

    return (dispatch) => {
        dispatch({
            type: CHECK,
            payload: ans
        })
    }
}