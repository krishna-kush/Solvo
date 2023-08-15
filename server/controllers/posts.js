import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import UserGoogle from '../models/UserGoogle.js';


export const create = async (req, res) => {
    try {
        let { amount, question, _id, source } = req.body;
        // console.log(question, _id);
        // console.log(typeof _id, _id);
        if (source=='google') {
            source = 'UserGoogle';
        } else if (source=='own') {
            source = 'User';
        }

        // console.log(source);

        const post = await Post.create({
            amount,
            question: question,
            creator: _id,
            creatorRefModel: source,
        })
        .catch((err) => {
            console.log(err);
        })
        const populatedPost = await post.populate('creator')

        console.log(populatedPost);

        res.status(200).json({ result: populatedPost });

    }
    catch (error) {

    }
}
export const deletePost = async (req, res) => {
    try {
        let { _id } = req.body;
        
        await Post.deleteOne({_id})
        .catch((err) => {
            console.log(err);
        })
        
        res.status(200);
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
        const populatedComment = await comment.populate('creator')
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

        res.status(200).json({ result: populatedComment, message: "Answer added successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const upComment = async (req, res) => {
    try {
        let { comment_text, parent_comment_id, user_id, user_source } = req.body;
        // console.log(ans, post_id, user_id);

        if (user_source=='google') {
            user_source = 'UserGoogle';
        } else if (user_source=='own') {
            user_source = 'User';
        }

        const comment = await Comment.create({
            _id: new mongoose.Types.ObjectId(),
            comment: comment_text,
            creator: user_id,
            creatorRefModel: user_source
        })
        const populatedComment = await comment.populate('creator')
        console.log(comment);

        await Comment.findOneAndUpdate({
            _id: parent_comment_id,
        }, {
            $push: {
                childComments: comment._id,
            }
        })
        .catch((err) => {
            console.log(err);
        })

        // console.log(existingPost); // this will be post before update
        res.status(200).json({result: populatedComment})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const increment = async (req, res) => {
    try {
        let { what, comment_id, user_id, user_source } = req.body;
        // console.log(user_id, user_source, `${what}.ids`);

        if (user_source=='google') {
            user_source = 'UserGoogle';
        } else if (user_source=='own') {
            user_source = 'User';
        }

        let found = true;


        let existingPost = await Comment.findOneAndUpdate(
        {
            _id: comment_id,
            [`${what}.ids`]: user_id
        },
        {
            $pull: { [`${what}.ids`]: user_id }, // it'll remove all the ids with value user_id
            $inc: { [`${what}.count`]: -1 }
        },
        { new: true }
        );
        
        if (!existingPost) {
        found = false;
        existingPost = await Comment.findOneAndUpdate(
            { _id: comment_id },
            {
            $addToSet: {
                [`${what}.ids`]: user_id,
                [`${what}.${what}RefModel`]: user_source
            },
            $inc: { [`${what}.count`]: 1 }
            },
            { new: true }
        );
        }
          
        res.status(200).json({found: found})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const getAll = async (req, res) => {
    console.log('getAll');

    try {

        let ascending = -1 // -1 for descending order and 1 for ascending order
        console.log('getting');
        const posts = await Post.find()
        .sort({_id:ascending}).limit(10)
        .populate({
            path: 'creator answers', 
            populate: {
                path: 'creator',
                strictPopulate: false, // why this is needed?
            }
        })
        console.log('got');
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

        console.log('sending');
        res.status(200).json({result: posts})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const getEnumerated = async (req, res) => {

    try {
        req.on('close', () => {
            // clearTimeout(timeout);
            console.log('Request was canceled by the client.');
        });

        // Check if the request was aborted from the frontend
        console.log(req.aborted);
        if (req.aborted) {
            // The request was canceled by the client
            console.log('Request was canceled by the client.');
            return res.status(499).send('Request canceled by the client.');
        }

        let ascending = -1 // -1 for descending order and 1 for ascending order

        const { skip, limit } = req.body;

        // const pipeline = [
        //     { $sort: { _id: ascending } },
        //     { $skip: 1 },
        //     { $limit: 1 },
        // ]; // for aggregation pipeline
        
        console.log('getting');

        const posts = await Post.find()
        .sort({_id:ascending})
        .skip(skip)
        .limit(limit)
        .populate({
            path: 'creator answers', 
            populate: {
                path: 'creator',
                strictPopulate: false,
            }
        })

        // Check if the request was aborted from the frontend
        console.log(req.aborted);
        if (req.aborted) {
            // The request was canceled by the client
            console.log('Request was canceled by the client.');
            return res.status(499).send('Request canceled by the client.');
        }

        console.log('sending');
        // let delay = (ms) => {
        //     return new Promise((resolve) => setTimeout(resolve, ms));
        // }

        // await delay(5000);

        res.status(200).json({result: posts})
        res.on('finish', () => {
            console.log('sent');
        });
    }
    catch (error) {
        // if (axios.isCancel(error)) {
        //   console.log('Request canceled:', error.message);
        //   res.status(499).send('Request canceled');
        // } else {
          console.log('Error:', error.message);
          res.status(500).json({ message: "Something went wrong" });
        // }
    }
}
export const wsGetEnumerated = async (ws, req) => {
    try {
        console.log('Client connected.');
    
        let isClose = false;
    
        ws.on('message', async (data) => {
            if (isClose) {
                console.log('Data fetching stopped due to connection closure.');
                return;
            }
    
            try {
                let ascending = -1 // -1 for descending order and 1 for ascending order
    
                const { skip, limit, if_last } = JSON.parse(data);
                
                // console.log('getting', skip, limit);
                
                const posts = await Post.find()
                    .sort({ _id: ascending })
                    .skip(skip)
                    .limit(limit)
                    .populate({
                        path: 'creator answers',
                        populate: {
                            path: 'creator',
                            strictPopulate: false,
                        },
                    })
    
                // console.log('sending');
    
                if (isClose) {
                    console.log('Data sending stopped due to connection closure.');
                    return;
                }
    
                ws.send(JSON.stringify({ status: 200, data: { result: posts, sn: skip, if_last } }));
                    
            } catch (error) {
                console.error('Error during data fetching:', error);
            }
        });
      
        ws.on('close', () => {
            console.log('Client disconnected.');
            
            isClose = true;
        });
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getBySearch = async (req, res) => {
    try {
        const {search} = req.body;
        const pattern = search.split(" ").join("|");
        const regexPattern = new RegExp(pattern, 'i');

        let ascending = -1 // -1 for descending order and 1 for ascending order
        const filteredPosts = await Post.find(
            { $or: [
                { $text: { $search: search } }, // The $text operator ignores language-specific stop words, such as the and and in English.
                { question: { $regex: regexPattern } } // If for above case no match found, perform regex search
            ]},
        )
        .sort({'like.count':ascending})
        .limit(10)
        .populate({
            path: 'creator answers', 
            populate: {
                path: 'creator',
                strictPopulate: false, // why this is needed?
            }
        })
        // Sort the filteredPosts based on a custom scoring function
        // filteredPosts.sort((a, b) => {
        //     const aScore = getMatchScore(a.question, search);
        //     const bScore = getMatchScore(b.question, search);
            
        //     return bScore - aScore;
        // });
        
        // Function to calculate the match score
        // function getMatchScore(question, search) {
        //     const words = search.toLowerCase().split(" ");
        //     const questionWords = question.toLowerCase().split(" ");
            
        //     let score = 0;
        //     for (const word of words) {
        //     for (const questionWord of questionWords) {
        //         if (questionWord.includes(word)) {
        //         score++;
        //         break;
        //         }
        //     }
        //     }
            
        //     return score;
        // }

        res.status(200).json({result: filteredPosts})
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getComment = async (req, res) => {
    try {
        const comment = await Comment.find({_id: req.body._id}).populate('creator')

        res.status(200).json({result: comment})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}