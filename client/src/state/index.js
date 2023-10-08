// export * as actionCreators from './action-creaters/index.js'

import { updateInput, resetInput, whoIdAdd, google, logIn, ifLogIn, signUp } from './action-creaters/auth.js'
import { showComments, upComment, select, increment, indent } from './action-creaters/comment.js'
import { create, deletePost, deleteComment, close, upAnswer, take, hide, getAll, getEnumerated, wsGetEnumerated, getBySearch } from './action-creaters/post.js'
import { updateInput as updateSearchInput, updateSearched, upSearchQuestions, upSearchTopics, upSearchChannels } from './action-creaters/search.js'
import { change } from './action-creaters/changer.js'
import { changeShow, changeOptions, changeSelected, updateSelectorId, updateSelectedId } from './action-creaters/select.js'
import { follow, unFollow } from './action-creaters/follow.js'
import * as profile from './action-creaters/profile.js'
import { changeHomeLayout } from './action-creaters/homeLayout.js'

const actionCreators = {
    auth: {
        updateInput: updateInput,
        resetInput,

        whoIdAdd,
        
        google,
        signUp,
        logIn,
        ifLogIn,
    },

    comment: {
        showComments,
        upComment,

        select,
        
        increment,
        indent,
    },

    post: {
        create,
        deletePost,
        deleteComment,
        close,
        upAnswer,
        take,
        hide,
        getAll,
        getEnumerated,
        wsGetEnumerated,
        getBySearch,
    },

    search: {
        updateSearchInput,
        updateSearched,
        upSearchQuestions,
        upSearchTopics,
        upSearchChannels,
    },

    changer: { change },

    select: { changeShow, changeOptions, changeSelected, updateSelectorId, updateSelectedId },
    
    follow: { follow, unFollow },

    profile,

    changeHomeLayout,
    
}

export { actionCreators };
