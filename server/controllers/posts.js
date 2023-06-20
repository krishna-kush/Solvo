import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import UserGoogle from '../models/UserGoogle.js';


export const create = async (req, res) => {
    try {
        let { question, _id, source } = req.body;
        console.log(question, _id);
        console.log(typeof _id, _id);
        if (source=='google') {
            source = 'UserGoogle';
        } else if (source=='own') {
            source = 'User';
        }

        // console.log(source);

        const post = await Post.create({
            question: question,
            creator: _id,
            creatorRefModel: source,
        })
        .catch((err) => {
            console.log(err);
        })

        console.log(post);

    }
    catch (error) {

    }
}

export const upAnswer = async (req, res) => {
    try {
        let { ans, post_id, user_id, user_source } = req.body;
        console.log(ans, post_id, user_id);

        if (user_source=='google') {
            user_source = 'UserGoogle';
        } else if (user_source=='own') {
            user_source = 'User';
        }

        const comment = await Comment.create({
            _id: new mongoose.Types.ObjectId(),
            comment: ans,
            creator: user_id,
            creatorRefModel: user_source
        })
        console.log(comment);

        await Post.findOneAndUpdate({
            _id: post_id,
        }, {
            $push: {
                answers: comment._id,
            }
        })
        .catch((err) => {
            console.log(err);
        })

        // console.log(existingPost); // this will be post before update

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAll = async (req, res) => {
    try {

        let ascending = -1 // -1 for descending order and 1 for ascending order
        const posts = await Post.find()
        .sort({_id:ascending}).limit(10)
        .populate({
            path: 'creator answers', 
            populate: {
                path: 'creator',
                strictPopulate: false, // why this is needed?
            }
        })
        // .populate({
        //     path: 'creator',
        //     model: (doc) => {
        //         doc.creatorRefModel = source;
        //         switch (doc.creatorRefModel) {
        //             case 'UserGoogle':
        //                 return UserGoogle;
        //             case 'user':
        //                 return User;
        //         }
        //     },
        // })
        
        // posts[0].answers.populate('creator').exexPopulate()
        // for (const post of posts) {
        //     post.populate('creator').populate('answers').execPopulate();
        // }

        res.status(200).json({result: posts})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getComments = async (req, res) => {
    try {
        // const { email, password } = req.body;
        
        console.log('done');
        let a = await Comment.findOne({
            _id : "64813e8ef2356b84d0049966"
        })
        let b = await Comment.findOne({
            _id : "648144edc88ebc1d8f2eb8df"
        })
        let c = await Comment.findOne({
            _id : "6481450535cf67b6e09ee08a"
        })
        // console.log('a', a);
        // console.log('done');

        const existingUser = await Comment.create({
            comment: "Comment",
            creator: "Creator",

            childComments: [a._id, b._id, c],
        });
        console.log(existingUser);
        console.log('done');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}