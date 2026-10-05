import Post from "../models/post.model.js"
import Comment from "../models/comment.model.js"

export const createComment = async (req,res) => {
    try {
        const postId = req.params.id
        const commentKarneWaleUserKiId = req.id
        const {content} = req.body
        
        const post = await Post.findById(postId)
        if(!content){
            return res.status(400).json({
                success: true,
                message: "Text is required"
            })
        }
        const comment = await Comment.create({
            content,
            userId: commentKarneWaleUserKiId,
            postId
        })

        await comment.populate({
            path: "userId",
            select: "firstname lastname profilePicture"
        })

        post.comments.push(comment._id)
        await post.save()
        return res.status(201).json({
            success: true,
            message: "Comment added",
            comment
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}