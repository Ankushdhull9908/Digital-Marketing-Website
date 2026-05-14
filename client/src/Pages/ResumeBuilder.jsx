import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print"; 
import { ChevronLeft, Download, CheckCircle, Briefcase, GraduationCap, User, FileText, Zap, Eye, Plus, Trash2 } from "lucide-react";
const ResumeBuilder = () => {
  const { templateId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const resumeRef = useRef();

  // FIX: standard configuration for react-to-print
  const handlePrint = useReactToPrint({
    contentRef: resumeRef, // use contentRef for latest versions
    documentTitle: "Keshav_Goel_2515203_Resume",
  });

  // Wrapper to handle the alert after print attempt
  const handleDownload = () => {
    handlePrint();
    // Note: onAfterPrint is better handled inside the hook options if supported by your version
  };

  const [formData, setFormData] = useState({
    personal: {
      fname: "Keshav", lname: "Goel", email: "", phone: "Roll No: 2515203", address: "", city: "", profession: "Full Stack Developer",
    },
    summary: "",
    experience: [{ company: "", role: "", duration: "", desc: "" }],
    education: [{ school: "", degree: "", year: "" }],
    skills: ["React", "Tailwind", "Node.js"],
  });

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else if (section === "skills") {
        setFormData({ ...formData, skills: value.split(",").map(s => s.trim()) });
    } else {
      setFormData({
        ...formData,
        [section]: section === "summary" ? value : { ...formData[section], [field]: value },
      });
    }
  };

  const addField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeField = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const handleNext = () => {
    if (currentStep === 5) {
      handleDownload(); 
    } else {
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const steps = [
    { id: 1, name: "Heading", icon: <User size={20} /> },
    { id: 2, name: "Summary", icon: <FileText size={20} /> },
    { id: 3, name: "Experience", icon: <Briefcase size={20} /> },
    { id: 4, name: "Education", icon: <GraduationCap size={20} /> },
    { id: 5, name: "Skills", icon: <Zap size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 font-sans text-slate-900">
      <header className="border-b border-base-200 px-6 py-4 flex justify-between items-center bg-base-100 sticky top-0 z-[50] shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-[#3D7E8C] font-bold text-sm transition-colors">
            <ChevronLeft size={18} /> Back
          </Link>
          <div className="h-6 w-px bg-base-200"></div>
          <h1 className="font-black text-lg tracking-tight text-slate-800 uppercase">
           Resume Builder / <span className="text-[#3D7E8C]">{templateId?.replace("-", " ")}</span>
          </h1>
        </div>
        <button onClick={handleDownload} className="flex items-center gap-2 bg-[#F39221] hover:bg-[#d97f1a] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#F39221]/20 active:scale-95">
          <Download size={18} /> Download PDF
        </button>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
        <aside className="w-full lg:w-24 border-r border-base-200 bg-base-100 flex lg:flex-col items-center py-8 gap-6 overflow-x-auto">
          {steps.map((s) => (
            <button key={s.id} onClick={() => setCurrentStep(s.id)} className={`relative flex flex-col items-center justify-center transition-all min-w-[80px] p-2 rounded-2xl ${currentStep === s.id ? "text-[#3D7E8C] bg-base-200" : "text-base-400 hover:text-slate-600"}`}>
              <div className={`p-3 rounded-xl mb-1 transition-all ${currentStep === s.id ? "bg-[#3D7E8C] text-white shadow-lg shadow-[#3D7E8C]/30" : "bg-slate-100"}`}>{s.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-wider">{s.name}</span>
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-base-100">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <span className="text-[#F39221] font-black text-[10px] tracking-[0.3em] uppercase">Step {currentStep} of 5</span>
              <h2 className="text-4xl font-black text-base-content tracking-tight mt-1">{steps.find((s) => s.id === currentStep).name} <span className="text-[#3D7E8C]">Details</span></h2>
            </div>

            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
                {['fname', 'lname', 'profession', 'email', 'phone'].map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-base-content uppercase tracking-widest">{field.replace('fname', 'First Name').replace('lname', 'Last Name')}</label>
                    <input type="text" className="w-full p-4 bg-base-50 border border-base-200 rounded-2xl outline-none font-medium focus:border-[#3D7E8C] transition-colors" value={formData.personal[field]} onChange={(e) => handleChange("personal", field, e.target.value)} />
                  </div>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <label className="text-[11px] font-black text-base-content uppercase tracking-widest">Professional Summary</label>
                <textarea rows="6" className="w-full p-4 mt-2 bg-base-50  border border-base-200 rounded-2xl outline-none font-medium focus:border-[#3D7E8C] transition-colors" placeholder="Describe your career goals and achievements..." value={formData.summary} onChange={(e) => handleChange("summary", null, e.target.value)} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="p-6 border border-[#3D7E8C]/20 rounded-3xl bg-[#3D7E8C]/5 relative">
                    <button onClick={() => removeField("experience", index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="Company" className="p-3 rounded-xl border border-[#3D7E8C]/20 bg-base-50 outline-none focus:border-[#3D7E8C]" value={exp.company} onChange={(e) => handleChange("experience", "company", e.target.value, index)} />
                      <input placeholder="Role" className="p-3 rounded-xl border border-[#3D7E8C]/20 bg-base-50 outline-none focus:border-[#3D7E8C]" value={exp.role} onChange={(e) => handleChange("experience", "role", e.target.value, index)} />
                      <input placeholder="Duration" className="p-3 rounded-xl border border-[#3D7E8C]/20 bg-base-50 col-span-2 outline-none focus:border-[#3D7E8C]" value={exp.duration} onChange={(e) => handleChange("experience", "duration", e.target.value, index)} />
                    </div>
                  </div>
                ))}
                <button onClick={() => addField("experience", { company: "", role: "", duration: "", desc: "" })} className="text-[#3D7E8C] font-bold text-sm flex items-center gap-2"><Plus size={16}/> Add Experience</button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                {formData.education.map((edu, index) => (
                  <div key={index} className="p-6 border border-[#3D7E8C]/20 rounded-3xl bg-[#3D7E8C]/5 relative">
                    <button onClick={() => removeField("education", index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="School" className="p-3 rounded-xl border border-[#3D7E8C]/20 bg-base-50 outline-none" value={edu.school} onChange={(e) => handleChange("education", "school", e.target.value, index)} />
                      <input placeholder="Degree" className="p-3 rounded-xl border border-[#3D7E8C]/20 bg-base-50 outline-none" value={edu.degree} onChange={(e) => handleChange("education", "degree", e.target.value, index)} />
                      <input placeholder="Year" className="p-3 rounded-xl border border-[#3D7E8C]/20 bg-base-50 col-span-2 outline-none" value={edu.year} onChange={(e) => handleChange("education", "year", e.target.value, index)} />
                    </div>
                  </div>
                ))}
                <button onClick={() => addField("education", { school: "", degree: "", year: "" })} className="text-[#3D7E8C] font-bold text-sm flex items-center gap-2"><Plus size={16}/> Add Education</button>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <label className="text-[11px] font-black text-base-100 uppercase tracking-widest">Skills (Comma separated)</label>
                <input type="text" className="w-full p-4 mt-2 bg-base-50 border border-[#3D7E8C]/20 rounded-2xl outline-none font-medium" value={formData.skills.join(", ")} onChange={(e) => handleChange("skills", null, e.target.value)} />
              </div>
            )}

            <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-10">
              <button onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))} className={`font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 ${currentStep === 1 ? "invisible" : ""}`}>← Previous</button>
              
              {/* Added Next/Finish Button */}
              <button 
                onClick={handleNext} 
                className="bg-[#3D7E8C] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#2d5d67] transition-all shadow-lg shadow-[#3D7E8C]/20"
              >
                {currentStep === 5 ? "Finish & Download" : "Next Step →"}
              </button>
            </div>
          </div>
        </main>

        <aside className="hidden lg:flex flex-[1.2] bg-base-100 p-10 items-start justify-center overflow-y-auto border-l border-base-200">
          <div className="sticky top-0 w-full max-w-[600px] print:m-0 print:shadow-none">
            <div ref={resumeRef} className="bg-base-50 shadow-2xl min-h-[842px] w-full p-0 overflow-hidden rounded-sm border border-base-200">
              <div className="flex h-full min-h-[842px]">
                <div className="w-1/3 bg-[#3D7E8C] p-8 text-white flex flex-col justify-between">
                  <div className="mb-10">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl mb-6 border border-white/20 flex items-center justify-center text-3xl font-black uppercase">{formData.personal.fname?.[0] || "K"}</div>
                    <h2 className="text-xs font-black tracking-[0.2em] uppercase text-[#F39221] mb-2">Contact</h2>
                    <div className="space-y-3 text-[10px] font-medium text-slate-100 break-words">
                      <p>✉ {formData.personal.email || "keshav@example.com"}</p>
                      <p>📞 {formData.personal.phone || "Roll No: 2515203"}</p>
                      <p>📍 {formData.personal.city || "New Delhi, India"}</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xs font-black tracking-[0.2em] uppercase text-[#F39221] mb-4">Core Skills</h2>
                    <div className="flex flex-col gap-2">
                      {formData.skills.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold py-1 border-b border-white/10"><CheckCircle size={10} className="text-[#F39221]" /> {s}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-10">
                  <header className="mb-10">
                    <h1 className="text-5xl font-black tracking-tighter text-base-content leading-none">{formData.personal.fname || "KESHAV"} <br/><span className="text-[#3D7E8C]">{formData.personal.lname || "GOEL"}</span></h1>
                    <div className="h-1 w-12 bg-[#F39221] my-4"></div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">{formData.personal.profession}</p>
                  </header>

                  <section className="mb-8">
                    <h3 className="text-[10px] font-black uppercase text-[#3D7E8C] tracking-widest border-b-2 border-slate-100 pb-1 mb-4">Profile</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{formData.summary || "Passionate developer..."}</p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-[10px] font-black uppercase text-[#3D7E8C] tracking-widest border-b-2 border-slate-100 pb-1 mb-4">Experience</h3>
                    {formData.experience.map((exp, i) => (
                      <div key={i} className="mb-6">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-[12px] font-black text-slate-900 uppercase">{exp.role || "Role"}</h4>
                          <span className="text-[9px] font-black text-[#F39221]">{exp.duration}</span>
                        </div>
                        <p className="text-[10px] font-bold text-[#3D7E8C] mb-2">{exp.company || "Company"}</p>
                      </div>
                    ))}
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black uppercase text-[#3D7E8C] tracking-widest border-b-2 border-slate-100 pb-1 mb-4">Education</h3>
                    {formData.education.map((edu, i) => (
                      <div key={i} className="flex justify-between mb-4">
                        <div>
                          <h4 className="text-[11px] font-black text-slate-900 uppercase">{edu.degree || "Degree"}</h4>
                          <p className="text-[10px] text-slate-500">{edu.school || "School"}</p>
                        </div>
                        <span className="text-[9px] font-black text-slate-400">{edu.year}</span>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-[#3D7E8C] font-black text-[10px] uppercase tracking-widest">
              <Eye size={14} /> Live Smart Sync Active
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ResumeBuilder;
