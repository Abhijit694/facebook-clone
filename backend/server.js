import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cors from "cors"

const app = express()
const port = process.env.PORT || 3000


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



// api
app.use("/api/v1/auth",authRouter)

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    connectDB()
})