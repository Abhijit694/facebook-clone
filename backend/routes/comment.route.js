import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { createComment } from "../controllers/comment.controller.js"

const router = express.Router()


router.post("/:id/create", isAuthenticated, createComment )