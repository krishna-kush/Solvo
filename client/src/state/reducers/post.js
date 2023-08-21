// import { createUser } from '../../API/auth'
import { SET_POST, ADD_POST, APPEND_POST, FILL_POST, ADD_ANSWER, ADD_CHILD_COMMENTS } from '../../constants/actionTypes'

import { binarySearchIndex } from '../../Utils/algo'

// in authReducer state I can return action.payload which is already is object or I can derefference everything which enables me to overload the data in future use...
const reducer = (state = [], action) => {
    
    switch (action.type) {
        case SET_POST:
            let data = action.payload

            if (data?.length) {
                data[data.length-1].last = true
            } else { return [] } // if data is empty or undefined to not cuz err

            console.log(data);

            return data

        case ADD_POST: { // This extra curly braces creats a new block, so we can name updatedState or some other variable again and again and limit it's scope, which was earlier without it not possible. Scope creation do happen in if blocks, maybe case representation of if does not do that...
            const updatedState = [action.payload.data, ...state]

            return updatedState
        }
        case APPEND_POST: {

            const updatedState = [...state, action.payload]

            return updatedState
        }
        case FILL_POST: {
            
            const currentState = [...state];
            
            const { index, payload } = action;

            // to find the right index to put post, because we are doing all insertion async, doing splice right away will miss sort the array, so we need to find the right index to put the post
            const insertIndex = binarySearchIndex(currentState, index);
            
            currentState.splice(insertIndex, 0, {...payload, index});

            return currentState; 
        }
        case 'DELETE_POST': {
            
            // const currentState = [...state];
            // currentState.splice(index, 1)
            
            const { index } = action;

            return state.slice(0, index).concat(state.slice(index + 1)); // slice return new arr, so no problem to redux policies
        }

        case ADD_ANSWER: {
            let updatedState = state.map((post, index) => {
                if (index === action.payload.post_no) {
                    return {
                        ...post,
                        answers: [...post.answers, action.payload.data]
                    }
                } else {
                    return post
                }
            })

            return updatedState
        }

        case ADD_CHILD_COMMENTS: {
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
        }

        case 'INCREMENT': {
            let search = (list, key, value, what, inc) => {
                return list.map((item) => {
                    if (item[key] === value) {
                        return { ...item, [what]: { ...item[what], count: item[what].count + inc } };
                    } else if (
                        item.childComments &&
                        Array.isArray(item.childComments) &&
                        item.childComments.length
                        ) {
                        return {
                        ...item,
                        childComments: search(item.childComments, key, value, what, inc),
                        };
                    } else {
                        return item;
                    }
                });
            };
            // console.log(state);
            
            let updatedState = state.map((post, index) => {
                if (index === action.payload.post_id) {
                return {
                    ...post,
                    answers: search(post.answers, '_id', action.payload.comment_id, action.payload.what, action.payload.inc),
                };
                } else {
                return post;
                }
            });
            // console.log(updatedState);

            return updatedState;
        }

        default:
            return state
    }
}

export default reducer