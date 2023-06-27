import Axios from 'axios'

let basic = async (url, parameters={}, source) => {
    let mdata = await Axios.post(url, parameters)
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: source,    
        data: mdata,
    }
}

export const getComment = async (_id) => {
    return await basic('http://localhost:5000/posts/comment', {_id}, 'getComment')
}

export const upCommentBasic = async (comment_text, parent_comment_id, user_id, user_source) => {
    return await basic('http://localhost:5000/posts/upComment', {comment_text, parent_comment_id, user_id, user_source}, 'upComment')
}

export const incrementComment = async (what, comment_id, user_id, user_source) => {
    return await basic('http://localhost:5000/posts/increment', {what, comment_id, user_id, user_source}, 'increment')
}
 