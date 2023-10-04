import Axios from './AxiosInstance.js'

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
    return await basic('/posts/comment', {_id}, 'getComment')
}

export const upCommentBasic = async (comment_text, parent_comment_id, user_id) => {
    return await basic('/posts/upComment', {comment_text, parent_comment_id, user_id}, 'upComment')
}

export const incrementComment = async (what, comment_id, user_id) => {
    return await basic('/posts/increment', {what, comment_id, user_id}, 'increment')
}
 