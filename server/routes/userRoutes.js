import express from "express"
import { getUserbyId, getUserResumes, loginUser, registerUser } from "../controllers/userController.js"
import protect from "../middlewares/authMiddleware.js" //adds the userId from the token


const userRouter = express.Router()

// -- api/user/register --
userRouter.post("/register", registerUser)

// -- api/user/login --
userRouter.post("/login", loginUser)

// -- api/user/data --
userRouter.get("/data", protect, getUserbyId)

// -- api/user/resumes -- getting resumes created by user
userRouter.get("/resumes", protect, getUserResumes)

export default userRouter