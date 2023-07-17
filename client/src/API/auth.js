import Axios from './AxiosInstance.js'

export const whoMin = async (_id, source) => {
    let mdata = await Axios.post('/auth/who', {_id, source})
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'whoMin',    
        data: mdata,
    }
}

export const loginUser = async (data) => {
    let mdata = await Axios.post('/auth/login', data)
    .then((res) => {
        return {
            ...res.data,
            status: res.status,
        }
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'loginUser',    
        data: mdata,
    }
}
export const ifLoginUser = async () => {
    let mdata = await Axios.post('/auth/iflogin')
    .then((res) => {
        return {
            ...res.data,
            status: res.status,
        }
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'ifLogin',    
        data: mdata,
    }
}
export const createUser = async (data) => {
    let mdata = await Axios.post('/auth/create', data)
    .then((res) => {
        return res.data
    })
    return {
        source: 'createUser',    
        data: mdata,
    }
}

export const gAuth = async (data) => {
    //get the token from the local storage

    let mdata = await Axios.post('/auth/google', data)
    .then((res) => {
        // update token or send err
        return res.data
    })
    return {
        source: 'gAuth',    
        data: mdata,
    }

    
    // if not request for new token from the server...

}