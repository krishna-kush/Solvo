import Axios from 'axios'

export const createPost = async (data) => {
    let mdata = await Axios.post('http://localhost:5000/posts/create', data)
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'create',    
        data: mdata.data.result,
    }
}

export const upAnswerPost = async (ans, post_id, user_id, user_source) => {
    let mdata = await Axios.post('http://localhost:5000/posts/upAnswer', { ans, post_id, user_id, user_source})
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'upAnswer',    
        data: mdata.data.result,
    }
}

export const getAllPost = async () => {
    let mdata = await Axios.post('http://localhost:5000/posts/getAll')
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
export const getEnumeratedPost = async (skip, limit) => {
    let mdata = await Axios.post('http://localhost:5000/posts/getEnumerated', {skip, limit})
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
export const getWsEnumeratedPost = async (skip, limit) => {
    // let mdata = await Axios.post('http://localhost:5000/posts/getEnumerated', {skip, limit})
    // .then((res) => {
    //     return res
    // })
    // .catch((err) => {
    //     return err.response
    // })

    

    return {
        source: 'getAll',    
        data: mdata,
    }
}
export const getPostBySearch = async (search) => {
    let mdata = await Axios.post('http://localhost:5000/posts/getBySearch', {search})
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
