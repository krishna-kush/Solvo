import { combineReducers } from "redux";
import authInputReducer from "./authInputReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
    authI: authInputReducer,
    auth: authReducer,
})

export default reducers