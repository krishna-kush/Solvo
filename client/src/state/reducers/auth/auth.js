import { LOG, LOGOUT } from '../../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case LOG:
            // console.log('LOG');
            let data = {
                data: { ...action.payload.data.result }, // how to spread everything but token
                token: action.payload.data?.token,
                
            }
            
            // console.log('Log', data);
            
            if (data.token!==undefined) {
                localStorage.setItem('session', data.token)
                return { ...state, authData: data.data, token: data.token }
            } else {
                // console.log('authData', data.data);
                return { ...state, authData: data.data }
            }

        case LOGOUT:
            localStorage.clear()

            return { ...state, authData: null }

        case 'ADD_FOLLOWING': {
            return { ...state, authData: { ...state.authData, following: { ...state.authData.following, ids: [...state.authData.following.ids, action.payload] } } };
        }
        case 'REMOVE_FOLLOWING': {
            return {
                ...state,
                authData: {
                  ...state.authData,
                  following: {
                    ...state.authData.following,
                    ids: state.authData.following.ids.filter(id => id !== action.payload) // to only have id in new list that is not action.payload which is also a id
                  }
                }
            }
        }

        case 'UPDATE_POSTS_COUNT': {
            return { ...state, authData: { ...state.authData, postsCount: state.authData.postsCount + action.payload } };
        }

        default:
            return state
    }
}

export default reducer