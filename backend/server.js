import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT || 3000


// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



// api imports
import authRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import friendRouter from "./routes/friend.route.js"


app.use("/api/v1/auth",authRouter)
app.use("/api/v1/post",postRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/friend", friendRouter)



app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    connectDB()
})