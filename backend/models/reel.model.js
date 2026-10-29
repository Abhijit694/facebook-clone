import mongoose from "mongoose";


const reelCommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    commentText: {
        type: String,
        required: true
    }
},{ timestamps: true })



const reelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    video: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [reelCommentSchema]               // Embedded subdocuments
},{ timestamps: true })


const Reel = mongoose.model("Reel",reelSchema)
export default Reel