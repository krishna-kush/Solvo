import { UPDATE_SEARCHED } from '../../../constants/actionTypes'

const reducer = (state = false, action) => {
    if (action.type === UPDATE_SEARCHED) {
        return action.payload
    } else {
        return state
    }
}

export default reducer