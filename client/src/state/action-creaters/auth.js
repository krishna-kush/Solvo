import { gAuth, createUser, checkUser } from '../../API/auth'
import { CHECK, UPDATE, RESET } from '../../constants/actionTypes'


export const updateInput = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE,
            payload: data
        })
    }
}
export const resetInput = () => {
    return (dispatch) => {
        dispatch({
            type: RESET,
        })
    }
}

export const logIn = async (data) => {
    const ans = await checkUser(data);

    return (dispatch) => {
        dispatch({
            type: CHECK,
            payload: ans
        })
    }
}
export const signUp = async (data) => {
    const ans = await createUser(data);

    return (dispatch) => {
        dispatch({
            type: CHECK,
            payload: ans
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