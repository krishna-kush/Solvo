import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import UserGoogle from '../models/UserGoogle.js';


export const question = async (req, res) => {
    try {
        const {input, limit} = req.body;

        let ascending = -1 // -1 for descending order and 1 for ascending order
        const filteredPosts = await Post.find(
            { $text: { $search: input } },
        )
        .sort({'like.count':ascending})
        .limit(limit)
        .select('question');

        // const questions = [...filteredPosts.question]
        const questions = filteredPosts.map((post) => {return post.question})

        res.status(200).json({result: questions})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const topic = async (req, res) => {
    try {
        const {input, limit} = req.body;

        let ascending = -1 // -1 for descending order and 1 for ascending order
        const filteredPosts = await Post.find(
            { $text: { $search: input } },
        )
        .sort({'like.count':ascending})
        .limit(limit)
        .select('question');

        const questions = filteredPosts.map((post) => {return post.question})

        res.status(200).json({result: questions})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const channel = async (req, res) => {
    try {
        const {input, limit} = req.body;

        const filteredUsers = await User.find(
            { $text: { $search: input } },
        )
        .limit(limit)
        .select('name');
        const filteredUsersGoogle = await UserGoogle.find(
            { $text: { $search: input } },
        )
        .limit(limit)
        .select('name');

        const users = filteredUsers.map((user) => {return user.name})
        const googleusers = filteredUsersGoogle.map((user) => {return user.name})

        res.status(200).json({result: [...users, ...googleusers]})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}