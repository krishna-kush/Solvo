import { upQuestion, upTopic, upChannel } from "../../API/search"

export const updateInput = (input) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_SEARCH_INPUT',
            payload: input
        })
    }
}
export const updateSearched = (input) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_SEARCHED',
            payload: input
        })
    }
}


export const upSearchQuestions = async (input, limit) => {
    let res = await upQuestion(input, limit)
    // console.log(res);

    return (dispatch) => {
        dispatch({
            type: 'ADD_SEARCH_QUESTION',
            source: 'upSearchQuestion',
            payload: {result: res.data.result},
        })
    }   
}

export const upSearchTopics = async (input, limit) => {
    let res = await upTopic(input, limit)
    // console.log(res);

    return (dispatch) => {
        dispatch({
            type: 'ADD_SEARCH_TOPIC',
            source: 'upSearchTopic',
            payload: {result: res.data.result},
        })
    }   
}

export const upSearchChannels = async (input, limit) => {
    let res = await upChannel(input, limit)
    // console.log(res);

    return (dispatch) => {
        dispatch({
            type: 'ADD_SEARCH_CHANNEL',
            source: 'upSearchChannel',
            payload: {result: res.data.result},
        })
    }   
}

