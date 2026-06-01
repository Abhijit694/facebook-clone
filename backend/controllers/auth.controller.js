import bcrypt from "bcryptjs"
import User from "../models/user.model.js";

export const registerUser = async (req,res) => {
    try {
        const { firstname,lastname,email,password,gender,dateOfBirth } = req.body
        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Something missing"
            })
            const existingUser = await User.findOne({ email })
            if(existingUser){
                return res.status(400).json({
                    success: false,
                    message: "Email id taken try another email id"
                })
            }
            const hashedPassword = await bcrypt.hash(10,password)
            const newUser = new User({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                gender,
                dateOfBirth
            })
            await newUser.save()
            return res.status(201).json({
                success: true,
                message: "Account created successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Internal server error",
            error: error.message
        })
    }
}