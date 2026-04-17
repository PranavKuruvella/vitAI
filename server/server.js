import express from "express";
import cors from "cors"
import "dotenv/config";

import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express()

//db connection
await connectDB();

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow Vercel frontend domain
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Server is live")
})

//UserRoutes
app.use("/api/users", userRouter)
//ResumeRoutes
app.use("/api/resumes", resumeRouter)
//AI Routes
app.use("/api/ai", aiRouter)

// Export for Vercel serverless
export default app