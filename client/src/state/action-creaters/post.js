import { SET_POST, ADD_POST, APPEND_POST, FILL_POST, ADD_ANSWER } from "../../constants/actionTypes"

import { createPost, getAllPost, getEnumeratedPost, getWsEnumeratedPost, getPostBySearch, upAnswerPost } from "../../API/post"

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
export const getEnumerated = async (skip, limit, if_last) => {
    let res = await getEnumeratedPost(skip, limit)
    // console.log(res);
    let data = res.data.data.result[0]
    data.last = if_last

    return (dispatch) => {
        dispatch({
            type: APPEND_POST,
            payload: data
        })
    }    
}
export const wsGetEnumerated = async (data) => {
    // let res = await getWsEnumeratedPost(skip, limit)
    // console.log(res);
    let datatosend = data.data.result[0]
    datatosend.last = data.data.if_last
    const sn = data.data.sn

    return (dispatch) => {
        dispatch({
            type: FILL_POST,
            payload: datatosend,
            index: sn,
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
