import { Following, Followers } from "../models/Follow.js";
import Reference from '../models/Reference.js';

import User from '../models/User.js';
import UserGoogle from '../models/UserGoogle.js';

const common = {
    getUser: (whomSource) => {
        let user;
        if (whomSource==='UserGoogle') {
            user = UserGoogle
        } else {
            user = User
        }
        return user
    },

    all: async (direction, whoId, followingID, whomId, user) => {
        // Making refs for both user to add
        // await Reference.create({
        //     id: whoId,
        //     refModel: 'User',
        // })

        // Adding _id of the person logedId user wants to follow in his following list
        await Following.findOneAndUpdate(
            { _id: followingID },
            direction==='follow' ? { $addToSet: { ids: whomId } } : { $pull: { ids: whomId } },
            { new: true }
        )

        // Getting the followers list _id of the person logedin user wants to follow
        const whom = await user.findOne({ _id: whomId }).select('followers')

        // Adding _id of the logedin user in the followers list of the person logedin user wants to follow
        await Followers.findOneAndUpdate(
            { _id: whom.followers },
            direction==='follow' ? { $addToSet: { ids: whoId } } : { $pull: { ids: whoId } },
            { new: true }
        )
    }
}

export const follow = async (req, res) => {
    try {
        const {whoId, followingID, whomId, whomSource} = req.body; // whoId is id of the logedin user, followingId is his following list id And whomId is id of the user whom he wants to follow

        let user = common.getUser(whomSource)

        await common.all('follow', whoId, followingID, whomId, user)
        
        res.status(200).json({ message: "Succesfull" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const unFollow = async (req, res) => {
    try {
        const {whoId, followingID, whomId, whomSource} = req.body;

        let user = common.getUser(whomSource)

        await common.all('unFollow', whoId, followingID, whomId, user)
        
        res.status(200).json({ message: "Succesfull" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}