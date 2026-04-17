import React from "react";
import ModernTemplate from "../assets/templates/ModernTemplate.jsx";
import ClassicTemplate from "../assets/templates/ClassicTemplate.jsx";
import LaTexTemplate from "../assets/templates/LaTeXTemplate.jsx";
import MinimalTemplate from "../assets/templates/MinimalTemplate.jsx";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate.jsx";
import TemplateTwo from "../assets/templates/TemplateTwo.jsx";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "latex":
        return <LaTexTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      case "template-two":
        return <TemplateTwo data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}
      >
        {/* template Render */}
        {renderTemplate()}
      </div>

      <style>{`
        @page {
          size: letter;
          margin: 0;
        }
        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            height: auto;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}
      </style>

    </div>
  );
};

export default ResumePreview;
