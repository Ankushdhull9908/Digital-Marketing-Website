import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Utensils, ShoppingCart, Building2, Briefcase,
  Play, ChevronRight, PhoneCall, MessageSquare, BarChart3,
  Target, Users, Rocket, Award, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const industries = [
  {
    id: "education",
    label: "Schools & Education",
    icon: <GraduationCap size={28} />,
    accent: "#F39221",
    tagColor: "bg-[#F39221]/10 text-[#F39221] border-[#F39221]/30",
    description:
      "We craft compelling digital identities for schools, colleges, and ed-tech platforms — from vibrant social media campaigns to high-converting admission landing pages.",
    tags: ["Social Media", "Website Design", "SEO", "Ad Campaigns"],
    images: [
      { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", caption: "School Branding" },
      { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", caption: "Campus Campaign" },
      { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", caption: "Social Creatives" },
      { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", caption: "Ad Design" },
    ],
    videos: [
      { src: "https://assets.mixkit.co/videos/preview/mixkit-teacher-explaining-a-math-problem-to-a-student-41924-large.mp4", poster: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", caption: "Admission Drive Reel" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-students-raising-their-hands-in-a-class-42985-large.mp4", poster: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", caption: "Campus Promo" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-group-of-students-studying-with-books-on-a-library-table-41921-large.mp4", poster: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", caption: "Results Story" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-girl-writing-a-paper-in-a-library-41920-large.mp4", poster: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", caption: "Teacher Feature" },
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants & Cafes",
    icon: <Utensils size={28} />,
    accent: "#3D7E8C",
    tagColor: "bg-[#3D7E8C]/10 text-[#3D7E8C] border-[#3D7E8C]/30",
    description:
      "We make food brands irresistible online — drool-worthy photography mockups, reels, menus, and targeted ads that fill your tables every day.",
    tags: ["Food Photography", "Reels", "Google My Business", "Meta Ads"],
    images: [
      { src: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80", caption: "Menu Design" },
      { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", caption: "Social Post" },
      { src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80", caption: "Brand Identity" },
      { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", caption: "Offer Creative" },
    ],
    videos: [
      { src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-preparing-dishes-in-a-restaurant-42922-large.mp4", poster: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80", caption: "Chef's Special Reel" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-waiter-serving-food-at-a-restaurant-42925-large.mp4", poster: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", caption: "Café Ambience" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-plates-of-food-in-a-restaurant-42924-large.mp4", poster: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80", caption: "Opening Event" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-fresh-salad-in-a-wooden-bowl-9230-large.mp4", poster: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", caption: "Dish Highlight" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: <ShoppingCart size={28} />,
    accent: "#F39221",
    tagColor: "bg-[#F39221]/10 text-[#F39221] border-[#F39221]/30",
    description:
      "From product listings to full-funnel performance marketing — we help online stores scale with strategy, design, and data.",
    tags: ["Product Shoots", "Store Design", "Performance Marketing", "Email"],
    images: [
      { src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80", caption: "Product Page" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", caption: "Brand Shoot" },
      { src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80", caption: "Ad Creative" },
      { src: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", caption: "Packaging Design" },
    ],
    videos: [
      { src: "https://assets.mixkit.co/videos/preview/mixkit-woman-shopping-online-on-her-laptop-at-home-42894-large.mp4", poster: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80", caption: "Launch Reel" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-woman-carrying-shopping-bags-44633-large.mp4", poster: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", caption: "Unboxing Video" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-female-hands-packaging-an-order-42904-large.mp4", poster: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80", caption: "Sale Campaign" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-phone-with-an-online-store-42905-large.mp4", poster: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", caption: "Testimonial Reel" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: <Building2 size={28} />,
    accent: "#3D7E8C",
    tagColor: "bg-[#3D7E8C]/10 text-[#3D7E8C] border-[#3D7E8C]/30",
    description:
      "We position properties and builders with authority — stunning visuals, virtual tours, lead-gen funnels, and local SEO that brings serious buyers.",
    tags: ["Virtual Tours", "Lead Gen", "Drone Shoots", "Google Ads"],
    images: [
      { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", caption: "Property Brochure" },
      { src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80", caption: "Social Ad" },
      { src: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80", caption: "Exterior Shot" },
      { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", caption: "Interior Design" },
    ],
    videos: [
      { src: "https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-a-beautiful-interior-in-daylight-41569-large.mp4", poster: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", caption: "Property Walkthrough" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-luxurious-house-with-a-pool-41578-large.mp4", poster: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80", caption: "Drone Aerial" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-big-modern-building-with-a-glass-wall-18067-large.mp4", poster: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80", caption: "Builder Profile" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-modern-interior-design-of-an-apartment-37487-large.mp4", poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", caption: "Client Story" },
    ],
  },
  {
    id: "services",
    label: "Service Businesses",
    icon: <Briefcase size={28} />,
    accent: "#F39221",
    tagColor: "bg-[#F39221]/10 text-[#F39221] border-[#F39221]/30",
    description:
      "Salons, clinics, law firms, gyms — we build local authority and online trust through powerful content, reviews, and digital infrastructure.",
    tags: ["Local SEO", "Content Marketing", "Website", "Review Management"],
    images: [
      { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80", caption: "Salon Branding" },
      { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", caption: "Clinic Campaign" },
      { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", caption: "Gym Promo" },
      { src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80", caption: "Office Shoot" },
    ],
    videos: [
      { src: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-styling-a-clients-hair-42872-large.mp4", poster: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80", caption: "Service Reel" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-doctor-talking-with-a-patient-in-a-clinic-36342-large.mp4", poster: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", caption: "Client Journey" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-athlete-at-the-gym-using-a-rowing-machine-32556-large.mp4", poster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", caption: "Transformation Story" },
      { src: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-an-office-34821-large.mp4", poster: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80", caption: "Brand Film" },
    ],
  },
];

/* ─── ANIMATIONS (same as AboutUs) ────────────────────────────────────── */
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

/* ─── VIDEO CARD (AboutUs card style) ────────────────────────────────── */
function VideoCard({ video, accent }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-[2rem] cursor-pointer group border border-base-300 shadow-sm hover:shadow-2xl transition-shadow duration-500"
      style={{ aspectRatio: "4/3" }}
      onMouseEnter={() => {
        setIsHovered(true);
        ref.current?.play().catch(() => setHasError(true));
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      }}
    >
      <img src={video.poster} alt={video.caption} className="absolute inset-0 w-full h-full object-cover" />
      <video
        ref={ref} muted loop playsInline preload="metadata"
        onError={() => setHasError(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.4 : 0.85 }} />

      {/* Play badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold transition-all duration-300"
        style={{ background: `${accent}dd`, opacity: isHovered && !hasError ? 0 : 1 }}>
        <Play size={10} fill="white" /> Hover to Play
      </div>

      {/* Playing indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold transition-all duration-300"
        style={{ background: `${accent}cc`, opacity: isHovered && !hasError ? 1 : 0 }}>
        <span className="w-2 h-2 rounded-full animate-pulse bg-white" /> Playing
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
        <p className="text-white font-black text-sm tracking-tight">{video.caption}</p>
      </div>

      {/* Accent border on hover */}
      <div className="absolute inset-0 rounded-[2rem] border-2 pointer-events-none transition-all duration-300"
        style={{ borderColor: isHovered ? accent : "transparent" }} />
    </motion.div>
  );
}

/* ─── IMAGE CARD (AboutUs card style) ────────────────────────────────── */
function ImageCard({ img, accent }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-[2rem] group cursor-pointer border border-base-300 shadow-sm hover:shadow-2xl transition-shadow duration-500"
      style={{ aspectRatio: "4/3" }}
    >
      <img src={img.src} alt={img.caption} loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white font-black text-sm tracking-tight">{img.caption}</p>
      </div>
      <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-opacity-60 pointer-events-none transition-all duration-300"
        style={{ borderColor: "transparent" }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = accent}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"} />
    </motion.div>
  );
}

/* ─── INDUSTRY SECTION (AboutUs bento style) ──────────────────────────── */
function IndustrySection({ industry, index }) {
  const isEven = index % 2 === 0;

  return (
    <section id={industry.id} className="py-20 px-6 max-w-7xl mx-auto">

      {/* ── Header card (like AboutUs "Who we are" split) ── */}
      <div className={`grid lg:grid-cols-2 gap-16 items-center mb-20 ${!isEven ? "direction-rtl" : ""}`}>

        {/* Text Side */}
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
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: `${industry.accent}20`, border: `1.5px solid ${industry.accent}50` }}>
              <span style={{ color: industry.accent }}>{industry.icon}</span>
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

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {industry.tags.map((tag) => (
              <span key={tag}
                className={`text-xs font-black px-4 py-2 rounded-full border uppercase tracking-wider ${industry.tagColor}`}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bento Card Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-10 rounded-[3rem] relative overflow-hidden shadow-xl ${!isEven ? "lg:order-1" : ""}`}
          style={{ background: industry.accent }}
        >
          {/* Decorative circle */}
          <svg className="absolute top-0 right-0 opacity-10" width="250" height="250" viewBox="0 0 100 100">
            <circle cx="100" cy="0" r="80" fill="white" />
          </svg>

          <div className="relative z-10 space-y-6">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-black tracking-tight">
              What We Deliver
            </h3>
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

      {/* ── Bento-style media grid ── */}
      <motion.div {...fadeIn}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-8" style={{ background: industry.accent }} />
          <span className="font-black uppercase text-[10px] tracking-[0.3em]" style={{ color: industry.accent }}>
            Our Work
          </span>
          <div className="h-[1px] flex-1 bg-base-300" />
        </div>

        {/* 12-col bento grid — images left large, videos right */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Large featured image — 7 cols, 2 rows */}
          <div className="lg:col-span-7 row-span-2 relative overflow-hidden rounded-[2.5rem] group border border-base-300 shadow-sm hover:shadow-2xl transition-shadow duration-500" style={{ minHeight: "420px" }}>
            <img src={industry.images[0].src} alt={industry.images[0].caption}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity" />
            <div className="absolute bottom-8 left-8 z-20 space-y-2">
              <span className="text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest"
                style={{ background: industry.accent }}>
                {industry.label}
              </span>
              <h3 className="text-white text-2xl font-black tracking-tight">{industry.images[0].caption}</h3>
            </div>
          </div>

          {/* Top-right image — 5 cols */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] group border border-base-300 shadow-sm hover:shadow-xl transition-shadow duration-500" style={{ minHeight: "195px" }}>
            <img src={industry.images[1].src} alt={industry.images[1].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-white font-black text-sm">{industry.images[1].caption}</p>
            </div>
          </div>

          {/* Bottom-right image — 5 cols */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] group border border-base-300 shadow-sm hover:shadow-xl transition-shadow duration-500" style={{ minHeight: "195px" }}>
            <img src={industry.images[2].src} alt={industry.images[2].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-white font-black text-sm">{industry.images[2].caption}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Video reels (2×2 card grid like services grid in AboutUs) ── */}
      <motion.div {...fadeIn} className="mt-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-8" style={{ background: "#F39221" }} />
          <span className="font-black uppercase text-[10px] tracking-[0.3em] text-[#F39221]">
            Video Reels
          </span>
          <div className="h-[1px] flex-1 bg-base-300" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {industry.videos.map((vid, i) => (
            <VideoCard key={i} video={vid} accent={industry.accent} />
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mt-20 h-[1px] w-full bg-base-300" />
    </section>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────── */
export default function IndustriesWeWorkWith() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="bg-base-100 font-sans text-base-content selection:bg-[#3D7E8C]/20 overflow-x-hidden">

      {/* ── HERO (exact match to AboutUs hero) ──────────────────────── */}
      <section className="relative pt-28 pb-32 px-6 bg-[#0f172a] overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="Office background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-[#F39221] font-black uppercase text-xs tracking-[0.3em] mb-4 block">
            Our Work Across Industries
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-100 tracking-tighter mb-6">
            Industries We <span className="text-[#3D7E8C]">Work With</span>
          </h1>
          <div className="w-24 h-2 bg-[#F39221] mx-auto rounded-full mb-8" />
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            From classrooms to kitchens, showrooms to storefronts — we've built
            digital growth engines across every vertical.
          </p>

          {/* Pill Nav */}
          <nav className="flex flex-wrap justify-center gap-3 mt-10">
            {industries.map((ind) => (
              <motion.a
                key={ind.id}
                href={`#${ind.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black transition-all duration-200"
                style={{ color: ind.accent, borderColor: `${ind.accent}50`, background: `${ind.accent}15` }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(ind.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span>{ind.icon}</span>
                {ind.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </section>

      {/* ── PHILOSOPHY BENTO (from AboutUs "Surgical Strategy" section) ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3D7E8C]/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F39221]/5 rounded-full blur-[120px] -z-10" />

        <motion.div className="text-center mb-20 space-y-4" {...fadeIn}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[#F39221]" />
            <span className="text-[#F39221] font-bold uppercase text-[10px] tracking-[0.3em]">
              What We Offer
            </span>
            <div className="h-[1px] w-8 bg-[#F39221]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-base-content leading-[0.95] tracking-tighter">
            Vertical Expertise.{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D7E8C] to-slate-700">
              Infinite Impact.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 font-medium text-lg pt-4">
            Every industry speaks a different language. We're fluent in all of them.
          </p>
        </motion.div>

        {/* 5-industry pill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.a
              key={ind.id}
              href={`#${ind.id}`}
              whileHover={{ y: -10 }}
              {...fadeIn}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(ind.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="p-10 rounded-[2.5rem] bg-base-100 border border-base-300 hover:border-[#3D7E8C]/20 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 group-hover:bg-[#F39221]"
                style={{ background: `${ind.accent}15` }}>
                <span style={{ color: ind.accent }} className="group-hover:text-white transition-colors">
                  {ind.icon}
                </span>
              </div>
              <h4 className="text-2xl font-black leading-tight mb-3 tracking-tight">{ind.label}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{ind.description.slice(0, 80)}…</p>
              <div className="mt-6 flex items-center gap-2 font-black text-sm" style={{ color: ind.accent }}>
                View Work <ChevronRight size={16} />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── INDUSTRY SECTIONS ──────────────────────────────────────────── */}
      {industries.map((ind, i) => (
        <IndustrySection key={ind.id} industry={ind} index={i} />
      ))}

      {/* ── CTA (exact match to AboutUs CTA) ───────────────────────────── */}
      <section className="px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[3rem] bg-slate-800 p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-[#3D7E8C] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"
          />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Ready to Dominate <br />Your Industry?
            </h2>
            <p className="text-teal-50 max-w-2xl mx-auto mb-10 text-lg font-medium">
              Let's build something that makes your competitors nervous. Partner with Webtech Services — your trusted digital growth agency.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-[#F39221] hover:bg-orange-500 text-white rounded-2xl font-black shadow-lg flex items-center justify-center gap-3"
                >
                  <PhoneCall size={20} />
                  Contact Us Today
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-[#3D7E8C] hover:bg-slate-50 rounded-2xl font-black flex items-center justify-center gap-3"
                >
                  <MessageSquare size={20} />
                  Get Free Consultation
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}