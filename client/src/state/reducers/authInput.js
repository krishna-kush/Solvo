// import { createUser } from '../../API/auth'
import { UPDATE_INPUT, RESET_INPUT } from '../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = {
    email: {value: '', focus: false},
    password: {value: '', focus: false},

    fname: {value: '', focus: false},
    lname: {value: '', focus: false},
  }, action) => {
    
    switch (action.type) {
        case UPDATE_INPUT:
            return { 
                ...state,
                [action.payload[0]]: {
                    ...state[action.payload[0]],
                    [action.payload[1]]: action.payload[2]
                }}
        case RESET_INPUT:
            return {
                email: {value: '', focus: false},
                password: {value: '', focus: false},
            
                fname: {value: '', focus: false},
                lname: {value: '', focus: false},
            }
        default:
            return state
    }
}

export default reducer