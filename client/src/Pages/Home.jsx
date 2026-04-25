import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Share2, Layout, MapPin, ArrowRight, Zap, Target,
  BarChart, Users, Briefcase, Globe, ChevronDown, Check,
} from "lucide-react";
import Webthech from "../Components/Webthech";
import ResultHero from "../Components/ResultHero";
// ← pulls faqs, packages, clients
import { useAuth } from "../context/Context";

const Home = () => {
  const { faqs, packages, clients, loading } = useAuth();


  console.log('FAQS')

  // ── animation variants ───────────────────────────────────────────────────
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerContainer = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const nav = useNavigate();

  const services = [
    { title: "Search Engine Optimization (SEO)", desc: "Rank your website on top of Google and get organic traffic.",        icon: <Search />,   color: "text-[#3D7E8C]",   bg: "bg-[#3D7E8C]/10"  },
    { title: "Google Ads (PPC Services)",         desc: "Get instant leads and sales with highly targeted ad campaigns.",     icon: <Target />,   color: "text-[#F39221]",   bg: "bg-[#F39221]/10"  },
    { title: "Social Media Marketing (SMM)",      desc: "Increase brand awareness on platforms like Instagram and LinkedIn.", icon: <Share2 />,   color: "text-blue-500",    bg: "bg-blue-50"       },
    { title: "Web Architecture",                  desc: "We create responsive, fast, and user-friendly websites.",           icon: <Layout />,   color: "text-purple-500",  bg: "bg-purple-50"     },
    { title: "Local SEO Services",                desc: "Become the #1 choice in your neighborhood and city.",               icon: <MapPin />,   color: "text-red-500",     bg: "bg-red-50"        },
    { title: "Growth Analytics",                  desc: "Dominate your local market and attract nearby customers.",           icon: <BarChart />, color: "text-emerald-500", bg: "bg-emerald-50"    },
  ];

  return (
    <div className="bg-[#F8FAFB] text-slate-800 min-h-screen font-montserrat overflow-x-hidden selection:bg-[#F39221]/30 no-scrollbar">

      {/* ── FEATURED BUILD TOOLS ─────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 px-6 bg-slate-900 rounded-[3rem] mx-4 my-10 text-white relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Professional Build Tools</h2>
          <p className="text-slate-400 font-medium mb-16">Free resources to kickstart your professional journey.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/resume-builder" className="block h-full bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2rem] hover:bg-white/10">
                <div className="text-5xl mb-6">📝</div>
                <h4 className="text-2xl font-bold mb-2 text-[#3D7E8C]">Resume Builder</h4>
                <p className="text-slate-400 text-sm mb-6">Create high-performance, ATS-friendly resumes.</p>
                <div className="w-12 h-1 bg-[#3D7E8C] rounded-full"></div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Link to="/PortfolioTemplates" className="block h-full bg-white/5 backdrop-blur-lg border border-orange-500/50 p-10 rounded-[2rem] hover:bg-white/10">
                <div className="absolute top-4 right-6 bg-[#F39221] text-xs font-black px-3 py-1 rounded-full text-black">HOT</div>
                <div className="text-5xl mb-6">💼</div>
                <h4 className="text-2xl font-bold mb-2 text-[#F39221]">Portfolio Maker</h4>
                <p className="text-slate-400 text-sm mb-6">Stunning visual portfolios designed to convert.</p>
                <div className="w-12 h-1 bg-[#F39221] rounded-full"></div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/influencer-form" className="block h-full bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2rem] hover:bg-white/10">
                <Users className="w-12 h-12 mb-6 text-blue-400" />
                <h4 className="text-2xl font-bold mb-2 text-blue-400">Influencer Form</h4>
                <p className="text-slate-400 text-sm mb-6">Connect with top creators for your brand growth.</p>
                <div className="w-12 h-1 bg-blue-400 rounded-full"></div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/jobportal" className="block h-full bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2rem] hover:bg-white/10">
                <Briefcase className="w-12 h-12 mb-6 text-emerald-400" />
                <h4 className="text-2xl font-bold mb-2 text-emerald-400">Job Portal</h4>
                <p className="text-slate-400 text-sm mb-6">Find the best talent or your next big opportunity.</p>
                <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <a href="https://www.hostinger.com/in/free-domain?utm_id=381673073&msclkid=5b0f7f6e5c631613eac0168be30069bd&utm_source=bing&utm_medium=cpc&utm_campaign=Brand-Exact|NT:Bing|LO:IN&utm_term=hostinger&utm_content=Exact+|+Hostinger" target="_blank" rel="noopener noreferrer" className="block h-full bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2rem] hover:bg-white/10">
                <Globe className="w-12 h-12 mb-6 text-purple-400" />
                <h4 className="text-2xl font-bold mb-2 text-purple-400">Buy Domain</h4>
                <p className="text-slate-400 text-sm mb-6">Secure your unique digital address today.</p>
                <div className="w-12 h-1 bg-purple-400 rounded-full"></div>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/landingpage" className="block h-full bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2rem] hover:bg-white/10">
                <div className="text-5xl mb-6">🚀</div>
                <h4 className="text-2xl font-bold mb-2 text-slate-300">Landing Page</h4>
                <p className="text-slate-400 text-sm mb-6">Deploy conversion-ready storefronts.</p>
                <div className="w-12 h-1 bg-slate-500 rounded-full"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-[#3D7E8C] text-white rounded-2xl font-bold shadow-lg shadow-[#3D7E8C]/30 flex items-center gap-2 group">
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button whileHover={{ backgroundColor: "#f1f5f9" }} className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-bold border border-slate-200 transition-colors">
              View Case Studies
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

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
                <Link to="/services" className="text-sm font-bold text-[#3D7E8C] flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR PACKAGES ─────────────────────────────────────────────────── */}
      {!loading && packages.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-[#F39221] font-black uppercase tracking-[0.3em] text-sm mb-4">Pricing Plans</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Packages</h3>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto font-medium">Transparent pricing built for every stage of your business growth.</p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg._id}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="relative flex flex-col p-8 rounded-[2rem] border border-slate-100 bg-[#F8FAFB] hover:shadow-2xl transition-all duration-500"
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <span className="absolute top-5 right-5 bg-[#F39221] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                      {pkg.badge}
                    </span>
                  )}

                  <h4 className="text-xl font-extrabold text-slate-800 mb-1">{pkg.title}</h4>
                  <p className="text-slate-500 text-sm mb-6 font-medium">{pkg.description}</p>

                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-black text-slate-900">₹{Number(pkg.price).toLocaleString("en-IN")}</span>
                    <span className="text-slate-400 text-sm font-medium mb-1">/ {pkg.billingCycle}</span>
                  </div>

                  <div className="w-full h-px bg-slate-200 my-6" />

                  <ul className="space-y-3 flex-1 mb-8">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-5 h-5 rounded-full bg-[#3D7E8C]/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-[#3D7E8C]" strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="w-full text-center py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-[#3D7E8C] transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

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
