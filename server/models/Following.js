import mongoose from 'mongoose';

const followingSchema = mongoose.Schema({
    ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'followingRefModel',
    }],
    followingRefModel: [{
        type: String,
        enum: ['UserGoogle', 'User'],
    }],
})

var Following = mongoose.model('Following', followingSchema);

export default Following;