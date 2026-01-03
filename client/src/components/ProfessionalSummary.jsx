import React from "react";
import { Sparkles } from "lucide-react";
const ProfessionalSummary = ({ data, onChange }) => {
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
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-all">
          <Sparkles className="size-4 " />
          AI enhance
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
