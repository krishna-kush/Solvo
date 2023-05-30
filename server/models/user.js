import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    // name: String,
    // age: String,
    email: String,
    password: String,
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

export default User;