import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router()

router.post('/create', isAuthenticated, upload.single('file'), createPost)



export default router