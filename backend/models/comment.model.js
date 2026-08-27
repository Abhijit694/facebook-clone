import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    like: {
        type: Array,
        default: []
    },
    numberOfLikes: {
        type: Number,
        default: 0
    }
},{ timestamps: true })

const Comment = mongoose.model("Comment",commentSchema)
export default Comment;