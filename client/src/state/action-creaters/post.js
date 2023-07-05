import { SET_POST, ADD_POST, ADD_ANSWER } from "../../constants/actionTypes"

import { createPost, getAllPost, getPostBySearch, upAnswerPost } from "../../API/post"

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

export const getAll = async () => {
    let res = await getAllPost()

    return (dispatch) => {
        dispatch({
            type: SET_POST,
            payload: res
        })
    }    
}
export const getBySearch = async (search) => {
    let res = await getPostBySearch(search)

    return (dispatch) => {
        dispatch({
            type: SET_POST,
            payload: res
        })
    }    
}
