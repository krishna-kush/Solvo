import { LOG, UPDATE_AUTH_INPUT, RESET_AUTH_INPUT, ADD_ID } from '../../constants/actionTypes'

import { whoMin, gAuth, createUser, checkUser } from '../../API/auth'

export const updateInput = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_AUTH_INPUT,
            payload: data
        })
    }
}

export const resetInput = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_AUTH_INPUT,
        })
    }
}

export const whoAdd = async (_id, source) => {
    const ans = await whoMin(_id, source);

    return (dispatch) => {
        dispatch({
            type: ADD_ID,
            payload: ans.data
        })
    }
}

export const logIn = async (data) => {
    const ans = await checkUser(data);

    if (ans.data.status != 200) { // for status 200 as it's not error, format should be ans.status
        return {
            status: ans.data.status,
            message: ans.data.data.message,
        }
    }

    return (dispatch) => {
        dispatch({
            type: LOG,
            payload: ans
        })
    }
}
export const signUp = async (data) => {
    const ans = await createUser(data);

    return (dispatch) => {
        dispatch({
            type: LOG,
            payload: ans
        })
    }
}

export const google = async (data) => {
    const ans = await gAuth(data);
    console.log(ans);

    return (dispatch) => {
        dispatch({
            type: LOG,
            payload: ans
        })
    }
}