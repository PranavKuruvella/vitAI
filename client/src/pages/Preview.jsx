import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets.js'
import ResumePreview from '../components/ResumePreview.jsx'
import Loader from '../components/Loader.jsx'
import { ArrowLeft } from 'lucide-react'

const Preview = () => {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadResume = async () => {
      const resume = dummyResumeData.find((resume) => resume._id === resumeId);
      if (resume) {
        setResumeData(resume);
      }
      setIsLoading(false)
    }
    loadResume()
  }, [resumeId])

  return resumeData ? (
    <div className='bg-slate-700 min-h-screen'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="shadow-lg bg-white rounded-md" />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume Not Found</p>
          <a href="/" className='mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-indigo-400 flex items-center transition-colors'>
            <ArrowLeft className='mr-2 size-5' />
            Back to Dashboard
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview