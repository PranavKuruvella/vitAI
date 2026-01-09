import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

//POST-/api/ai/enhance-pro-sum -- to enhace summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: " Missing required fields" });
    }

    //see docs
    const response = await ai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing.\nYour task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else."
        },
        {
          role: "user",
          content: `${userContent}`
        }
      ]
    });
    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({ message: "Enhanced summary successfully", enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error in AI Controller" });
  }
}

//post--/api/ai/enhace-job-desc -- to enhance job description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: " Missing required fields" });
    }

    //see docs
    const response = await ai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing.Your task is to enhance the job description of a resume. The description should be in 1-2 sentences , concise and impactful, focusing on achievements and quantifiable results. Make it compelling and ATS-friendly. and only return text no options or anything else."
        },
        {
          role: "user",
          content: `${userContent}`
        }
      ]
    });
    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({ message: "Enhanced job description successfully", enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error in AI Controller" });
  }
}

//post--/api/ai/upload-resume -- to upload resume into db
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ message: " Missing required fields" });
    }

    const systemPrompt = "You are an expert AI agent to extract data from resume."
    const userPrompt = `extract data from the resume : ${resumeText}
    provide the data in this following JSON format with no additional text or explanation:

    {
      professional_summary: {
    type: String,
    default: ""
  },
  skills: [{
    type: String,
  }],
  personal_info: {
    image: { type: String, default: "" },
    full_name: { type: String, default: "" },
    profession: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  experience: [{
    company: { type: String },
    position: { type: String },
    start_date: { type: String },
    end_date: { type: String },
    description: { type: String },
    is_current: { type: Boolean },
  }],
  project: [{
    name: { type: String },
    type: { type: String },
    description: { type: String },
    link: { type: String },

  }],
  education: [{
    institution: { type: String },
    degree: { type: String },
    field: { type: String },
    graduation_date: { type: String },
    gpa: { type: String },

  }]
}
}`

    //see docs
    const response = await ai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      response_format: { type: 'json_object' }
    });
    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    //saving into db
    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData
    });

    res.json({ resume: newResume._id });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error in AI Controller" });
  }
}