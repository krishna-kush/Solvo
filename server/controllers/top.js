import User from '../models/User.js';

const common = {
    
}

export const top = async (req, res) => {
    try {
        const { arg, limit } = req.body;

        let ascending = -1;

        const desiredFields = ['_id', 'postsCount']

        const users = await User.find()
        .sort({ PostsCount: ascending })
        .select(desiredFields.join(' '))
        .limit(limit)
        
        res.status(200).json({ result: users, message: "Succesfull" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}