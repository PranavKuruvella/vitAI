import imageKit from "../configs/imageKit.js"
import Resume from "../models/Resume.js"
import fs from "fs"

//post -- /api/resumes/create -- for creating a new resume
export const createResume = async (req, res) => {

  try {
    const userId = req.userId
    const { title } = req.body

    //creating & returning the resume
    const newResume = await Resume.create({ userId, title })
    return res.status(201).json({ message: "Resume created successfully!", resume: newResume })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error in Resume Controller" })
  }
}

//delete -- /api/resumes/delete -- for deleting a resume
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId
    const { resumeId } = req.params

    //deleting the resume
    await Resume.findOneAndDelete({ userId, _id: resumeId })
    return res.status(200).json({ message: "Resume deleted successfully!" })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error in Resume Controller" })
  }
}

//get -- /api/resumes/get -- for getting a resume
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId
    const { resumeId } = req.params

    //getting the resume
    const resume = await Resume.findOne({ userId, _id: resumeId }) //only aa userid tho unnapude resumeid help tho osthundhi..just resumeid tho rasthe if guess chesi find cheyachu gaa

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }

    //got the resume
    resume.__v = undefined
    resume.createdAt = undefined
    resume.updatedAt = undefined
    return res.status(200).json({ resume })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error in Resume Controller" })
  }
}

//get -- /api/resumes/public -- for getting a public resume by id
export const getPublicResumeById = async (req, res) => {

  try {
    const { resumeId } = req.params

    //getting the resume
    const resume = await Resume.findOne({ public: true, _id: resumeId })

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }

    //got the resume
    return res.status(200).json({ resume })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error in Resume Controller" })
  }

}

//put -- /api/resumes/update -- for updating a resume
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId
    const { resumeId, resumeData, removeBackground } = req.body

    const image = req.file //will be added by middleware

    //updating the resume
    let resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

    if (image) {

      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: 'user-resumes',
        transformation: {
          pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
        }
      })

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true })

    //got the resume
    return res.status(200).json({ message: "Resume updated successfully!", resume })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error in Resume Controller" })
  }
}
