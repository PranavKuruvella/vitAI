import React from "react";
import { Loader, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
const ProfessionalSummary = ({ data, onChange }) => {


  const { token } = useSelector((state) => state.auth);
  const [isGeneration, setIsGeneration] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGeneration(true)
      const prompt = `enhace my professional summary : "${data}"`
      const response = await api.post("/api/ai/enhance-pro-sum", { userContent: prompt }, { headers: { Authorization: `${token}` } })
      onChange(response.data.enhancedContent)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to enhance summary")
    }
    finally {
      setIsGeneration(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* actual Summary */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add your professional summary.
          </p>
        </div>

        {/* AI enhance button */}
        <button disabled={isGeneration} onClick={generateSummary} className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-all">
          {isGeneration ? <Loader className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {isGeneration ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      {/* text area for summary */}
      <div className="mt-6">
        <textarea
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500  outline-none transition-colors resize-none"
          placeholder="Write your professional summary to highlight your skills and experience..."
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-sm text-gray-500 max-w-4/5 mx-auto text-center">Tip: keep it small (3-4 sentences) and focus on your relevent achievements and experiences.</p>
        {/* adding summary avvatle!!! -- 3.53.21 */}
      </div>
    </div>
  );
};

export default ProfessionalSummary;
