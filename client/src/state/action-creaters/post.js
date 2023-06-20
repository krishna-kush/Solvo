import { createPost, getAllPost, upAnswerPost } from "../../API/post"

export const create = async (data) => {
    console.log('in action');
    let res = await createPost(data)
    
    console.log(res);
    
    // return (dispatch) => {
    //     dispatch({
    //         type: 'CREATE_POST',
    //         payload: ans
    //     })
    // }
}

export const upAnswer = async (ans, post_id, user_id, user_source) => {
    console.log('in action');
    let res = await upAnswerPost(ans, post_id, user_id, user_source)

    console.log(res);
}

export const getAll = async (data) => {
    let res = await getAllPost(data)

    return (dispatch) => {
        dispatch({
            type: 'SET_POST',
            payload: res
        })
    }    
}
