import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Resume from "../models/Resume.js";


const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" }) //expires in 7days
  return token
}

//Post -- /api/users/register -- for user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required Fields!" })
    }

    //check if email already exist
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "User already exists!" })

    //if mail isnt exist -- create new one

    //the hashing can be done inside schema
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })

    const token = generateToken(newUser._id)
    newUser.password = undefined //so that client wont actully get the password
    return res.status(201).json({ message: "User created successfully!", token, user: newUser })


  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Internal Server Error in User Controller" })

  }
}

//Post -- /api/users/login -- for user login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required Fields!" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid User or Password" })
    }

    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid User or Password" })
    }

    //valid password aithe -- create token
    const token = generateToken(user._id)
    user.password = undefined
    return res.status(200).json({ message: "User logged in successfully!", token, user })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Internal Server Error in User Controller" })
  }
}

//get -- /api/users/data -- for getting user id

export const getUserbyId = async (req, res) => {

  try {

    const userId = req.userId
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    //got the user
    user.password = undefined
    return res.status(200).json({ user })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Internal Server Error in User Controller" })
  }

}


//get -- /api/users/resumes -- for getting user resumes

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId

    //return user resumes 
    const resumes = await Resume.find({ userId })
    return res.status(200).json({ resumes })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error in User Controller" })
  }
}