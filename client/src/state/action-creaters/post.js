import { createPost, getAllPost, upAnswerPost } from "../../API/post"

import { SET_POST, ADD_POST, ADD_ANSWER } from "../../constants/actionTypes"

export const create = async (data) => {
    let res = await createPost(data)
        
    return (dispatch) => {
        dispatch({
            type: ADD_POST,
            payload: res
        })
    }
}

export const upAnswer = async (ans, post_id, user_id, user_source, post_no) => {
    let res = await upAnswerPost(ans, post_id, user_id, user_source)
    return (dispatch) => {
        dispatch({
            type: ADD_ANSWER,
            payload: {data: res.data, post_no}
        })
    }  
}

export const getAll = async (data) => {
    let res = await getAllPost(data)

    return (dispatch) => {
        dispatch({
            type: SET_POST,
            payload: res
        })
    }    
}
