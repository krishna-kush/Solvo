import { ADD_CHILD_COMMENTS } from "../../constants/actionTypes"

import { upCommentBasic, getComment, selectComment, incrementComment } from "../../API/comments"

export const upComment = async (comment, parent_comment_id, user_id, post_id) => {
    let res = await upCommentBasic(comment, parent_comment_id, user_id)

    return (dispatch) => {
        dispatch({
            type: ADD_CHILD_COMMENTS,
            source: 'upComment',
            payload: {_id: parent_comment_id, comment: res.data.data.result, post_id},
        })
    }   
}

export const showComments = async (_id, child_ids, post_id) => {
    let childComments = []

    for (let id of child_ids) {
        let res = await getComment(id)
        childComments.push(res.data.data.result[0])
    }

    return (dispatch) => {
        dispatch({
            type: ADD_CHILD_COMMENTS,
            source: 'showComments',
            payload: {_id, childComments, post_id}
        })
    }   
}

export const select = async (_id) => {
    selectComment(_id)

    // return (dispatch) => {
        
    // }   
}

export const increment = async (what, comment_id, user_id, post_id) => {
    let res = await incrementComment(what, comment_id, user_id)

    if (res.data.status === 200) {
        return (dispatch) => {
            dispatch({
                type: 'INCREMENT',
                source: 'increment',
                payload: {comment_id, post_id, what, inc: res.data.data.found? -1 : 1}
            })
        }
    }
}

export const indent = (value) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_INDENT',
            source: 'indent',
            payload: value
        })
    }
}
