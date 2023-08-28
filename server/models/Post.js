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

    closed: {
        type: Boolean,
        default: false,
    },
    
    // tags: [String],
    // selectedFile: String,
    like: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'likeRefModel',
        }],
        likeRefModel: [{
            type: String,
            enum: ['UserGoogle', 'User'],
        }],
        count: {
            type: Number,
            default: 0,
        },
    },
    dislike: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dislikeRefModel',
        }],
        dislikeRefModel: [{
            type: String,
            enum: ['UserGoogle', 'User'],
        }],
        count: {
            type: Number,
            default: 0,
        },
    },
    share: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shareRefModel',
        }],
        shareRefModel: [{
            type: String,
            enum: ['UserGoogle', 'User'],
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