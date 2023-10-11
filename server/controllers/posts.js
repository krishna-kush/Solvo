import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { Following } from '../models/Follow.js';
import User from '../models/User.js';
import UserGoogle from '../models/UserGoogle.js';

const ObjectId = mongoose.Types.ObjectId;

const common = {
    getUserFind: (_id) => {
        return ObjectId.isValid(_id) ? { _id : _id } : { sub: _id }
    },

    getUser: (whomSource) => {
        let user;
        if (whomSource==='google') {
            user = UserGoogle
        } else {
            user = User
        }
        return user
    }
}

export const create = async (req, res) => {
    try {
        let { amount, question, _id } = req.body;
        // console.log(question, _id);
        // console.log(typeof _id, _id);

        // CREATING POST
        const post = await Post.create({
            amount,
            question: question,
            creator: _id,
            createdAt: Date(),
        })
        .catch((err) => {
            console.log(err);
        })

        // ADDING POST ID TO CREATOR QUESTION LIST to know which question user asked and how many AND Updating postsCount
        await User.findOneAndUpdate(common.getUserFind(_id), {
            $push: {
                posts: post._id,
            },
            $inc: { postsCount: 1 }
        })
        
        const populatedPost = await post.populate('creator')

        console.log(populatedPost);

        res.status(200).json({ result: populatedPost });

    }
    catch (error) {
        console.log(error);
    }
}
export const deleteAny = async (req, res) => {
    try {
        const { what, _id, parentId } = req.body;
        
        let Collection, creatorId;

        if (what === 'post') {
            // Checking if the post is already taken or not
            const post = await Post.findOne({ _id: _id }).select(['taken', 'creator'])
            
            if (post.taken.length > 0) {
                console.log('Post is already taken');
                res.status(400).json({ message: `Post is already taken by ${post.taken.length} ${post.taken.length>1? 'users' : 'user'}` });
                return;
            }

            creatorId = post.creator;

            Collection = Post
        }
        else {
            Collection = Comment

            // before deleting the comment itself, removing it from it's parent's childComments array, so there won't be any problem while fetching and showing comments from frontend
            await Collection.findOneAndUpdate({ _id: parentId }, { // await is nessesery, Why? Maybe because if not await it'll delete the comment the run res.send, which will maybe cancle the ongoing operation
                $pull: {
                    childComments: _id,
                }
            });
        }
        
        await Collection.deleteOne({_id})
        .catch((err) => {
            console.log(err);
        })

        if (what === 'post') {
            // ADDING POST ID TO CREATOR QUESTION LIST to know which question user asked and how many AND Updating postsCount
            await User.findOneAndUpdate(common.getUserFind(creatorId), {
                $pull: {
                    posts: _id,
                },
                $inc: { postsCount: -1 }
            })
        }
        
        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {

    }
}

export const close = async (req, res) => {
    try {
        const { _id } = req.body;

        await Post.findOneAndUpdate({ _id: _id }, { closed: true });
        
        res.status(200);
    }
    catch (error) {

    }
}
export const take = async (req, res) => {
    try {
        const { _id, takerId, direction } = req.body;

        if (direction) {
            await Post.findOneAndUpdate({ _id: _id }, { $addToSet: { taken: takerId } });
        } else {
            await Post.findOneAndUpdate({ _id: _id }, { $pull: { taken: takerId } });
        }
        
        res.status(200).json({ status: 200});
    }
    catch (error) {
        res.status(500).json({ status: 500});
    }
}
export const hide = async (req, res) => {
    try {
        /*
        OPTION 0: Don't hide -> 'none'

        Option 1: Hide whole post from everybody -> 'private'

        Option 2: Hide only selected answer -> 'selected'

        Option 3: Hide every answer except selected answer -> 'exceptSelected'

        Option 4: Hide Every Answer -> 'all'
        */

        // console.log('hide');

        const { option, selectorId, selectedId } = req.body;
        // console.log(option, selectorId, selectedId);

        switch (option) {
            case 0:
                await Post.findOneAndUpdate({ _id: selectorId }, { hide: 'none', selected: selectedId });
                break;
            case 1:
                await Post.findOneAndUpdate({ _id: selectorId }, { hide: 'private', selected: selectedId });
                break;
            case 2:
                await Post.findOneAndUpdate({ _id: selectorId }, { hide: 'selected', selected: selectedId });
                break;
            case 3:
                await Post.findOneAndUpdate({ _id: selectorId }, { hide: 'exceptSelected', selected: selectedId });
                break;
            case 4:
                await Post.findOneAndUpdate({ _id: selectorId }, { hide: 'all', selected: selectedId });
                break;
            default:
                break;
        }
        
        res.status(200).json({ message: "Post hidden successfully" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const upAnswer = async (req, res) => {
    try {
        let { ans, post_id, user_id } = req.body;
        console.log(ans, post_id, user_id);

        const comment = await Comment.create({
            _id: new mongoose.Types.ObjectId(),
            comment: ans,
            creator: user_id,
            createdAt: Date(),
        })
        const populatedComment = await comment.populate('creator')
        console.log(comment);

        // pushing in post
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

        // pushing in creator
        await User.findOneAndUpdate(common.getUserFind(user_id), {
            $push: {
                answers: comment._id,
            }
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
        let { comment_text, parent_comment_id, user_id } = req.body;
        // console.log(ans, post_id, user_id);

        const comment = await Comment.create({
            _id: new mongoose.Types.ObjectId(),
            comment: comment_text,
            creator: user_id,
            createdAt: Date(),
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
        let { what, comment_id, user_id } = req.body;
        // console.log(user_id, `${what}.ids`);

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
    // console.log('getAll');

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
        // console.log(req.headers);
    
        let isClose = false;
    
        ws.on('message', async (data) => {
            if (isClose) {
                console.log('Data fetching stopped due to connection closure.');
                return;
            }
    
            try {
                let ascending = -1 // -1 for descending order and 1 for ascending order
    
                const { _id, is_following, following_id, skip, limit, if_last } = JSON.parse(data);
                
                console.log('getting', _id, is_following, following_id, skip, limit);

                let following;
                let following_ids_list;

                if (is_following) {
                    following = await Following.findOne({ _id: following_id });
                    if (following) {
                        following_ids_list = following.ids.map(id => id.toString());
                    }
                }

                // to don't find and send post which is private, but do send if the private post is of user himself
                const hide = {
                    $or: [
                        { hide: { $ne: 'private' } },
                        { creator: { _id: _id} }
                    ]
                }

                const posts = await Post.find(
                    (() => {
                        if (is_following === null) {
                            return { ...hide }
                        } else if (is_following === false) {
                            // return { creator: following_id } // also working
                            return { creator: { _id: following_id }, ...hide }
                        } else if (is_following === true) {
                            // return { creator: { _id: { "$in": following_ids_list } } }; // not working, Why?
                            return { creator: { "$in": following_ids_list }, ...hide };   
                        }
                    })()
                )
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

                // console.log(posts);

                if (posts[0]) {
                    //  Changing Answers as needed
                    if (posts[0].hide === 'all') {
                        posts[0].answers = [];
                    } else if (posts[0].hide === 'selected') {
                        posts[0].answers = posts[0].answers.filter(answer => answer._id.toString() !== posts[0].selected.toString());
                    } else if (posts[0].hide === 'exceptSelected') {
                        posts[0].answers = posts[0].answers.filter(answer => answer._id.toString() === posts[0].selected.toString());
                    }
                }


                console.log('sending');
    
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
        const { search } = req.body;
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
        const comment = await Comment.find({_id: req.body._id})
        .populate({
            path: 'creator',
            strictPopulate: false,
        })

        res.status(200).json({result: comment})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}