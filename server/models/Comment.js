import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
        type: String,
        // required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },

    selected: {
        type: Boolean,
        default: false,
    },
    
    like: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        count: {
            type: Number,
            default: 0,
        },
    },
    dislike: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        count: {
            type: Number,
            default: 0,
        },
    },
    share: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        count: {
            type: Number,
            default: 0,
        },
    },

    childComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],

    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Comment = mongoose.model('Comment', commentSchema);
export default Comment;