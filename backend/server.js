import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"

const app = express()
const port = process.env.PORT || 3000


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


// api
app.use("/api/v1/auth",authRouter)

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    connectDB()
})