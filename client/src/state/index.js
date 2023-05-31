// export * as actionCreators from './action-creaters/index.js'

import { updateInput, resetInput, google, logIn, signUp } from './action-creaters/auth.js'

const actionCreators = {
    auth: {
        updateInput: updateInput,
        resetInput: resetInput,
        
        google: google,
        signUp: signUp,
        logIn: logIn,
    },
}

export { actionCreators };
