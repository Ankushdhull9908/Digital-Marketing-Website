import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, Megaphone, Target, PenTool, MessageSquare, 
  Globe, Code, Smartphone, ShoppingCart, Cpu, Palette, ArrowRight 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-2xl transition-all duration-300 rounded-[2.5rem] overflow-hidden group h-full">
    <div className="card-body p-8">
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-6 ${features.includes("SEO") ? "bg-blue-50 text-blue-600" : "bg-base-100 text-base-content"}`}>
        <Icon size={28} />
      </div>
      {/* Title & Description*/}
      <h3 className="text-2xl font-black mb-3 group-hover:text-[#F39221] transition-colors tracking-tight text-base-content">
        {title}
      </h3>
      <p className="text-sm text-base-content font-medium leading-relaxed mb-8">
        {description}
      </p>
      
      {/* Feature List - Visibility Fixed */}
      <div className="space-y-4 mt-auto">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D7E8C]">
          Deliverables
        </p>
        <ul className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <li 
              key={i} 
              className="px-3 py-1.5 bg-base-100 border border-slate-200 text-base-content text-[11px] font-bold rounded-lg uppercase tracking-wider transition-all group-hover:bg-base-200 group-hover:border-[#3D7E8C]/30"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const OurServices = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element by ID (e.g., #special-section)
      const element = document.getElementById(hash.replace('#', ''));
      
      if (element) {
        // Use a slight timeout to ensure images/layout are rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [hash]);
  const marketingServices = [
    {
      icon: Megaphone,
      title: "Social Media",
      description: "Build your brand presence on Instagram, Facebook, and LinkedIn with active engagement.",
      features: ["Content Creation", "Management", "Growth Strategy"],
      color: "bg-pink-50 text-pink-600"
    },
    {
      icon: Target,
      title: "Paid Advertising",
      description: "Generate instant leads and sales through targeted Google and Meta ad campaigns.",
      features: ["Google Ads", "Facebook Ads", "YouTube Ads"],
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Attract and engage your audience with high-quality copywriting and creative blogs.",
      features: ["Blog Writing", "Web Content", "Ad Copy"],
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: MessageSquare,
      title: "Direct Marketing",
      description: "Stay connected with your customers via bulk Email and WhatsApp API automation.",
      features: ["WhatsApp API", "Bulk Email", "Lead Nurturing"],
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improve your website ranking on Google and get organic traffic with our advanced strategies.",
      features: ["Keyword Research", "On-Page", "Technical SEO", "Local SEO"],
      color: "bg-blue-50 text-blue-600"
    },
  ];
  
  const techServices = [
    {
      icon: Globe,
      title: "Web Designing",
      description: "Visually stunning UI/UX designs that reflect your brand identity and load fast.",
      features: ["Modern UI", "Mobile Ready", "SEO Friendly"],
      color: "bg-cyan-50 text-cyan-600"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Powerful and scalable custom websites developed with React and modern tech stacks.",
      features: ["E-Commerce", "Custom Portfolios", "React/Node"],
      color: "bg-slate-900 text-white"
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Turn your ideas into fully functional Android and iOS mobile applications.",
      features: ["Hybrid Apps", "iOS/Android", "API Ready"],
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: ShoppingCart,
      title: "E-comm Solutions",
      description: "Launch your online store with product management and secure payment gateways.",
      features: ["Cart System", "Payments", "Order Track"],
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: Cpu,
      title: "API Integration",
      description: "Enhance systems by integrating tools like CRM, WhatsApp, and Payment Gateways.",
      features: ["CRM Sync", "Auto Tools", "Payment APIs"],
      color: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 font-montserrat text-base-content">
      {/* --- HERO SECTION --- */}
     <section className="relative py-24 px-6 bg-base-100 overflow-hidden">
        {/* Subtle Brand Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-300 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-300 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-3xl text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-[#3D7E8C] text-xs font-black uppercase tracking-widest mb-6">
                WHAT WE OFFER
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
               End-to-End <span className="text-[#3D7E8C]">Digital</span> <br /> 
                <span className="text-[#F39221] italic">Solutions.</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
               We help your business grow, scale, and succeed online. Everything you need under one roof.
              </p>
            </div>
            <Link to="/contact"  className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#3D7E8C] transition-all duration-300 flex items-center gap-3 group">
              Start a Project <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- DIGITAL MARKETING --- */}
      <section id="special-section" className="py-24 px-6 bg-base-100 text-base-content transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-[#F39221] text-3xl font-black">Digital Marketing</h2>
         
            <div className="h-px flex-1 bg-base-300" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {marketingServices.map((service, index) => (
              <ServiceCard className="bg-base-100" key={index} {...service}  />
            ))}
          </div>
        </div>
      </section>

      {/* --- TECH & DEVELOPMENT --- */}
      <section className="py-24 px-6 bg-base-100 text-base-content transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-[#F39221] text-3xl font-black">Development & Design</h2>
            <div className="h-px flex-1 bg-base-300" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techServices.map((service, index) => (
              <ServiceCard className="bg-base-100" key={index} {...service}  />
            ))}
            
            <div className="lg:col-span-1 card bg-gradient-to-br from-[#3D7E8C] to-[#2a5a65] text-white p-8 rounded-[2.5rem] shadow-xl">
              <Palette size={40} className="mb-6" />
              <h3 className="text-2xl font-black mb-4">Branding & Graphics</h3>
              <p className="text-white/80 text-sm mb-8">Build a strong brand identity that stands out. Logo design, brochures, and creatives.</p>
              <div className="flex flex-wrap gap-2">
                {["Logo", "Creatives", "Banner", "Cards"].map(item => (
                  <span key={item} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase border border-white/20">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F39221] rounded-full blur-[120px] opacity-20 -mr-20 -mt-20" />
          <h2 className="text-4xl font-black mb-6">Ready to start your project?</h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto">Contact us today for a free consultation and let's take your business to the next level.</p>
          <Link to="/contact" className="btn btn-wide bg-white text-slate-900 border-none hover:bg-slate-200 rounded-xl font-black uppercase tracking-widest">
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
