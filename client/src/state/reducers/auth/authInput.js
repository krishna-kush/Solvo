// import { createUser } from '../../API/auth'
import { UPDATE_AUTH_INPUT, RESET_AUTH_INPUT } from '../../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = {
    photo: {value: '', focus: false, err: false},

    email: {value: '', focus: false, err: false},
    password: {value: '', focus: false, err: false},
    confirm_password: {value: '', focus: false, err: false},

    fname: {value: '', focus: false, err: false},
    lname: {value: '', focus: false, err: false},
  }, action) => {
    
    switch (action.type) {
        case UPDATE_AUTH_INPUT:
            return { 
                ...state,
                [action.payload[0]]: {
                    ...state[action.payload[0]],
                    [action.payload[1]]: action.payload[2]
                }}
        case RESET_AUTH_INPUT:
            return {
                photo: {value: '', focus: false, err: false},

                email: {value: '', focus: false, err: false},
                password: {value: '', focus: false, err: false},
                confirm_password: {value: '', focus: false, err: false},

                fname: {value: '', focus: false, err: false},
                lname: {value: '', focus: false, err: false},
            }
        default:
            return state
    }
}

export default reducer