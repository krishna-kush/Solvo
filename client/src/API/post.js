import Axios from 'axios'

const url = process.env.REACT_APP_URL || 'http://localhost:5001';

export const createPost = async (data) => {
    let mdata = await Axios.post('/posts/create', data, {
        baseURL: url,
    })
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
export const deleteAny = async (what, _id, parentId) => {
    const mdata = await Axios.post('/posts/delete', {what, _id, parentId}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        status: mdata.status,
        message: mdata.data.message,
    }
}

export const closePost = async (_id) => {
    let mdata = await Axios.post('/posts/close', {_id}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        status: mdata.data.result,
    }
}

export const upAnswerPost = async (ans, post_id, user_id, user_source) => {
    let mdata = await Axios.post('/posts/upAnswer', { ans, post_id, user_id, user_source}, {
        baseURL: url,
    })
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

export const takePost = async (_id, takerId, direction) => {
    let mdata = await Axios.post('/posts/take', {_id, takerId, direction}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'take',    
        status: mdata.status,
    }
}

export const hidePost = async (option, selectorId, selectedId) => {
    let mdata = await Axios.post('/posts/hide', { option, selectorId, selectedId}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'hide',    
        data: mdata.data.result,
    }
}

export const getAllPost = async () => {
    let mdata = await Axios.post('/posts/getAll', null, {
        baseURL: url,
    })
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
    let mdata = await Axios.post('/posts/getEnumerated', {skip, limit}, {
        baseURL: url,
    })
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
    // let mdata = await Axios.post('/posts/getEnumerated', {skip, limit}, {
    //     baseURL: url,
    // })
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
    let mdata = await Axios.post('/posts/getBySearch', {search}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'getAll',    
        data: mdata.data.result,
    }
}
