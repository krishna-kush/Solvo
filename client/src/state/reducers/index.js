import { combineReducers } from "redux";
import authInput from "./authInput";
import auth from "./auth";
import ids from "./ids";
import indent from "./indent";
import search from "./search";
import searchInput from "./searchInput";
import post from "./post";

const reducers = combineReducers({
    authI: authInput,
    auth: auth,

    ids,

    indent,
    search,
    searchInput,
    post,
})

export default reducers