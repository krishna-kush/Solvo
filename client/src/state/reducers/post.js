// import { createUser } from '../../API/auth'
import { SET_POST, ADD_CHILD_COMMENTS } from '../../constants/actionTypes'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = [], action) => {
    
    switch (action.type) {
        case SET_POST:
            let data = action.payload.data.data.result
            console.log(data);

            data[data.length-1].last = true

            return data

        case ADD_CHILD_COMMENTS:
            let search = (list, key, value, new_value) => {
                return list.map((item) => {
                    if (item[key] === value) {
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