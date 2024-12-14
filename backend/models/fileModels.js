import mongoose from "mongoose";

const filesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dataType: {
        type: String,
        required: true
    },
    data: {
        type: String,
    },
});

const File = mongoose.model('File', filesSchema);
export default File