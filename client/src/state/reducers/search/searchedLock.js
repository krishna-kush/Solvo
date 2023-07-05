import { LOCK_SEARCHED, UNLOCK_SEARCHED } from '../../../constants/actionTypes'

const reducer = (state = false, action) => {
    if (action.type === LOCK_SEARCHED) {
        return true
    } else if (action.type === UNLOCK_SEARCHED) {
        return false
    } else {
        return state
    }
}

export default reducer