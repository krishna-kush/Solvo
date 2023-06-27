import { combineReducers } from "redux";
import authInput from "./authInput";
import auth from "./auth";
import ids from "./ids";
import indent from "./indent";
import post from "./post";

const reducers = combineReducers({
    authI: authInput,
    auth: auth,

    ids,

    indent,
    post: post,
})

export default reducers