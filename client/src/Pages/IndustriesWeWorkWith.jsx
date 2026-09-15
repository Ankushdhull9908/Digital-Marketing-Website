import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Utensils, ShoppingCart, Building2, Briefcase,
  Users, Award, Rocket, Target, BarChart3, CheckCircle2, Star,
  Play, ChevronRight, PhoneCall, MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://digital-marketing-temp.onrender.com";

// Must match ICON_OPTIONS in IndustriesAdmin.jsx
const ICON_MAP = {
  GraduationCap, Utensils, ShoppingCart, Building2, Briefcase,
  Users, Award, Rocket, Target, BarChart3, CheckCircle2, Star,
};
/* ─── DATA ─────────────────────────────────────────────────────────────── */


/* ─── ANIMATIONS (same as AboutUs) ────────────────────────────────────── */
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

/* ─── VIDEO CARD (AboutUs card style) ────────────────────────────────── */

/* ─── INDUSTRY SECTION (AboutUs bento style) ──────────────────────────── */
function IndustrySection({ industry, index }) {
  const isEven = index % 2 === 0;
  const Icon = ICON_MAP[industry.iconName] || Briefcase;
  const tagStyle = {
    background: `${industry.accent}1A`,
    color: industry.accent,
    borderColor: `${industry.accent}4D`,
  };

  return (
    <section id={industry.slug} className="py-20 px-6 max-w-7xl mx-auto">
      <div className={`grid lg:grid-cols-2 gap-16 items-center mb-20 ${!isEven ? "direction-rtl" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={!isEven ? "lg:order-2" : ""}
        >
          <span className="text-[#F39221] font-black uppercase text-[11px] tracking-widest mb-4 block">
            Industry Focus
          </span>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: `${industry.accent}20`, border: `1.5px solid ${industry.accent}50` }}
            >
              <Icon size={28} style={{ color: industry.accent }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tighter">
              {industry.label.split(" ").slice(0, -1).join(" ")}{" "}
              <span style={{ color: industry.accent }}>
                {industry.label.split(" ").slice(-1)[0]}.
              </span>
            </h2>
          </div>

          <div className="w-16 h-1 rounded-full mb-8" style={{ background: industry.accent }} />

          <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
            {industry.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {industry.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-black px-4 py-2 rounded-full border uppercase tracking-wider"
                style={tagStyle}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bento Card Side — unchanged except industry.icon → <Icon /> isn't used here, keep as-is */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-10 rounded-[3rem] relative overflow-hidden shadow-xl ${!isEven ? "lg:order-1" : ""}`}
          style={{ background: industry.accent }}
        >
          <svg className="absolute top-0 right-0 opacity-10" width="250" height="250" viewBox="0 0 100 100">
            <circle cx="100" cy="0" r="80" fill="white" />
          </svg>
          <div className="relative z-10 space-y-6">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-black tracking-tight">What We Deliver</h3>
            <ul className="space-y-4">
              {industry.tags.map((tag, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-sm text-white">
                    {i + 1}
                  </span>
                  <span className="text-white/80 font-bold text-base">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      {/* Our Work */}
<motion.div {...fadeIn}>
  <div className="flex items-center gap-4 mb-10">
    <div
      className="h-[1px] w-8"
      style={{ background: industry.accent }}
    />

    <span
      className="font-black uppercase text-[10px] tracking-[0.3em]"
      style={{ color: industry.accent }}
    >
      Our Work
    </span>

    <div className="h-[1px] flex-1 bg-base-300" />
  </div>

  <div className="grid lg:grid-cols-12 gap-6">

    {/* Large image */}
    <div
      className="lg:col-span-7 row-span-2 relative overflow-hidden rounded-[2.5rem] group border border-base-300 shadow-sm hover:shadow-2xl transition-shadow duration-500"
      style={{ minHeight: "420px" }}
    >
      <img
        src={industry.images?.[0]?.src}
        alt={industry.images?.[0]?.caption || industry.label}
        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity" />

      <div className="absolute bottom-8 left-8 z-20 space-y-2">
        <span
          className="text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest"
          style={{ background: industry.accent }}
        >
          {industry.label}
        </span>

        <h3 className="text-white text-2xl font-black tracking-tight">
          {industry.images?.[0]?.caption}
        </h3>
      </div>
    </div>


    {/* Small image 1 */}
    <div
      className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] group border border-base-300 shadow-sm hover:shadow-xl transition-shadow duration-500"
      style={{ minHeight: "195px" }}
    >
      <img
        src={industry.images?.[1]?.src}
        alt={industry.images?.[1]?.caption || industry.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-4 left-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white font-black text-sm">
          {industry.images?.[1]?.caption}
        </p>
      </div>
    </div>


    {/* Small image 2 */}
    <div
      className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] group border border-base-300 shadow-sm hover:shadow-xl transition-shadow duration-500"
      style={{ minHeight: "195px" }}
    >
      <img
        src={industry.images?.[2]?.src}
        alt={industry.images?.[2]?.caption || industry.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-4 left-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white font-black text-sm">
          {industry.images?.[2]?.caption}
        </p>
      </div>
    </div>

  </div>
</motion.div>
    </section>)
  }



export default function IndustriesWeWorkWith() {
  const location = useLocation();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/industries`);
        if (!res.ok) throw new Error("Failed to load industries");
        const data = await res.json();
        setIndustries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  console.log('industry data',industries)

  useEffect(() => {
    if (loading) return; // wait until sections exist in the DOM before trying to scroll to a hash
    const hash = location.hash?.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location, loading]);

  return (
    <div className="bg-base-100 font-sans text-base-content selection:bg-[#3D7E8C]/20 overflow-x-hidden">
      {/* HERO — pill nav now maps over fetched industries */}
    
<section className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden text-center">
  
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
      alt="Industries background"
      className="w-full h-full object-cover"
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-slate-950/65" />
  </div>

  {/* Hero Content */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 max-w-5xl mx-auto"
  >

    {/* Small Heading */}
    <p className="text-[#F39221] font-black uppercase text-xs tracking-[0.35em] mb-6">
      Our Work Across Industries
    </p>

    {/* Main Heading */}
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] mb-8">
      Industries We <br className="hidden md:block" />
      <span className="text-[#F39221]">Work With</span>
    </h1>

    {/* Description */}
    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
      From classrooms to kitchens, showrooms to storefronts — we've built
      digital growth engines across every vertical.
    </p>

    {/* Industry Navigation */}
    <nav className="flex flex-wrap justify-center gap-3">
      {industries.map((ind) => {
        const Icon = ICON_MAP[ind.iconName] || Briefcase;

        return (
          <motion.a
            key={ind.slug}
            href={`#${ind.slug}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold backdrop-blur-md hover:bg-white/20 transition"
          >
            <Icon size={16} />
            {ind.label}
          </motion.a>
        );
      })}
    </nav>

  </motion.div>
</section>


      {/* PHILOSOPHY BENTO grid — same treatment */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
        {/* ...decorative blurs + heading unchanged... */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ICON_MAP[ind.iconName] || Briefcase;
            return (
              <motion.a
                key={ind.slug}
                href={`#${ind.slug}`}
                whileHover={{ y: -10 }}
                {...fadeIn}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(ind.slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="p-10 rounded-[2.5rem] bg-base-100 border border-base-300 hover:border-[#3D7E8C]/20 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer block"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 group-hover:bg-[#F39221]"
                  style={{ background: `${ind.accent}15` }}
                >
                  <Icon size={28} style={{ color: ind.accent }} className="group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-black leading-tight mb-3 tracking-tight">{ind.label}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{ind.description.slice(0, 80)}…</p>
                <div className="mt-6 flex items-center gap-2 font-black text-sm" style={{ color: ind.accent }}>
                  View Work <ChevronRight size={16} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* INDUSTRY SECTIONS */}
      {!loading && industries.map((ind, i) => <IndustrySection key={ind.slug} industry={ind} index={i} />)}

      {/* CTA — unchanged */}
      {/* ...rest of file unchanged... */}
    </div>
  );
}