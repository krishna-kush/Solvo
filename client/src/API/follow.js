import Axios from 'axios'

export const followApi = async (whoId, followingID, whomId, whomSource) => {
    let mdata = await Axios.post('http://localhost:5000/follow/follow', {whoId, followingID, whomId, whomSource})
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
    let mdata = await Axios.post('http://localhost:5000/follow/unFollow', {whoId, followingID, whomId, whomSource})
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