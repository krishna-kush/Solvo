import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    sub: String, // id for google, if user is from google, that's why it's not set Required
    
    name: String,
    // age: String,
    email: String,
    password: String,

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    postsCount: {
        type: Number,
        default: 0,  
    },

    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    selectedAnswersCount: {
        type: Number,
        default: 0,  
    },

    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Following', // Case Sensetive
        required: true,
    },
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Followers',
        required: true,
    },

    photo: {
        type: String,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var User = mongoose.model('User', userSchema);

User.collection.createIndex({ name: 'text' });

export default User;