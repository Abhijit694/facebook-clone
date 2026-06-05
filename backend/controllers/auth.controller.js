import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const registerUser = async (req,res) => {
    try {
        const { firstname,lastname,email,password,gender,dateOfBirth,confirmPass } = req.body
        if(!firstname || !lastname || !email || !password || !confirmPass){
            return res.status(400).json({
                success: false,
                message: "Something missing"
            })
        }
        if(password !== confirmPass){
            return res,status(400).json({
                success: false,
                message: "Password and confirm password didn't match"
            })
        }
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email id taken try another email id"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Internal server error",
            error: error.message
        })
    }
}

export const loginUser = async (req,res) => {
    try {
        const { email,password } = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }
        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }
        const token = await jwt.sign(
            {userId: user._id},
            process.env.JWT_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        return res.status(200).cookie(
            "token",
            token,
            {
                maxAge: 1*24*60*60*1000,
                httpOnly: true,
                sameSite: "strict"
            }
        ).json({
            success: true,
            message: `Welcome ${user.firstname}`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export const logoutUser = (_,res) => {
    try {
        // here we can use clearcookie() for clearing the cookie
        return res.status(200).cookie(
            "token",
            "",
            {
                maxAge: 0,
                httpOnly: true,
                sameSite: "strict"
            }
        ).json({
            success: true,
            message: "Logged out successsfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            messsage: "Internal server error",
            error: error.message
        })
    }
}