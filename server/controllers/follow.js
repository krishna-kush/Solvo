import Following from "../models/Following.js";

export const follow = async (req, res) => {
    try {
        const {who, whom} = req.body;

        Following.findOneAndUpdate(
            { _id: who },
            { $addToSet: { ids: whom } },
            { new: true }
        )
        .then(updatedDocument => {
            res.status(200).send()
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const unFollow = async (req, res) => {
    try {
        const {who, whom} = req.body;

        Following.findOneAndUpdate(
            { _id: who },
            { $pull: { ids: whom } },
            { new: true }
        )
        .then(updatedDocument => {
            res.status(200).send()
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}