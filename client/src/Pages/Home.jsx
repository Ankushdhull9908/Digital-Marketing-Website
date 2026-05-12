import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Share2, Layout, MapPin, ArrowRight, Zap, Target,
  BarChart, Users, Briefcase, Globe, ChevronDown, Check,PenTool , Palette ,Rocket
} from "lucide-react";
import Webthech from "../Components/Webthech";
import ResultHero from "../Components/ResultHero";
// ← pulls faqs, packages, clients
import { useAuth } from "../context/Context";
const Home = () => {
  const { faqs, packages, clients, loading } = useAuth();
  const { hash } = useLocation();

  console.log('FAQS')
const carouselImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
   "https://i.pinimg.com/736x/fd/51/50/fd515007f2f92de868516ea503897c91.jpg",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
  ];
const [currentIndex, setCurrentIndex] = useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);
  // ── animation variants ───────────────────────────────────────────────────
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerContainer = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  
useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Timeout ensures the DOM is fully rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);
  const nav = useNavigate();

  const services = [
    { title: "Search Engine Optimization (SEO)", desc: "Rank your website on top of Google and get organic traffic.",        icon: <Search />,   color: "text-[#3D7E8C]",   bg: "bg-[#3D7E8C]/10" ,link:"/WhySEO" },
    { title: "Google Ads (PPC Services)",         desc: "Get instant leads and sales with highly targeted ad campaigns.",     icon: <Target />,   color: "text-[#F39221]",   bg: "bg-[#F39221]/10" ,link:"/OurServices#special-section" },  
    { title: "Social Media Marketing (SMM)",      desc: "Increase brand awareness on platforms like Instagram and LinkedIn.", icon: <Share2 />,   color: "text-blue-500",    bg: "bg-blue-50"       ,link:"/OurServices#special-section" },
    { title: "Web Architecture",                  desc: "We create responsive, fast, and user-friendly websites.",           icon: <Layout />,   color: "text-purple-500",  bg: "bg-purple-50"     ,link:"/OurServices#special-section" },
    { title: "Local SEO Services",                desc: "Become the #1 choice in your neighborhood and city.",               icon: <MapPin />,   color: "text-red-500",     bg: "bg-red-50"        ,link:"/WhySEO" },
    { title: "Growth Analytics",                  desc: "Dominate your local market and attract nearby customers.",           icon: <BarChart />, color: "text-emerald-500", bg: "bg-emerald-50"    ,link:"/OurServices#special-section" },
  ];

  return (
    <div className="bg-[#F8FAFB] text-slate-800 min-h-screen font-montserrat overflow-x-hidden selection:bg-[#F39221]/30 no-scrollbar">
 {/* ── TOP CAROUSEL & BANNERS ────────────────────────────────────────── */}
   <div className="w-full relative overflow-hidden ">
  <div className="relative w-full md:w-[100%]  h-[300px] md:h-[450px] lg:h-[600px] overflow-hidden shadow-2xl  bg-slate-200">
    
    <AnimatePresence mode="wait">
      <motion.img
        key={currentIndex}
        src={carouselImages[currentIndex]}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </AnimatePresence>
    
    {/* Overlay Content */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-center p-6 md:p-24">
      <div className="max-w-[1600px] mx-auto w-full">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#3D7E8C] font-black tracking-[0.3em] text-[10px] md:text-sm uppercase mb-2 md:mb-4 block"
        >
          Premium Agency Experience
        </motion.span>
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-3xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9]"
        >
          EMPOWERING <br />
          <span className="text-[#F39221] not-italic">DIGITAL</span> BRANDS.
        </motion.h2>
      </div>
    </div>

    {/* Indicators - Adjusted for better mobile visibility */}
    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 flex items-center gap-2 md:gap-3 bg-black/20 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full">
      {carouselImages.map((_, i) => (
        <button 
          key={i} 
          onClick={() => setCurrentIndex(i)}
          className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
            i === currentIndex ? "w-8 md:w-12 bg-[#F39221]" : "w-2 md:w-3 bg-white/30 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  </div>

    {/* Stylish Modern Indicators */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full">
      {carouselImages.map((_, i) => (
        <button 
          key={i} 
          onClick={() => setCurrentIndex(i)}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i === currentIndex ? "w-12 bg-[#F39221]" : "w-3 bg-white/30 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  </div>


       
    
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-r from-[#3D7E8C]/10 to-[#F39221]/10 blur-3xl rounded-full -z-10"
        />
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-6xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-8">
            <Zap className="w-4 h-4 text-[#F39221]" fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">The Future of Growth</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D7E8C] to-[#3D7E8C]/70">Digital</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F39221] to-orange-400">Empire.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-10">
            Webtech Services is a leading digital marketing company in Delhi, delivering measurable results through strategy and creativity.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" >
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-[#3D7E8C] text-white rounded-2xl font-bold shadow-lg shadow-[#3D7E8C]/30 flex items-center gap-2 group">
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            </Link>
            <motion.button whileHover={{ backgroundColor: "#f1f5f9" }} className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-bold border border-slate-200 transition-colors">
              View Case Studies
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

{/* ── ULTRA-CAPACITY PROFESSIONAL TOOLS (600px+ HEIGHT) ─────────────────────────────────────────── */}
<motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="py-32 px-6 relative bg-white overflow-hidden"
>
  <div className="max-w-7xl mx-auto">
    
    <div className="text-center mb-24">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="inline-block px-6 py-2 rounded-full bg-slate-100 text-[#3D7E8C] text-[11px] font-black uppercase tracking-[0.4em] mb-6"
      >
        Elite Creator Suite
      </motion.div>
      <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D7E8C] to-[#F39221]">Build Tools.</span>
      </h2>
      <p className="text-slate-500 font-bold text-xl max-w-3xl mx-auto leading-relaxed">
        Free resources to kickstart your professional journey.
      </p>
    </div>

    {/* Grid with Ultra-Height Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { 
          to: "/resume-builder", 
          icon: <PenTool size={36} />, 
          title: "Resume Builder", 
          desc: "Engineered for the modern job market to beat automated screening systems.",
          benefit: "Designed to help you bypass HR filters and secure interviews at top-tier tech firms.",
          color: "#3D7E8C" 
        },
        { 
          to: "/portfolio-maker/:templateId", 
          icon: <Palette size={36} />, 
          title: "Portfolio Maker", 
          desc: "A visual-first builder designed to showcase your best work to high-ticket clients.",
          benefit: "Build a high-end visual presence that justifies premium rates and attracts high-ticket clients.",
          color: "#F39221", 
          hot: true 
        },
        { 
          to: "/influencer-form", 
          icon: <Users size={36} />, 
          title: "Influencer Hub", 
          desc: "Bridging the gap between creative talent and premium brand partnerships.",
          benefit: "Streamline your collaboration process and professionalize your creator-to-brand pitch.",
          color: "#60A5FA" 
        },
        { 
          to: "/jobportal", 
          icon: <Briefcase size={36} />, 
          title: "Job Portal", 
          desc: "Curated opportunities from startups to Fortune 500 companies worldwide.",
          benefit: "Access a private ecosystem of high-growth roles that aren't advertised on mainstream sites.",
          color: "#34D399" 
        },
        { 
          to: "https://www.hostinger.com/in/free-domain?utm_id=381673073&msclkid=5b0f7f6e5c631613eac0168be30069bd&utm_source=bing&utm_medium=cpc&utm_campaign=Brand-Exact|NT:Bing|LO:IN&utm_term=hostinger&utm_content=Exact+|+Hostinger" , 
          icon: <Globe size={36} />, 
          title: "Domain Engine", 
          desc: "Secure your digital identity with a unique address and professional email.",
          benefit: "Protect your intellectual property and establish instant credibility with a custom URL.",
          color: "#A78BFA" 
        },
        { 
          to: "/landingpage", 
          icon: <Rocket size={36} />, 
          title: "Launchpad", 
          desc: "High-conversion storefronts optimized for speed and mobile engagement.",
          benefit: "Turn cold traffic into loyal customers with high-speed, conversion-optimized architecture.",
          color: "#F43F5E" 
        },
      ].map((tool, idx) => {
        const isExternal = tool.to.startsWith('http');
        
        // Define the common classes for the card style
        const cardClasses = "group relative flex flex-col h-full min-h-[620px] bg-slate-950 p-12 rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-[#00000040]";

        return (
          <motion.div
            key={idx}
            whileHover={{ y: -15 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="h-full"
          >
            {isExternal ? (
              <a href={tool.to} target="_blank" rel="noopener noreferrer" className={cardClasses}>
                {/* Visual Depth - Top Gradient */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                {/* Corner Accent Glow */}
                <div 
                  className="absolute -top-24 -right-24 w-64 h-50 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" 
                  style={{ backgroundColor: tool.color }} 
                />

                {tool.hot && (
                  <div className="absolute top-10 right-12 bg-[#F39221] text-black text-[11px] font-black px-5 py-2 rounded-full shadow-2xl tracking-[0.2em] z-20">
                    ELITE TOOL
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-12 w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.07] group-hover:border-white/20 transition-all duration-500">
                    <div style={{ color: tool.color }} className="group-hover:scale-110 transition-transform duration-500">
                      {tool.icon}
                    </div>
                  </div>

                  <h4 className="text-3xl font-black text-white mb-6 tracking-tight">{tool.title}</h4>
                  <p className="text-slate-400 text-base leading-relaxed mb-6 font-medium">{tool.desc}</p>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border-l-4 " style={{ borderColor: tool.color }}>
                    <p className="text-xs font-bold text-slate-300 italic">"{tool.benefit}"</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">Status</span>
                      <span className="text-xs font-bold text-[#34D399] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" /> Live Now
                      </span>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white/[0.05] flex items-center justify-center group-hover:bg-[#F39221] transition-all duration-500">
                       <ArrowRight size={24} className="text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <Link to={tool.to} className={cardClasses}>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                <div 
                  className="absolute -top-24 -right-24 w-64 h-50 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" 
                  style={{ backgroundColor: tool.color }} 
                />

                {tool.hot && (
                  <div className="absolute top-10 right-12 bg-[#F39221] text-black text-[11px] font-black px-5 py-2 rounded-full shadow-2xl tracking-[0.2em] z-20">
                    ELITE TOOL
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-12 w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.07] group-hover:border-white/20 transition-all duration-500">
                    <div style={{ color: tool.color }} className="group-hover:scale-110 transition-transform duration-500">
                      {tool.icon}
                    </div>
                  </div>

                  <h4 className="text-3xl font-black text-white mb-6 tracking-tight">{tool.title}</h4>
                  <p className="text-slate-400 text-base leading-relaxed mb-6 font-medium">{tool.desc}</p>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border-l-4 " style={{ borderColor: tool.color }}>
                    <p className="text-xs font-bold text-slate-300 italic">"{tool.benefit}"</p>
                  </div>

                  <div className="mt-6  border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">Status</span>
                      <span className="text-xs font-bold text-[#34D399] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" /> Live Now
                      </span>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white/[0.05] flex items-center justify-center group-hover:bg-[#F39221] transition-all duration-500">
                       <ArrowRight size={24} className="text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
</motion.section>

      {/* ── CORE SERVICES ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
            <h2 className="text-[#F39221] font-black uppercase tracking-[0.3em] text-sm mb-4">Our Core Services</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Digital Marketing Solutions</h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${service.bg} rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500`}></div>
                <div className={`w-14 h-14 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-8`}>
                  {React.cloneElement(service.icon, { size: 28, strokeWidth: 2.5 })}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-800">{service.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium mb-6">{service.desc}</p>
                <Link to={service.link} className="text-sm font-bold text-[#3D7E8C] flex items-center gap-2 group-hover:gap-3 transition-all" >
                  Learn more <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      {/* ── CLIENTS ──────────────────────────────────────────────────────── */}
      {!loading && clients.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-[#F39221] font-black uppercase tracking-[0.3em] text-sm mb-4">Trusted By</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Clients</h3>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center items-center gap-8"
            >
              {clients.map((client) => (
                <motion.a
                  key={client._id}
                  href={client.websiteUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.08 }}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all duration-300 w-36"
                >
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#3D7E8C]/10 flex items-center justify-center text-[#3D7E8C] font-black text-lg">
                      {client.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-500 text-center group-hover:text-slate-800 transition-colors">
                    {client.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      )}

     
      <Webthech />
      <ResultHero />
    </div>
  );
};

// ── FAQ accordion — extracted for clarity ────────────────────────────────────
function FAQSection({ faqs, fadeInUp, staggerContainer }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="py-24 px-6 bg-slate-900 rounded-[3rem] mx-4 my-10 text-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-[#F39221] font-black uppercase tracking-[0.3em] text-sm mb-4">Got Questions?</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h3>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq._id;
            return (
              <motion.div key={faq._id} variants={fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : faq._id)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left gap-4"
                >
                  <span className="font-semibold text-white text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#F39221] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-7 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
