import mongoose from 'mongoose';

// const followSchema = (what) => mongoose.Schema({
//     ids: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: `refModel`,
//     }],
//     refModel: [{
//         type: String,
//         enum: ['UserGoogle', 'User'],
//     }],
// })

const followSchema = () => mongoose.Schema({
    ids: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: `Reference`,
    }]
})

export const Following = mongoose.model('Following', followSchema());
export const Followers = mongoose.model('Followers', followSchema());
