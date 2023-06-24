import Axios from 'axios'

export const getComment = async (_id) => {
    let mdata = await Axios.post('http://localhost:5000/posts/comment', {_id})
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'getComment',    
        data: mdata,
    }
}

export const upCommentBasic = async (comment_text, parent_comment_id, user_id, user_source) => {
    let mdata = await Axios.post('http://localhost:5000/posts/upComment', {comment_text, parent_comment_id, user_id, user_source})
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'upComment',    
        data: mdata,
    }
}