import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { acceptFriendRequest, cancelFriendRequest, deleteFriendRequest, getAllFriendRequests, getAllFriends, getAllSentRequests, sendFriendRequest } from "../controllers/friend.controller.js"

const router = express.Router()

router.post("/request/:id", isAuthenticated, sendFriendRequest)
router.put("/accept/:id", isAuthenticated, acceptFriendRequest)
router.delete("/request/received/:id", isAuthenticated, deleteFriendRequest)
router.delete("/request/sent/:id", isAuthenticated, cancelFriendRequest)
router.get("/requests/received", isAuthenticated, getAllFriendRequests)
router.get("/requests/sent", isAuthenticated, getAllSentRequests)
router.get("/friends", isAuthenticated, getAllFriends)


export default router;