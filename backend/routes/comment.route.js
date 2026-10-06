import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createComment, deleteComment, likeComment } from "../controllers/comment.controller.js"

const router = express.Router()


router.post("/:id/create", isAuthenticated, createComment )
router.delete("/:id/delete", isAuthenticated, deleteComment)
router.post("/:id/like", isAuthenticated, likeComment)

export default router