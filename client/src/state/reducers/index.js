import { combineReducers } from "redux";
import authInput from "./auth/authInput";
import auth from "./auth/auth";
import changer from "./changer";
import ids from "./ids";
import indent from "./indent";
import searchInput from "./search/searchInput";
import searched from "./search/searched";
import search from "./search/search";
import post from "./post";
import select from "./select"
import profile from "./profile"
import homeLayout from "./homeLayout";
import topShow from "./topShow";

const reducers = combineReducers({
    authI: authInput,
    auth: auth,

    changer,

    ids,

    indent,
    search,
    searched,
    searchInput,
    post,

    select,

    profile,

    homeLayout,

    topShow,
})

export default reducers