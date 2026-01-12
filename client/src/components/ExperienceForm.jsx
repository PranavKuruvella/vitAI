import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {


  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const add = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `Enhace this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`

    try {
      const { data } = await api.post('api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })

      updateExperience(index, "description", data.enhancedContent)
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* actual Experience */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your professional experience.
          </p>
        </div>

        {/* Add Experience button */}
        <button
          onClick={add}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-all"
        >
          <Plus className="size-4 " />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet?</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  value={exp.company || ""}
                />
                <input
                  type="text"
                  placeholder="Job Title/Position"
                  className="px-3 py-2 text-sm rounded-lg"
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  value={exp.position || ""}
                />
                <input
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg "
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  value={exp.start_date || ""}
                />
                <input
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  value={exp.end_date || ""}
                  disabled={exp.is_current}
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.is_current || false}
                  onChange={(e) => { updateExperience(index, "is_current", e.target.checked ? true : false) }
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Currently Working here</span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label>Job Description</label>
                  <button onClick={() => generateDescription(index)} disabled={generatingIndex === index || !exp.position || !exp.company || !exp.description} className="flex items-center gap-1 px-2 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-all disabled:opacity-50">
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                  placeholder="Description your achievements!" rows={4}
                  value={exp.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                />

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
