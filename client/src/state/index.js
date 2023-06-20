// export * as actionCreators from './action-creaters/index.js'

import { updateInput, resetInput, whoAdd, google, logIn, signUp } from './action-creaters/auth.js'
import { comment } from './action-creaters/comments.js'
import { create, upAnswer, getAll } from './action-creaters/post.js'

const actionCreators = {
    auth: {
        updateInput: updateInput,
        resetInput: resetInput,

        whoAdd,
        
        google: google,
        signUp: signUp,
        logIn: logIn,
    },

    comment: {
        getComment: comment,
    },

    post: {
        create: create,
        upAnswer: upAnswer,
        getAll,
    },
}

export { actionCreators };
