import User from "../models/user.model.js"


export const sendFriendRequest = async (req,res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id

        if(senderId === receiverId){
            return res.status(400).json({
                success: false,
                message: "Cannot sent friend request to yourself"
            })
        }

        const [receiver, sender] = await Promise.all([
            User.findById(receiverId),
            User.findById(senderId)
        ])

        if(!receiver || !sender){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Check if already friends
        if(receiver.friends.includes(senderId)){
            return res.status(400).json({
                success: false,
                message: "Already friends"
            })
        }

        // Check if request already sent
        if(receiver.friendRequests.includes(senderId)){
            return res.status(400).json({
                success: false,
                message: "Request already sent"
            })
        }

        // Sent friend request
        sender.sentRequests.push(receiverId)
        receiver.friendRequests.push(senderId)

        await Promise.all([sender.save(), receiver.save()])         // parallel saves

        return res.status(200).json({
            success: true,
            message: "Friend request sent"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const acceptFriendRequest = async (req,res) => {
    try {
        const receiverId = req.id
        const senderId = req.params.id

        if(receiverId === senderId){
            return res.status(400).json({
                success: false,
                message: "Invalid operation"
            })
        }
    
        const [receiver, sender] = await Promise.all([
            User.findById(receiverId),
            User.findById(senderId)
        ])
    
        if(!sender || !receiver){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    
        // Check if request exist
        if(!(receiver.friendRequests.includes(senderId))){
            return res.status(400).json({
                success: false,
                message: "No pending request"
            })
        }

        // Remove from friendRequest and sentRequest arrays (reassign!)
        sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== receiverId)
        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId)
    
        // Add to friends array
        sender.friends.push(receiverId)
        receiver.friends.push(senderId)
    
        await Promise.all([sender.save(), receiver.save()])         // parallel saves
    
        return res.status(200).json({
            success: true,
            message: "Friends"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

export const deleteFriendRequest = async (req,res) => {
    try {
        const receiverId = req.id
        const senderId = req.params.id

        const [sender, receiver] = await Promise.all([
            User.findById(senderId),
            User.findById(receiverId)
        ])
        if(!sender || !receiver){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Check if request exists
        if (!receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({
                success: false,
                message: "No pending request"
            });
        }

        sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== receiverId)
        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId)

        await Promise.all([sender.save(), receiver.save()])
        return res.status(200).json({
            success: true,
            message: "Request rejected"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const cancelFriendRequest = async (req,res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id

        const [sender, receiver] = await Promise.all([
            User.findById(senderId),
            User.findById(receiverId)
        ])

        if(!sender || !receiver){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Check if request exists
        const isRequestexist = sender.sentRequests.some(id => id.toString() === receiverId)
        if(!isRequestexist){
            return res.status(400).json({
                success: false,
                message: "No pending request"
            })
        }
        await Promise.all([
            User.findByIdAndUpdate(senderId, { $pull: {sentRequests: receiverId} }),
            User.findByIdAndUpdate(receiverId, { $pull: {friendRequests: senderId} })
        ])
        return res.status(200).json({
            success: true,
            message: "Friend request cancelled"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getAllFriendRequests = async (req,res) => {
    try {
        const userId = req.id
    
        const user = await User.findById(userId).populate({
            path: "friendRequests",
            select: "firstname lastname profilePicture"
        })
    
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    
        return res.status(200).json({
            success: true,
            friendRequests: user?.friendRequests,
            message: "ll friend requests fetched"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

export const getAllSentRequests = async (req,res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId)
        .populate("sentRequests", "firstname lastname profilePicture")

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            sentRequests: user?.sentRequests,
            message: "All sent requests fetched"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getAllFriends = async (req, res) => {
    try {
        const userId = req.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get total count for hasMore logic
        const totalFriends = user.friends.length;

        // Fetch paginated friends
        const friends = await User.find({ _id: { $in: user.friends } })
            .skip(skip)
            .limit(limit)
            .select("firstname lastname profilePicture");

        return res.status(200).json({
            success: true,
            friends,
            hasMore: skip + limit < totalFriends,
            message: "Friends fetched successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};