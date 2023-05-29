import { createUser, checkToken } from '../../API/auth'
import { CREATE, CHECK, UPDATE } from '../../constants/actionTypes'


export const updateAuthInput = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE,
            payload: data
        })
    }
}

export const userCheck = async (data) => {

    const ans = await checkToken(data);
    console.log(ans)

    return (dispatch) => {
        dispatch({
            type: CHECK,
            payload: ans
        })
    }
}