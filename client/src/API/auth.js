import Axios from './AxiosInstance.js'
import axios from 'axios'

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
    let mdata = await axios.post('/auth/iflogin', null, {
        baseURL: 'http://localhost:5000',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('session')}`,
        }
    }) // not Axios Instance because that'll run only one time when the app is loaded, and store the token init, but when we click on logout our local storage delete the token, but the Axios Instance still has the token, so for checking if the user is logged in or not in auth we need to access the updated localStorage, but this create a vulnurity in app, because the Axios Instance still has the token, somehow try to delete it from there too...
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