import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createPost, deletePost, disLikePost, getAllPost, getPostByUserId, getUserPost, likePost, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router()

router.post('/create', isAuthenticated, upload.single('file'), createPost)
router.get('/getallpost', isAuthenticated, getAllPost)
router.get('/getuserpost', isAuthenticated, getUserPost)
router.get("/:userId", isAuthenticated, getPostByUserId)
router.delete("/delete/:id", isAuthenticated, deletePost)
router.put("/update-post/:postId", isAuthenticated, updatePost)
router.get('/:id/like', isAuthenticated, likePost)
router.get('/:id/dislike', isAuthenticated, disLikePost)



export default router