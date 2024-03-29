import { UPDATE_SEARCH_INPUT } from '../../../constants/actionTypes'


const reducer = (state = '', action) => {
    if (action.type === UPDATE_SEARCH_INPUT) {
        return action.payload
    } else {
        return state
    }
}

export default reducer