import { top } from "../../API/top"

export const add = async (what, limit) => {

    const res = await top(what, limit)

    // console.log(res.data.result);

    return (dispatch) => {
        dispatch({
            type: 'TOP_SHOW_ADD_IDS',
            what: what,
            payload: {_ids: res.data.result}
        })
    }
}

export const clear = (what) => {

    return (dispatch) => {
        dispatch({
            type: 'TOP_SHOW_CLEAR',
            what: what,
        })
    }
}

