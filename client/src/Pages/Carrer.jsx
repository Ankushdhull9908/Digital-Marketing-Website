import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  Clock, 
  Compass, 
  Terminal, 
  Heart,  
  Zap, 
  ChevronRight,
  X
} from "lucide-react";

const Career = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [activeJobModal, setActiveJobModal] = useState(null);

  const departments = ["All", "Engineering", "Design", "Marketing"];

  const benefits = [
    { title: "Cutting-Edge Tech Stack", desc: "Work closely with React 18, Tailwind, and canvas engines on production frameworks.", icon: Terminal, color: "text-[#3D7E8C]" },
    { title: "Flexible Work Culture", desc: "We support output over clock-ins. Manage your sprint checkpoints autonomously.", icon: Compass, color: "text-[#F39221]" },
    { title: "Health & Wellness", desc: "Complete medical coverage packages alongside flexible annual leaves and downtime credits.", icon: Heart, color: "text-emerald-400" },
    { title: "Continuous Learning", desc: "Stipends for developer bootcamps, tech documentation access, and engineering resources.", icon: Zap, color: "text-amber-400" },
  ];

  const openPositions = [
    {
      id: "JOB-01",
      title: "Senior Front-End Engineer (React)",
      dept: "Engineering",
      type: "Full-Time",
      location: "Remote (India)",
      salary: "₹18L - ₹24L",
      summary: "We are looking for an absolute UI expert skilled in building high-fidelity visual web interfaces with pixel-perfect responsive execution.",
      requirements: ["3+ years production React experience", "Expert knowledge of Tailwind CSS and layout architectures", "Familiarity with Framer Motion, HTML5 Canvas, or complex animation structures"]
    },
    {
      id: "JOB-02",
      title: "UI/UX Product Designer",
      dept: "Design",
      type: "Full-Time",
      location: "Hybrid (Delhi NCR)",
      salary: "₹12L - ₹16L",
      summary: "Shape the comprehensive branding, landing structures, and dashboard logic interfaces across our scaling web agency platform solutions.",
      requirements: ["Strong portfolio highlighting web service interfaces", "Figma design system engineering fluency", "In-depth understanding of visual layouts and conversion aesthetics"]
    },
    {
      id: "JOB-03",
      title: "Growth Marketing Specialist",
      dept: "Marketing",
      type: "Contract / Remote",
      location: "Remote",
      salary: "₹8L - ₹12L",
      summary: "Drive performance marketing campaigns, optimize structural SEO tracks, and manage core B2B client acquisition systems.",
      requirements: ["Proven record scaling SaaS or digital service channels", "Deep knowledge of SEO frameworks and digital ad metrics", "Exceptional copy writing and interactive conversion optimization skills"]
    }
  ];

  const filteredPositions = selectedDepartment === "All" 
    ? openPositions 
    : openPositions.filter(job => job.dept === selectedDepartment);

  return (
    <div className="min-h-screen bg-base-100 text-slate-100 font-sans overflow-x-hidden">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative py-32 px-6 overflow-hidden border-b bg-slate-800 border-slate-900">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop')` }}
        />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#3D7E8C]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F39221]/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#3D7E8C]/10 border border-[#3D7E8C]/30 text-[#3D7E8C] text-xs font-black uppercase tracking-widest mb-6">
            Join the Ecosystem
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight text-white">
            Build the Future of <br className="hidden md:inline" />
            WebTech <span className="text-[#F39221] italic">With Us.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            We don't look for traditional corporate checkmarks. We look for builders, gamers, and developers passionate about forging flawless digital products.
          </p>
          <div className="mt-10">
            <a href="#positions" className="bg-[#3D7E8C] hover:bg-[#326975] text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-lg shadow-[#3D7E8C]/10">
              Explore Openings <Briefcase size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CULTURE & BENEFITS SECTIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto ">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight  text-base-content">
            Why You'll Love It <span className="text-[#3D7E8C]">Here</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#F39221] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const IconComponent = b.icon;
            return (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800/60 flex flex-col gap-4 relative group">
                <div className={`p-3.5 rounded-xl bg-slate-950 border border-slate-800/40 w-fit ${b.color}`}>
                  <IconComponent size={22} />
                </div>
                <h3 className="text-lg font-black text-white mt-2 tracking-tight">{b.title}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE JOB LISTINGS SECTION */}
      <section id="positions" className="py-24 px-6 bg-base-300/30 border-t border-slate-900">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">Open Positions</h2>
              <p className="text-slate-500 text-xs font-semibold mt-1 uppercase tracking-wider">Find your path inside our engineering channels</p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedDepartment === dept 
                      ? "bg-[#F39221] text-black shadow-md" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Stack Array Wrapper */}
          <div className="space-y-4">
            {filteredPositions.map((job) => (
              <motion.div
                key={job.id}
                layoutId={`job-card-${job.id}`}
                onClick={() => setActiveJobModal(job)}
                className="p-6 md:p-8 rounded-2xl bg-[#27717e] border border-slate-800/60 hover:border-[#3D7E8C]/60 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded bg-[#3D7E8C]/10 text-gray-300 uppercase tracking-wider">{job.dept}</span>
                    <span className="text-base-content font-mono text-xs">{job.id}</span>
                  </div>
                  <h3 className="text-xl font-black text-base-content   group-hover:text-[#F39221] transition-colors tracking-tight">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-300" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-slate-500" /> {job.type}</span>
                  </div>
                </div>
                <button className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:bg-[#F39221] group-hover:text-black transition-all self-end md:self-auto">
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            ))}

            {filteredPositions.length === 0 && (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 font-medium">
                No active requirements in this department right now. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. MODAL DETAILED CAREER EXPANSION PANELS */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJobModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div 
              layoutId={`job-card-${activeJobModal.id}`}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl z-10 max-h-[85vh] overflow-y-auto text-slate-300"
            >
              <button 
                onClick={() => setActiveJobModal(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-[#F39221] transition-colors"
              >
                <X size={24} />
              </button>

              <span className="text-xs font-black px-3 py-1 rounded bg-[#3D7E8C]/10 text-[#3D7E8C] uppercase tracking-wider">{activeJobModal.dept}</span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3 mb-2">{activeJobModal.title}</h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#F39221] border-b border-slate-800 pb-6 mb-6">
                <span>📍 {activeJobModal.location}</span>
                <span>• 💼 {activeJobModal.type}</span>
                <span>• 💰 {activeJobModal.salary}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-2">Role Overview</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{activeJobModal.summary}</p>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-2">Core Requirements</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400 font-medium">
                    {activeJobModal.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Quick Application Intake</h4>
                  <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-[#3D7E8C] text-slate-100 text-xs font-medium transition-all"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-[#3D7E8C] text-slate-100 text-xs font-medium transition-all"
                    />
                    <input 
                      type="text" 
                      placeholder="Portfolio Link / GitHub URL" 
                      className="w-full sm:col-span-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-[#F39221] text-slate-100 text-xs font-medium transition-all"
                    />
                    <button 
                      type="submit" 
                      className="w-full sm:col-span-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-[#F39221] text-black hover:bg-[#ed9a3b] transition-all shadow-lg"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Career;
