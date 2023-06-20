import Axios from 'axios'

export const createPost = async (data) => {
    let mdata = await Axios.post('http://localhost:5000/posts/create', data)
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    console.log(mdata);

    return {
        source: 'create',    
        data: mdata,
    }
}

export const upAnswerPost = async (ans, post_id, user_id, user_source) => {
    let mdata = await Axios.post('http://localhost:5000/posts/upAnswer', {
        ans: ans,
        post_id: post_id,
        user_id: user_id,
        user_source: user_source,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'upAnswer',    
        data: mdata,
    }
}

export const getAllPost = async (data) => {
    let mdata = await Axios.post('http://localhost:5000/posts/getAll', {source: data})
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'getAll',    
        data: mdata,
    }
}
