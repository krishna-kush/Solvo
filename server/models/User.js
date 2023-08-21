import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    // age: String,
    email: String,
    password: String,

    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Following', // Case Sensetive
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