import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    question: String,
    // answer: [String],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Case Sensetive
    }],

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'creatorRefModel',
        // required: true,
    },
    creatorRefModel: {
        type: String,
        enum: ['UserGoogle', 'User'],
        // required: true,
    },
    
    // tags: [String],
    // selectedFile: String,
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
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Post = mongoose.model('Post', postSchema);

export default Post;