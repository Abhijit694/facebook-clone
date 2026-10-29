import mongoose from "mongoose";


const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mediaType: {
        type: String,
        enum: ["Image", "Video"],
        required: true
    },
    media: {
        type: String,
        required: true
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400
    }
},{ timestamps: true })


const Story = mongoose.model("Story",storySchema)
export default Story