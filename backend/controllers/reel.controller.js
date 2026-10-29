import Reel from "../models/reel.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";


const uploadReel = async (req,res) => {
    try {
        const userId = req.id
        const { caption } = req.body

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        let videoURL;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "video"          // Important for video uploads
            })
            videoURL = result.secure_url        // Extract the URL string

        }else{
            return res.status(400).json({
                success: false,
                message: "Video is required"
            })
        }

        const newReel = await Reel.create({
            user: userId,
            video: videoURL,
            caption
        })


        // await User.findByIdAndUpdate(userId, {
        //     $push: { reels: newReel._id }
        // })

        // // Fetch the created reel with populated user
        // const populatedReel = await Reel.findById(newReel._id)
        // .populate("user", "firstname lastname profilePicture")


        // Alternate code most optimised with less db calls
        const [, populatedReel] = await Promise.all([
            User.findByIdAndUpdate(userId, {
                $push: { reels: newReel._id }
            }),
            Reel.findById(newReel._id)
            .populate("user", "firstname lastname profilePicture")
        ])

        return res.status(201).json({
            success: true,
            message: "Reel uploaded",
            reel: populatedReel
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const likeOrDislikeReel = async (req,res) => {
    try {
        const userId = req.id
        const reelId = req.params.id

        const reel = await Reel.findById(reelId)
        if(!reel){
            return res.status(404).json({
                success: false,
                message: "Reel not found"
            })
        }

        const alreadyLiked = reel.likes.some(id => id.toString() === userId.toString())
        if(alreadyLiked){
            reel.likes = reel.likes.filter(id => id.toString() !== userId.toString())
        }else{
            reel.likes.push(userId)
        }
        await reel.save()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const commentOnReel = async (req,res) => {
    try {
        const userId = req.id
        const reelId = req.params.id
        const {commentText} = req.body

        const reel = await Reel.findById(reelId)
        if(!reel){
            return res.status(404).json({
                success: false,
                message: "Reel not found"
            })
        }
        reel.comments.push({
            user: userId,
            commentText
        })
        await reel.save()

        // fetch the updated reel with populated user
        const populatedReel = await reel.findById(reelId)
        .populate("user", "firstname lastname profilePicture")

        // Manually populate comment users since they are embedded
        const populatedComments = await Promise.all(
            populatedReel.comments.map(async (comment) => {
                const commentUser = await User.findById(comment.user).select("firstname lastname profilePicture")
                return {
                    ...comment.toObject(),
                    user: commentUser
                }
            })
        )

        const responseReel = {
            ...populatedReel.toObject(),
            comments: populatedComments
        }

        return res.status(201).json({
            success: true,
            message: "Comment added",
            reel: responseReel
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const deleteCommentOnReel = async (req,res) => {
    try {
        const userId = req.id
        const reelId = req.params.reelId
        const commentId = req.params.commentId

        const reel = await Reel.findById(reelId)
        if(!reel){
            return res.status(404).json({
                succes: false,
                message: "Reel not found"
            })
        }

        // Find the comment index in the array
        const commentIndex = reel.comments.findIndex((comment) => (
            comment._id.toString() === commentId
        ))

        if(commentIndex === -1){
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        const  comment = reel.comments[commentIndex]

        // Authorization check: only comment owner or reel owner can delete otherwise can't
        if(comment.user.toString() !== userId && reel.user.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this comment"
            })
        }

        // Remove the comment by using filter or splice
        // reel.comments.splice(commentIndex,1)
        // await reel.save()

        // MongoDB's $pull operator (more efficient than splice + save)
        await Reel.findByIdAndUpdate(
            reelId,
            { $pull: {comments: { _id: commentId}} }
        )

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}