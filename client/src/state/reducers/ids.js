import { ADD_ID } from '../../constants/actionTypes'

const reducer = (state = {}, action) => {
    
    switch (action.type) {
        case ADD_ID:
            return {
                ...state,
                [action.payload._id]: action.payload.result
            }
        default:
            return state
    }
}

export default reducer