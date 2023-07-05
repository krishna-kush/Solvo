// export * as actionCreators from './action-creaters/index.js'

import { updateInput, resetInput, whoAdd, google, logIn, signUp } from './action-creaters/auth.js'
import { showComments, upComment, increment, indent } from './action-creaters/comment.js'
import { create, upAnswer, getAll, getBySearch } from './action-creaters/post.js'
import { updateInput as updateSearchInput, updateSearched, upSearchQuestions, upSearchTopics, upSearchChannels } from './action-creaters/search.js'

const actionCreators = {
    auth: {
        updateInput: updateInput,
        resetInput,

        whoAdd,
        
        google,
        signUp,
        logIn,
    },

    comment: {
        showComments,
        upComment,
        
        increment,
        indent,
    },

    post: {
        create,
        upAnswer,
        getAll,
        getBySearch,
    },

    search: {
        updateSearchInput,
        updateSearched,
        upSearchQuestions,
        upSearchTopics,
        upSearchChannels,
    }
}

export { actionCreators };
