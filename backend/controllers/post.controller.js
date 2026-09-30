import sharp from "sharp"
import cloudinary from "../utils/cloudinary.js"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const createPost = async (req,res) => {
    try {
        const userId = req.id
        const {content} = req.body
        const file = req.file
        if(!file){
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
        
        const optimisedImageBuffer = await sharp(file.buffer)
        .resize({width: 800, height: 800, fit: 'inside'})
        .toFormat('jpeg', {quality: 80})
        .toBuffer();

        // buffer to datauri
        const fileUri = `data:image/jpeg;base64,${optimisedImageBuffer.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(fileUri)

        const post = await Post.create({
            content,
            image: cloudResponse.secure_url,
            user: userId
        })

        const user = await User.findById(userId)
        if(user){
            user.posts.push(post._id)
            await user.save()
        }

        await post.populate({
            path: 'user',
            select: '-password'
        })

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}