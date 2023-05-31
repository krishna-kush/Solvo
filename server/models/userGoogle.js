import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    picture: {
        type: String,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var userGoogle = mongoose.model('userGoogle', userSchema);

export default userGoogle;