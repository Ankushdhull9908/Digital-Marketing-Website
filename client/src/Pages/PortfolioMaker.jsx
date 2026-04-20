import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Eye, Download, User, Briefcase, 
  Code, Mail, Palette, ArrowRight, ExternalLink 
} from "lucide-react";

const PortfolioMaker = () => {
  const { templateId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State for all 5 pages of content
  const [data, setData] = useState({
    name: "Keshav Goel",
    profession: "Web Developer",
    bio: "I craft high-performance web applications with a focus on user experience.",
    skills: ["React", "Tailwind CSS", "Node.js"],
    projects: [
      { title: "E-Commerce App", desc: "A full-stack shopping platform." },
      { title: "Portfolio Engine", desc: "A tool to generate websites." }
    ],
    contact: "contact@keshav.dev",
    rollNumber: "2515203"
  });

  // Dynamic Themes based on Profession
  const getTheme = () => {
    switch (data.profession) {
      case "Web Developer": 
        return { bg: "bg-slate-900", text: "text-white", accent: "bg-emerald-500", font: "font-mono" };
      case "Designer": 
        return { bg: "bg-white", text: "text-slate-900", accent: "bg-purple-600", font: "font-serif" };
      case "Marketing": 
        return { bg: "bg-orange-50", text: "text-slate-800", accent: "bg-[#F39221]", font: "font-sans" };
      default: 
        return { bg: "bg-white", text: "text-slate-900", accent: "bg-[#3D7E8C]", font: "font-sans" };
    }
  };

  const theme = getTheme();

  // PDF Download Logic (Using Browser Print to PDF)
  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = `${data.name}_Portfolio`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-montserrat overflow-hidden">
      
      {/* --- TOP BAR (Hidden during Print) --- */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/templates" className="hover:text-[#F39221] transition-colors"><ChevronLeft /></Link>
          <h1 className="font-black text-sm uppercase tracking-widest">Editor v2.0</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn btn-ghost btn-sm">
            {isSidebarOpen ? "Hide Controls" : "Show Controls"}
          </button>
          <button onClick={handleDownloadPDF} className="btn btn-sm bg-slate-900 text-white hover:bg-black border-none gap-2">
            <Download size={16} /> Save as PDF
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* --- SIDEBAR CONTROLS (Hidden during Print) --- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              initial={{ x: -300 }} 
              animate={{ x: 0 }} 
              exit={{ x: -300 }}
              className="w-80 bg-white border-r border-slate-200 flex flex-col print:hidden"
            >
              <div className="p-6 space-y-6 overflow-y-auto">
                <section>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Step 1: Basics</label>
                  <input 
                    className="input input-bordered w-full mt-2" 
                    value={data.name} 
                    onChange={(e) => setData({...data, name: e.target.value})} 
                  />
                  <select 
                    className="select select-bordered w-full mt-2"
                    value={data.profession}
                    onChange={(e) => setData({...data, profession: e.target.value})}
                  >
                    <option>Web Developer</option>
                    <option>Designer</option>
                    <option>Marketing</option>
                  </select>
                </section>

                <section>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Step 2: Projects</label>
                  <input 
                    className="input input-bordered w-full mt-2" 
                    placeholder="Project Title"
                    value={data.projects[0].title} 
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[0].title = e.target.value;
                      setData({...data, projects: newProjects});
                    }}
                  />
                </section>

                <section>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Step 3: Contact</label>
                  <input 
                    className="input input-bordered w-full mt-2" 
                    value={data.contact} 
                    onChange={(e) => setData({...data, contact: e.target.value})} 
                  />
                </section>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* --- MAIN PREVIEW CANVAS --- */}
        <main className="flex-1 bg-slate-200 p-4 md:p-12 overflow-y-auto print:p-0 print:bg-white">
          <div id="portfolio-content" className={`w-full max-w-4xl mx-auto shadow-2xl print:shadow-none min-h-[1200px] ${theme.bg} ${theme.text} ${theme.font} transition-all duration-700`}>
            
            {/* PAGE 1: HERO (NAME) */}
            <section className="h-screen flex flex-col justify-center items-center text-center p-20">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <div className={`w-20 h-1 mb-10 mx-auto ${theme.accent}`} />
                <h1 className="text-8xl font-black tracking-tighter mb-4">{data.name}</h1>
                <p className="text-xl uppercase tracking-[0.4em] opacity-60">{data.profession}</p>
              </motion.div>
            </section>

            {/* PAGE 2: PROFESSION & BIO */}
            <section className="min-h-screen flex flex-col justify-center p-20 border-t border-white/10">
              <h2 className="text-5xl font-black mb-10 italic">About Me</h2>
              <p className="text-3xl leading-tight max-w-2xl">{data.bio}</p>
              <div className="flex gap-4 mt-12">
                {data.skills.map(s => <span key={s} className={`px-6 py-2 rounded-full border border-current opacity-50`}>{s}</span>)}
              </div>
            </section>

            {/* PAGE 3: PROJECTS */}
            <section className="min-h-screen p-20 border-t border-white/10">
              <h2 className="text-5xl font-black mb-20">Selected Work</h2>
              <div className="grid grid-cols-1 gap-20">
                {data.projects.map((p, i) => (
                  <div key={i} className="group cursor-pointer">
                    <p className="text-sm opacity-50 mb-2">0{i+1} — PROJECT</p>
                    <h3 className="text-6xl font-bold group-hover:pl-4 transition-all duration-500">{p.title}</h3>
                    <p className="text-xl mt-4 opacity-70">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PAGE 4: CREDENTIALS */}
            <section className="h-screen flex flex-col justify-center items-center p-20 border-t border-white/10">
                <div className="text-center">
                    <h2 className="text-sm uppercase tracking-widest opacity-40 mb-4">Academic ID</h2>
                    <p className="text-6xl font-black tracking-widest">{data.rollNumber}</p>
                </div>
            </section>

            {/* PAGE 5: CONTACT */}
            <section className="h-screen flex flex-col justify-center items-center p-20 border-t border-white/10 relative overflow-hidden">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute text-[20rem] font-black opacity-[0.03] whitespace-nowrap">
                HELLO HELLO HELLO
              </motion.div>
              <h2 className="text-7xl font-black mb-10 z-10">Let's Talk.</h2>
              <a href={`mailto:${data.contact}`} className="text-2xl border-b-2 border-current z-10">{data.contact}</a>
            </section>

          </div>
        </main>
      </div>

      {/* --- PRINT CSS --- */}
      <style>{`
        @media print {
          .no-scrollbar { overflow: visible !important; }
          body { background: white !important; }
          @page { margin: 0; size: auto; }
          section { page-break-after: always; height: 100vh !important; }
        }
      `}</style>
    </div>
  );
};

export default PortfolioMaker;