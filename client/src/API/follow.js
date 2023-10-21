import Axios from 'axios'

const url = process.env.REACT_APP_URL || 'http://localhost:5000';

export const followApi = async (whoId, followingID, whomId, whomSource) => {
    let mdata = await Axios.post('/follow/follow', {whoId, followingID, whomId, whomSource}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'follow',    
        status: mdata.status,
    }
}
export const unFollowApi = async (whoId, followingID, whomId, whomSource) => {
    let mdata = await Axios.post('/follow/unFollow', {whoId, followingID, whomId, whomSource}, {
        baseURL: url,
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'follow',    
        status: mdata.status,
    }
}