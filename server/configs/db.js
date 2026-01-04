import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected")
    })
    let mongodbURI = process.env.MONGODB_URI
    const projectName = 'vitAI'

    if (!mongodbURI) {
      throw new Error("Please provide MONGODB_URI in the environment variables")
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1)
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`)
  } catch (err) {
    console.log("MongoDB Connection Error", err)
  }
}

export default connectDB