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


export const getAllPost = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            posts
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


export const getUserPost = async (req,res) => {
    try {
        const authorId = req.id
        const posts = await Post.find({user: authorId}).sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === "production" ? undefined : error.message
        })
    }
}


export const getPostByUserId = async (req,res) => {
    try {
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "userId is required to get user post"
            })
        }
        const posts = await Post.find({user: userId}).sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === "production" ? undefined : error.message
        })
    }
}


export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id
        const authorId = req.id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        if(post.user.toString() !== authorId.toString()){
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this post"
            })
        }
        await Post.findByIdAndDelete(postId)
        
        return res.status(200).jaon({
            success: true,
            message: "Post deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updatePost = async (req,res) => {
    try {
        const postId = req.params.postId
        const { content } = req.body
        const file = req.file
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        let photo;
        if(file){
            const fileUri = getDataUri(file)
            photo = await cloudinary.uploader.upload(fileUri)
        }
        const updateData = {content, user:req.id, image:photo.secure_url}
        post = await Post.findByIdAndUpdate(postId, updateData, {returnDocument: "after"})
        return res.status(200).json({
            success: true,
            message: "Post updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}