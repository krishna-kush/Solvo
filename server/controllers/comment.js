import Comment from '../models/Comment.js';

const common = {
    
}

export const select = async (req, res) => {
    try {
        const { _id } = req.body;

        await Comment.findOneAndUpdate(
            { _id: _id },
            { selected: true },
            { new: true }
        )
        
        res.status(200).json({ message: "Succesfull" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}