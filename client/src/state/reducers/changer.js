// import {  } from '../../constants/actionTypes'

const reducer = (state = [
    ["Explore", true],
    ["Feed", false],
    ["My Activity", false]
  ], action) => {
    
    switch (action.type) {
        case 'CHANGE_CONTENT': {
            let currentState = [...state];

            for (let i=0; i<currentState.length; i++) {
                if (currentState[i][0] === action.payload) {
                    currentState[i][1] = true
                } else {
                    currentState[i][1] = false
                }
            }
            
            return currentState;
        }
        default:
            return state
    }
}

export default reducer