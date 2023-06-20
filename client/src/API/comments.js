import Axios from 'axios'

export const getAll = async () => {
    let mdata = await Axios.get('http://localhost:5000/posts/comments')
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err.response
    })

    return {
        source: 'getAll',    
        data: mdata,
    }
}