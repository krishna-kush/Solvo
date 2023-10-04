// Not using it now in codeBase, it's just for case if needed in future...

import mongoose from 'mongoose';

const refSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `refModel`,
    },
    refModel: {
        type: String,
    },
})

var Reference = mongoose.model('Reference', refSchema);
export default Reference;