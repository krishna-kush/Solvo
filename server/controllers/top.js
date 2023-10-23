import { get } from 'mongoose';
import User from '../models/User.js';

const common = {
    
}

export const top = async (req, res) => {
    try {
        const { arg, limit } = req.body;

        let ascending = -1;

        // const desiredFields = ['_id']

        // console.log(arg);

        let users;

        const getPipeline = (count) => {
            return [
                {
                    $project: {
                        count: `$${count}`, // Rename selectedAnswersCount to count  
                    }
                },
            ];
        }

        if (arg === 'answers') {
            users = await User.aggregate(getPipeline('selectedAnswersCount'))
            .sort({ count: ascending })
            .limit(limit);
        } else if (arg === 'questions') {
            users = await User.aggregate(getPipeline('postsCount'))
            .sort({ count: ascending })
            .limit(limit);
        }
        
        res.status(200).json({ result: users, message: "Succesfull" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}