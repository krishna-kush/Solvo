// import { createUser } from '../../API/auth'
import { UPDATE, CLEAR, RESET } from '../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = [], action) => {
    
    switch (action.type) {
        case 'SET_POST':
            let data = action.payload.data.data.result
            console.log(data);

            data[data.length-1].last = true

            return data
        default:
            return state
    }
}

export default reducer