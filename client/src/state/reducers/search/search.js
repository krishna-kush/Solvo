import { ADD_SEARCH_QUESTION, ADD_SEARCH_TOPIC, ADD_SEARCH_CHANNEL } from '../../../constants/actionTypes'

const reducer = (state = {
    questions: [],
    topics: [],
    channels: [],
}, action) => {
    
    switch (action.type) {
        case ADD_SEARCH_QUESTION:
            return {
                ...state,
                questions: action.payload.result
            }
        case ADD_SEARCH_TOPIC:
            return {
                ...state,
                topics: action.payload.result
            }
        case ADD_SEARCH_CHANNEL:
            return {
                ...state,
                channels: action.payload.result
            }
        default:
            return state
    }
}

export default reducer