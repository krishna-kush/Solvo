import Axios from 'axios'

export const upQuestion = async (input, limit) => {
    let mdata = await Axios.post('http://localhost:5000/search/question', {input, limit})
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
    let mdata = await Axios.post('http://localhost:5000/search/topic', {input, limit})
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
    let mdata = await Axios.post('http://localhost:5000/search/channel', {input, limit})
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'upChannel',    
        data: mdata,
    }
}