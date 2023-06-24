// import { createUser } from '../../API/auth'
import { SET_POST, ADD_POST, ADD_ANSWER, ADD_CHILD_COMMENTS } from '../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = [], action) => {
    
    switch (action.type) {
        case SET_POST:
            let data = action.payload.data.data.result
            console.log(data);

            data[data.length-1].last = true

            return data

        case ADD_POST:
            let updatedStatePost = [action.payload.data, ...state]

            return updatedStatePost

        case ADD_ANSWER:
            let updatedStateAnswer = state.map((post, index) => {
                if (index === action.payload.post_no) {
                    return {
                        ...post,
                        answers: [...post.answers, action.payload.data]
                    }
                } else {
                    return post
                }
            })

            return updatedStateAnswer

        case ADD_CHILD_COMMENTS:
            let search = (list, key, value, new_value) => {
                return list.map((item) => {
                    if (item[key] === value) {
                        if (action.source === 'upComment') {
                            let new_childComments = [...item.childComments, new_value]
                            return { ...item, childComments: new_childComments };
                        }
                        return { ...item, childComments: new_value };
                    } else if (item.childComments && Array.isArray(item.childComments) && item.childComments.length) {
                        return { ...item, childComments: search(item.childComments, key, value, new_value) };
                    } else {
                        return item;
                    }
                });
            };
        
            let updatedState = state.map((post, index) => {
                if (index === action.payload.post_id) {
                    if (action.source === 'upComment') {
                        return {
                            ...post,
                            answers: search(post.answers, '_id', action.payload._id, action.payload.comment),
                        };
                    }
                    return {
                      ...post,
                      answers: search(post.answers, '_id', action.payload._id, action.payload.childComments),
                    };
                } else {
                    return post;
                }
            });
            return updatedState;

        default:
            return state
    }
}

export default reducer