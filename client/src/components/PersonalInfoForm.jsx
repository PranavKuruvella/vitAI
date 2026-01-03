import React from 'react'
import { BriefcaseBusiness, Github, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  // data: current form values | onChange: updates parent state
  // removeBackground: toggle state | setRemoveBackground: toggle updater


  const handleChange = (field, value) => { //change only the specific field
    onChange({ ...data, [field]: value });
  };


  const fields = [ //personal info lo teskuntuna fields
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
    { key: "github", label: "GitHub", icon: Github, type: "url" },
    { key: "website", label: "Website", icon: Globe, type: "url" },
  ]
  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with your Personal Information</p>

      <div className='flex items-center gap-2'>
        {/* image upload */}

        <label>
          {data.image ? (
            // Show uploaded image preview
            <img src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)} alt="user Image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
          ) : (
            // Show placeholder if no image
            <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
              <User className='size-10 p-2.5 border rounded-full' />
              Upload User Image
            </div>
          )}
          <input type="file" accept="image/jpeg, image/png" onChange={(e) => handleChange("image", e.target.files[0])} className='hidden' /> {/* label medha nokithe avthundhi uploading */}
        </label>

        {/* remove background manam upload chesthe the img become an object -- such that we can see this toggle ,, db nunchi osthe img is a string -- so we cant see toggle */}
        {
          typeof data.image === "object" && (
            <div className='flex flex-col gap-1 pl-4 text-sm'>
              <div className='flex flex-col gap-2'>
                <span className='text-gray-700 font-medium'>Remove Background</span>
                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3' >
                  <input type="checkbox" className='sr-only peer' onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground} />
                  <div className='w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-200'></div>
                  <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                </label>
              </div>
            </div>
          )
        }
      </div>

      {/* Loop through fields config to render inputs dynamically */}
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label htmlFor={field.key} className='flex items-center gap-2 text-sm font-medium text-gray-600'>
              <Icon className='size-4' />
              {field.label}
              {field.required && <span className='text-red-500'>*</span>}
            </label>
            <input type={field.type} id={field.key} value={data[field.key] || ""} onChange={(e) => handleChange(field.key, e.target.value)}
              className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm' placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} />

          </div>
        )
      })}
    </div>
  )
}

export default PersonalInfoForm
