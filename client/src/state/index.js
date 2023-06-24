// export * as actionCreators from './action-creaters/index.js'

import { updateInput, resetInput, whoAdd, google, logIn, signUp } from './action-creaters/auth.js'
import { showComments, upComment } from './action-creaters/comment.js'
import { create, upAnswer, getAll } from './action-creaters/post.js'

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
    },

    post: {
        create,
        upAnswer,
        getAll,
    },
}

export { actionCreators };
