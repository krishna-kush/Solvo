import { SET_POST, ADD_POST, APPEND_POST, FILL_POST, ADD_ANSWER, DELETE } from "../../constants/actionTypes"

import { createPost, deleteAny, closePost, takePost, hidePost, getAllPost, getEnumeratedPost, getWsEnumeratedPost, getPostBySearch, upAnswerPost } from "../../API/post"

export const create = async (data) => {
    let res = await createPost(data)
        
    return (dispatch) => {
        dispatch({
            type: ADD_POST,
            payload: res
        })
        dispatch({
            type: 'UPDATE_POSTS_COUNT',
            payload: 1
        })
    }
}
export const deletePost = async (index, _id) => { // delete cann't be used as it's a keyword

    const res = await deleteAny('post', _id)

    if (res.status === 200) {
        return { ...res, dispatch: (dispatch) => {
            dispatch({
                type: 'DELETE_POST',
                index: index
            })
            dispatch({
                type: 'UPDATE_POSTS_COUNT',
                payload: -1
            })
        }}
    } else {
        return res
    }
}
export const deleteComment = (post_index, _id, parentId) => {

    deleteAny('comment', _id, parentId)

    return (dispatch) => {
        dispatch({
            type: 'DELETE_COMMENT',
            payload: {post_id: post_index, _id: _id},
            source: 'deleteComment'
        })
    }
}

export const close = (id, _id) => {
    closePost(_id)

    return (dispatch) => {
        dispatch({
            type: 'CLOSE_POST',
            index: id,
        })
    }
}

export const take = async (_id, takerId, direction) => {
    return await takePost(_id, takerId, direction)
}
export const hide = (option, selectorId, selectedId) => {
    hidePost(option, selectorId, selectedId)
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
            payload: res.data.data.result
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
    if (data.data.result.length) {
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

    return (dispatch) => {}
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
