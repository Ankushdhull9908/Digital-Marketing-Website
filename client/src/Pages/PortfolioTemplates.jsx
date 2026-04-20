import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Sparkles, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioTemplates = () => {
  const templates = [
    { 
      id: 1, 
      name: "Nexus Developer", 
      category: "Engineered for Tech", 
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
      tag: "Most Popular",
      accent: "border-cyan-500/20"
    },
    { 
      id: 2, 
      name: "Canvas Artist", 
      category: "Designed for Visionaries", 
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800",
      tag: "Creative Choice",
      accent: "border-purple-500/20"
    },
    { 
      id: 3, 
      name: "Apex Business", 
      category: "Built for Results", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      tag: "Pro Series",
      accent: "border-orange-500/20"
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-montserrat overflow-hidden">
      
      {/* --- DESIGNER BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-orange-50 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* --- MODERN HERO SECTION -- */}
        <header className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-[#3D7E8C] font-bold text-sm tracking-[0.2em] uppercase mb-6"
          >
            <div className="h-[2px] w-8 bg-[#3D7E8C]" />
            Template Gallery
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            Design that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D7E8C] to-[#F39221]">
              Speaks Louder.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-500 font-medium leading-relaxed"
          >
            Ditch the generic. Choose a high-fidelity template curated for the next generation of web professionals.
          </motion.p>
        </header>

        {/* --- TEMPLATES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {templates.map((template, idx) => (
            <motion.div 
              key={template.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative group p-4 rounded-[3rem] border ${template.accent} bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-500`}
            >
              {/* IMAGE WRAPPER */}
              <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                
                {/* Floating Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-xl">
                  {template.tag}
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-circle bg-white text-slate-900 border-none shadow-2xl"
                  >
                    <Eye size={20} />
                  </motion.button>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="px-4 pb-4">
                <p className="text-[#3D7E8C] font-bold text-xs uppercase tracking-widest mb-2">
                  {template.category}
                </p>
                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                  {template.name}
                </h2>
                
               <Link 
  to={`/portfolio-maker/${template.id}`} 
  className="flex items-center gap-4 text-slate-900 font-black group/btn"
>
  <span className="bg-slate-900 text-white p-3 rounded-full group-hover/btn:bg-[#F39221] transition-colors">
    <ArrowRight size={20} />
  </span>
  <span className="text-sm border-b-2 border-transparent group-hover/btn:border-[#F39221] transition-all">
    START PROJECT
  </span>
</Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- MODERN FEATURE SECTION --- */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-20">
            <div className="flex flex-col gap-4">
                <Zap className="text-[#F39221]" size={32} />
                <h4 className="font-black text-xl">Rapid Deployment</h4>
                <p className="text-slate-500 text-sm font-medium">From zero to live in under 10 minutes with our optimized builder.</p>
            </div>
            <div className="flex flex-col gap-4">
                <Layers className="text-[#3D7E8C]" size={32} />
                <h4 className="font-black text-xl">Modular Components</h4>
                <p className="text-slate-500 text-sm font-medium">Mix and match sections effortlessly to create a unique flow.</p>
            </div>
            <div className="flex flex-col gap-4">
                <Sparkles className="text-purple-500" size={32} />
                <h4 className="font-black text-xl">High Fidelity</h4>
                <p className="text-slate-500 text-sm font-medium">Pixel-perfect designs that look stunning on any screen size.</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PortfolioTemplates;
