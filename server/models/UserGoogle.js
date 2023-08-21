import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    googleId: String, // name for unique id google provides to every google user
    name: String,
    email: String,

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

var UserGoogle = mongoose.model('UserGoogle', userSchema);

UserGoogle.collection.createIndex({ name: 'text' });

export default UserGoogle;