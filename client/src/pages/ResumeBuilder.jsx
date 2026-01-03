import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, Eye, EyeOff, FileText, FolderIcon, GraduationCap, Share, Share2Icon, Sparkles, User } from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import ProfessionalSummary from "../components/ProfessionalSummary.jsx";
import ExperienceForm from "../components/ExperienceForm.jsx";
import EducationForm from "../components/EducationForm.jsx";
import ProjectForm from "../components/ProjectForm.jsx";
import SkillForm from "../components/SkillForm.jsx";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({ //resume details
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  useEffect(() => { //page load avvagane edhi chey
    const loadExistingResume = async () => { //db fetch to get the resume details if present
      const resume = dummyResumeData.find((resume) => resume._id === resumeId);
      if (resume) {
        setResumeData(resume);
        document.title = resume.title;
      }
    };
    loadExistingResume();
  }, [resumeId]);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0) //progress bar kosam
  const [remove, setRemove] = useState(false)


  const sections = [ //different sections of the resume
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]


  const changeResumeVisibility = () => { //toggle public/private
    setResumeData(prev => ({ ...prev, public: !prev.public }))
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeData._id}`;

    if (navigator.share) {
      navigator.share({
        title: resumeData.title,
        text: "Check out my resume!",
        url: resumeUrl,
      })
    } else {
      alert(" Currently Share not Supported")
    }
  }

  const downloadResume = () => {
    window.print();
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left Panel */}
          <div className="relative lg:col-span-5 rounded-lg">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative">
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 w-full border-2 border-gray-200" />
              <hr className="absolute top-0 left-0 h-1 bg-linear-to-r from-indigo-500 to-indigo-600 border-none transition-all duration-2000"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                {/* left side */}
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                  />

                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                {/* right side */}
                <div className="flex items-center">
                  <button
                    //prevIndex is a inbuild method in useState for updating the state
                    onClick={() => setActiveSectionIndex((prevIndex) => Math.max(0, prevIndex - 1))}
                    disabled={activeSectionIndex === 0}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === 0 && "opacity-50"}`}
                  >
                    <ChevronLeft className="size-4" /> Previous
                  </button>
                  <button
                    onClick={() => setActiveSectionIndex((prevIndex) => Math.min(sections.length - 1, prevIndex + 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && "opacity-50"}`} disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>

              </div>

              {/* form content */}
              <div className="space-y-6">
                {/* Render Personal Info Form only when active section is "personal" */}
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info} // Pass only personal info data
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} // Update only personal_info in main state
                    removeBackground={remove}
                    setRemoveBackground={setRemove}
                  />
                )}
                {/* active session summary aithene edhi chupi */}
                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                    setResumeData={setResumeData}
                  />
                )}
                {/* {for Experience section} */}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}

                  />
                )}
                {/* {for Education section} */}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}

                  />
                )}

                {/* {for Project section} */}
                {activeSection.id === "project" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))}
                  />
                )}
                {/* {for Skills section} */}
                {activeSection.id === "skills" && (
                  <SkillForm
                    data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                  />
                )}

              </div>

              {/* save changes button */}
              <button className="bg-linear-to-br from-indigo-100 to-indigo-200 ring-indigo-300 text-indigo-600 ring hover:ring-indigo-400 transition-all rounded-md px-6 py-2 mt-6 text-sm font-semibold">
                Save Changes
              </button>
            </div>
          </div>

          {/* right panel -- Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              {/* buttons */}

              <div className="absolute bottom-3 right-0 ring-0 flex items-center justify-end gap-2">
                {
                  resumeData.public && (
                    <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from bg-indigo-100 to-indigo-200 text-blue-600 rounded-lg ring-indigo-300 hover:ring transition-colors">
                      <Share2Icon className="size-4" />
                    </button>
                  )
                }

                <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-500 ring-purple-300 rounded-lg hover:ring transition-colors">
                  {resumeData.public ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>

                <button onClick={downloadResume} className="flex items-center p-2 px-6 gap-2 text-xs bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600 ring-indigo-300 rounded-lg hover:ring transition-colors">
                  <Download className="size-4" /> Download
                </button>
              </div>

            </div>
            {/* resume preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />

          </div>
        </div>
      </div>
    </div >
  );
};

export default ResumeBuilder;
