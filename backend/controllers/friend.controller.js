import User from "../models/user.model"


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