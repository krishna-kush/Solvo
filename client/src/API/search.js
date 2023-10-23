import Axios from 'axios'

const url = process.env.REACT_APP_URL || 'http://localhost:5001';

export const upQuestion = async (input, limit) => {
    let mdata = await Axios.post('/search/question', {input, limit}, {
        baseURL: url,
    })
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'upQuestion',    
        data: mdata,
    }
}
export const upTopic = async (input, limit) => {
    let mdata = await Axios.post('/search/topic', {input, limit}, {
        baseURL: url,
    })
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'upTopic',    
        data: mdata,
    }
}
export const upChannel = async (input, limit) => {
    let mdata = await Axios.post('/search/channel', {input, limit}, {
        baseURL: url,
    })
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'upChannel',    
        data: mdata,
    }
}