import Axios from 'axios'

export const createUser = (data) => {
    Axios.post('http://localhost:5000/user/create', data)
    .then((res) => {
        // update token or send err\
        console.log(res);
        console.log('axios done');
    })
}

export const checkToken = (data) => {
    //get the token from the local storage
    
    let mdata = Axios.post('http://localhost:5000/user/check', data)
    .then((res) => {
        // update token or send err
        return res.data
    })
    return mdata

    
    // if not request for new token from the server...

}