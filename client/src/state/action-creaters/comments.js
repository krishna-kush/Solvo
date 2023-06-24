import { ADD_CHILD_COMMENTS } from "../../constants/actionTypes"

import { upCommentBasic, getComment } from "../../API/comments"

export const upComment = async (comment, parent_comment_id, user_id, user_source) => {
    let res = await upCommentBasic(comment, parent_comment_id, user_id, user_source)

    console.log(res);
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
            payload: {_id, childComments, post_id}
        })
    }   
}