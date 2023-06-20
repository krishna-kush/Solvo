import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: String,
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

export default UserGoogle;