import { LOG, LOGOUT } from '../../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case LOG:
            // if (action.payload.status==404) {
                
            //     return { ...state, authData: null }
            // }
            // if (action.payload.source=='gAuth') {
            //     let data = {
            //         data: { ...action.payload.data }, // how to spread everything but token
            //         token: action.payload.data.token,
                    
            //     }
            //     // console.log('check', data, action.payload);
            //     localStorage.setItem('session', data.token)
            //     return { ...state, authData: data.data, token: data.token }
            // } else if (action.payload.source=='loginUser' || action.payload.source=='ifLogin') {
                console.log('LOG');
                let data = {
                    data: { ...action.payload.data.result }, // how to spread everything but token
                    token: action.payload.data?.token,
                    
                }
                
                console.log('Log', data);
                
                if (data.token!==undefined) {
                    localStorage.setItem('session', data.token)
                    return { ...state, authData: data.data, token: data.token }
                } else {
                    console.log('authData', data.data);
                    return { ...state, authData: data.data }
                }

            // }
        case LOGOUT:
            localStorage.clear()

            return { ...state, authData: null }
        default:
            return state
    }
}

export default reducer