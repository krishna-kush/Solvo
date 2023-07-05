import { combineReducers } from "redux";
import authInput from "./auth/authInput";
import auth from "./auth/auth";
import ids from "./ids";
import indent from "./indent";
import searchInput from "./search/searchInput";
import searched from "./search/searched";
import searchedLock from "./search/searchedLock";
import search from "./search/search";
import post from "./post";

const reducers = combineReducers({
    authI: authInput,
    auth: auth,

    ids,

    indent,
    search,
    searched,
    searchedLock,
    searchInput,
    post,
})

export default reducers