import Axios from 'axios'

export const checkUser = async (data) => {
    let mdata = await Axios.post('http://localhost:5000/auth/check', data)
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
        source: 'checkUser',    
        data: mdata,
    }
}
export const createUser = async (data) => {
    let mdata = await Axios.post('http://localhost:5000/auth/create', data)
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
    
    let mdata = await Axios.post('http://localhost:5000/auth/google', data)
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