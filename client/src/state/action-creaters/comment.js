import { ADD_CHILD_COMMENTS } from "../../constants/actionTypes"

import { upCommentBasic, getComment } from "../../API/comments"

export const upComment = async (comment, parent_comment_id, user_id, user_source, post_id) => {
    let res = await upCommentBasic(comment, parent_comment_id, user_id, user_source)

    console.log(res);

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