import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    amount: Number,

    question: {
        type: String,
        index: "text", // to create a index for text for search
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Case Sensetive
    }],

    selected: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },

    closed: {
        type: Boolean,
        default: false,
    },

    taken: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    hide: {
        type: String,
        enum: ['none', 'private', 'all', 'selected', 'exceptSelected'],
        default: 'none',
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
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

// // Create indexes
// postSchema.index({ question: 'text' }); // Create a text index on the 'question' field
// postSchema.index({ question: 1 }); // Create a regular index on the 'question' field

var Post = mongoose.model('Post', postSchema);

Post.collection.createIndex({ question: 'text' });
Post.collection.createIndex({ question: 1 }); // Create a regular index on the 'question' field for regex if needed

export default Post;