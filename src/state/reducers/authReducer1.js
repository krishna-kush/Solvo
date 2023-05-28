// import { CREATE, DELETE, CHECK, LOGOUT } from '../../constants/actionTypes'

// // in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
// const reducer = (state = {  }, action) => {
//     switch (action.type) {
//         case CREATE:
//             createUser(action.payload)

//             // adding token in localStorage
//             localStorage.setItem('profile', JSON.stringify({ ...action.payload }))

//             return { ...state, authData: action.payload }
//         case DELETE:
//             // delete token from localStorage
            
//             return { authData: null }
//         case CHECK:
//             localStorage.setItem('profile', JSON.stringify({ ...action.payload }))

//             return { ...state, authData: action.payload }
//         case LOGOUT:
//             localStorage.clear()

//             return { ...state, authData: null }
//         default:
//             return state
//     }
// }

// export default reducer