import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Rocket, CheckCircle2, Award, Users, BarChart3, ArrowRight,PhoneCall, MousePointer2 , MessageSquare  } from 'lucide-react';
import { Link } from 'react-router-dom';
const AboutUs = () => {
  const fadeIn ={
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const services = [
    { name: "Search Engine Optimization", icon: <BarChart3 size={24} /> },
    { name: "Google Ads (PPC)", icon: <Target size={24} /> },
    { name: "Social Media Marketing", icon: <Users size={24} /> },
    { name: "Website Development", icon: <Rocket size={24} /> },
    { name: "Content Marketing", icon: <Award size={24} /> },
    { name: "Lead Generation", icon: <CheckCircle2 size={24} /> }
  ];

  return (
    <div className="bg-white font-sans text-slate-900 selection:bg-[#3D7E8C]/20 overflow-x-hidden">
      
      {/* -- PREMIUM HERO SECTION --- */}
    
      <section className="relative pt-28 pb-32 px-6 bg-[#0f172a] overflow-hidden text-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Office background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 " />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-[#F39221] font-black uppercase text-xs tracking-[0.3em] mb-4 block">
            Since 2018
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            About <span className="text-[#3D7E8C]">Us</span>
          </h1>
          <div className="w-24 h-2 bg-[#F39221] mx-auto rounded-full mb-8"></div>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            We are a collective of digital architects dedicated to transforming 
            ambitious brands into market leaders through data-driven precision.
          </p>
        </motion.div>
      </section>
   {/* --- WHO WE ARE SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#3D7E8C] font-black uppercase text-[11px] tracking-widest mb-4 block">
              Behind the Scenes
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
              Who we <span className="text-[#F39221]">are.</span>
            </h2>
            <div className="w-16 h-1 bg-[#3D7E8C] rounded-full mb-8"></div>
            
            <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed">
              <p>
                We are a high-octane team of digital specialists who believe that every click should tell a story and every conversion should build a legacy. 
              </p>
              <p>
                Unlike traditional agencies that focus on broad strokes, we operate with the precision of engineers. Our culture is built on transparency, relentless testing, and a "growth-first" mindset.
              </p>
              
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-black text-[#3D7E8C]">98%</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Client Retention</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#3D7E8C]">500+</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Projects Delivered</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Compositional Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Our Team Workspace" 
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Floating Secondary Image */}
            <div className="absolute -bottom-10 -left-10 z-20 w-1/2 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" 
                alt="Strategy Meeting" 
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F39221]/10 rounded-full blur-2xl z-0" />
            <div className="absolute top-1/2 -right-4 w-12 h-12 bg-[#3D7E8C] rounded-xl rotate-12 z-0 opacity-20" />
          </motion.div>

        </div>
      </section>

    {/* --- BENTO-STYLE STORY SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        
        {/* 1. Centered Heading at Top */}
        <motion.div 
          className="text-center mb-16"
          {...fadeIn}
        >
          <span className="text-[#F39221] font-black uppercase text-xs tracking-widest mb-4 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
            Helping Businesses Succeed <br /> In A <span className="text-[#3D7E8C]">Noisy World.</span>
          </h2>
          <div className="w-24 h-2 bg-[#F39221] mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* 2. Content Grid: Image Left, Bento Cards Right */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Large Feature Image */}
          <motion.div 
            className="lg:col-span-6 rounded-[3rem] overflow-hidden shadow-2xl relative group min-h-[400px]"
            {...fadeIn}
          >
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              alt="Digital Strategy" 
            />
            {/* Decorative Label on Image */}
            <div className="absolute bottom-8 left-8 z-20">
              <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                <p className="text-slate-900 font-black text-sm uppercase tracking-tighter">Surgical Precision</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Bento Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Top Right: ROI Focus Card */}
            <motion.div 
              className="p-10 md:p-12 rounded-[3rem] bg-[#3D7E8C] text-white flex-1 flex flex-col justify-center shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <p className="text-xl md:text-2xl font-bold leading-relaxed relative z-10">
                Founded on the principle of surgical digital marketing, we cut through the noise by prioritizing <span className="text-slate-900 font-black underline decoration-[#F39221] underline-offset-4">ROI over vanity metrics.</span>
              </p>
            </motion.div>

            {/* Bottom Right: Team/Obsession Card */}
            <motion.div 
              className="p-10 md:p-12 rounded-[3rem] bg-slate-900 text-white flex-1 flex flex-col justify-center shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F39221]/10 rounded-full blur-3xl -ml-16 -mb-16" />
              <p className="text-slate-100/80 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                Our team is composed of <span className="text-white font-bold">developers, data scientists,</span> and creative strategists who share one obsession: <span className="text-[#F39221] font-black">measurable business growth.</span>
              </p>
            </motion.div>

          </div>
          
        </div>
      </section>

     {/* --- WHY US SECTION --- */}
      {/* --- WHY US SECTION --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Heading at Top */}
          <div className="text-center mb-16">
            <span className="text-[#F39221] font-black uppercase text-[11px] tracking-widest mb-4 block">
              The Advantage
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
              Why <span className="text-[#3D7E8C]">Us.</span>
            </h2>
            <div className="w-24 h-2 bg-[#F39221] mx-auto rounded-full"></div>
          </div>

          {/* 4 Divs in 2-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Our Mission */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-14 h-14 bg-[#3D7E8C] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#3D7E8C]/20">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Our Mission</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                To empower brands with lethal precision through smart, ROI-driven marketing solutions that turn browsers into loyal advocates.
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-14 h-14 bg-[#F39221] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#F39221]/20">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Our Vision</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                To become the global benchmark for digital innovation and strategic brand expansion in an ever-evolving digital landscape.
              </p>
            </motion.div>

            {/* Our Goals */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20">
                <Rocket size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Our Goals</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Deliver measurable 10x growth for our partners, pioneer new automation tech, and maintain 100% data transparency.
              </p>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[3rem] bg-[#3D7E8C] text-white flex flex-col shadow-xl shadow-[#3D7E8C]/20"
            >
              <div className="w-14 h-14 bg-white text-[#3D7E8C] rounded-2xl flex items-center justify-center mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Why Choose Us</h3>
              <p className="text-white/80 font-medium leading-relaxed">
                Because we value your bottom line more than fancy awards. Surgical strategy, expert execution, and zero fluff for your business.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <span className="text-[#F39221] font-black uppercase text-[11px] tracking-widest mb-4 block">Core Capabilities</span>
              <h2 className="text-4xl md:text-5xl font-black  tracking-tighter">What We Do.</h2>
            </div>
            <div className="w-full md:w-1/3 h-[2px] bg-slate-200 mb-4 hidden md:block"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#3D7E8C]/20 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#F39221] transition-colors duration-500">
                  {React.cloneElement(service.icon, { className: "text-[#3D7E8C] group-hover:text-white transition-colors" })}
                </div>
                <h4 className="text-2xl font-black  leading-tight mb-4 tracking-tight">{service.name}</h4>
                <p className="text-slate-500 text-sm font-medium">Precision engineering for high-stakes digital growth.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR APPROACH (Minimal & Tech-Focused) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-black mb-10 text-slate-900 leading-none">
              Strategic <span className="text-[#3D7E8C]">Methodology.</span>
            </h2>
            <div className="space-y-12 mt-12">
              {[
                { title: "Deep Audit", desc: "Understanding the DNA of your business and market.", icon: <BarChart3 /> },
                { title: "Tactical Execution", desc: "Surgical deployment of marketing assets.", icon: <MousePointer2 /> },
                { title: "Scale Optimization", desc: "Relentless monitoring to ensure maximum ROI.", icon: <Rocket /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full border-2 border-[#F39221]/30 flex items-center justify-center flex-shrink-0 text-[#F39221]">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-black text-xl  tracking-tight mb-1">{item.title}</h5>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-12 rounded-[3.5rem] bg-[#3D7E8C] text-white relative overflow-hidden shadow-3xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#3D7E8C]/10 rounded-full blur-[100px] -mr-40 -mt-40" />
            <h3 className="text-3xl font-black mb-12 text-[#F39221] tracking-tight">The Growth Engine.</h3>
            <ul className="space-y-6">
              {[
                "Target Audience Architecture", "Custom Conversion Funnels", "Continuous Performance Audits", "Full-Stack Tech Integration"
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <span className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center font-black text-sm group-hover:bg-slate-900 transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-slate-300 font-bold text-lg">{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

    {/* --- SECTION 3: CALL TO ACTION (CTA) --- */}
      <section className="px-6 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[3rem] bg-slate-800 p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Animated Background Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-[#3D7E8C] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"
          ></motion.div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Ready to Grow Your <br/>Business Online?</h2>
            <p className="text-teal-50 max-w-2xl mx-auto mb-10 text-lg font-medium">Partner with Webtech Services – your trusted digital marketing agency in Delhi. Let’s turn your vision into revenue.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                to="/contact"
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
};

export default AboutUs;
