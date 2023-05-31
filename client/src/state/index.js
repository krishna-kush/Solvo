// export * as actionCreators from './action-creaters/index.js'

import { updateInput, google } from './action-creaters/auth.js'

const actionCreators = {
    auth: {
        updateInput: updateInput,
        google: google,
    },
}

export { actionCreators };
