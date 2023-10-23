import Axios from 'axios'

const url = process.env.REACT_APP_URL || 'http://localhost:5001';

export const top = async (what, limit) => {
    const mdata = await Axios.post('/top', {what, limit}, {
        baseURL: url,
    })
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'top',    
        data: mdata,
    }
}