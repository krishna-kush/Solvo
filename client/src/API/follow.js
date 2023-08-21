import Axios from 'axios'

export const followApi = async (who, whom) => {
    let mdata = await Axios.post('http://localhost:5000/follow/follow', {who, whom})
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
export const unFollowApi = async (who, whom) => {
    let mdata = await Axios.post('http://localhost:5000/follow/unFollow', {who, whom})
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