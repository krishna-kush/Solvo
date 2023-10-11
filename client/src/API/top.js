import Axios from 'axios'

export const top = async (what, limit) => {
    const mdata = await Axios.post('http://localhost:5000/top', {what, limit})
    .then((res) => {
        // console.log(res);
        return res.data
    })
    return {
        source: 'top',    
        data: mdata,
    }
}