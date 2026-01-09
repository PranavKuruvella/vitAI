import express from "express";
import cors from "cors"
import "dotenv/config";

import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express()
const PORT = process.env.PORT || 3000

//db connection
await connectDB();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is live")
})

//UserRoutes
app.use("/api/users", userRouter)
//ResumeRoutes
app.use("/api/resumes", resumeRouter)
//AI Routes
app.use("/api/ai", aiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})