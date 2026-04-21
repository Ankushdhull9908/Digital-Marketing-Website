import React from 'react';
import { motion } from 'framer-motion'; // Step 1: Import motion
import { 
  CheckCircle2, TrendingUp, Users, Target, BarChart3, 
  ShieldCheck, ArrowRight, Lightbulb, Search, Rocket, 
  Settings2, LineChart, GraduationCap, Utensils, 
  ShoppingCart, Building2, Briefcase 
} from 'lucide-react';

const Webthech = () => {
  // Brand Colors: Teal: #3D7E8C | Orange: #F39221

  const highlights = [
    { text: "Experienced Digital Marketing Experts", icon: <Users size={20} /> },
    { text: "100% Result-Oriented Approach", icon: <Target size={20} /> },
    { text: "Affordable Pricing Plans", icon: <TrendingUp size={20} /> },
    { text: "Customized Marketing Strategies", icon: <BarChart3 size={20} /> },
    { text: "Transparent Reporting", icon: <ShieldCheck size={20} /> },
    { text: "Dedicated Support", icon: <CheckCircle2 size={20} /> },
  ];

  const steps = [
    { num: "01", title: "Business Analysis", desc: "We dive deep into your goals, niche, and target audience.", icon: <Search size={24} /> },
    { num: "02", title: "Strategy Planning", desc: "A custom roadmap built for your specific market needs.", icon: <Lightbulb size={24} /> },
    { num: "03", title: "Execution", desc: "Turning plans into action via SEO, Ads, and Content.", icon: <Rocket size={24} /> },
    { num: "04", title: "Optimization", desc: "Fine-tuning every metric for peak performance.", icon: <Settings2 size={24} /> },
    { num: "05", title: "Growth", desc: "Scaling what works to maximize your total ROI.", icon: <LineChart size={24} /> },
  ];

  const industries = [
    { name: "Schools & Education", icon: <GraduationCap size={20} /> },
    { name: "Restaurants & Cafes", icon: <Utensils size={20} /> },
    { name: "E-commerce", icon: <ShoppingCart size={20} /> },
    { name: "Real Estate", icon: <Building2 size={20} /> },
    { name: "Service Businesses", icon: <Briefcase size={20} /> },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="font-montserrat">
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          
          {/* --- SECTION 1: WHY CHOOSE US --- */}
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-4 mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                <span className="text-[#3D7E8C]">🔷</span> Why Choose Webtech?
              </h2>
              <div className="hidden md:block h-px flex-1 bg-slate-100"></div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-[#F8FAFB] border border-transparent hover:border-[#3D7E8C]/20 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3D7E8C]/10 text-[#3D7E8C] flex items-center justify-center group-hover:bg-[#3D7E8C] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- SECTION 2: GROW YOUR BUSINESS --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] bg-slate-50 p-8 md:p-16 overflow-hidden mb-24"
          >
            <motion.div 
              animate={{ 
                x: [0, 20, 0], 
                y: [0, -20, 0] 
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F39221]/10 blur-3xl rounded-full"
            ></motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="inline-block px-4 py-1 rounded-full bg-[#F39221]/10 text-[#F39221] text-xs font-black uppercase tracking-widest mb-6">Our Mission</div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Grow Your Business <br /><span className="text-[#3D7E8C]">With Our Expertise.</span></h2>
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">At Webtech Services, we create customized marketing strategies based on your business goals and competition.</p>
                <motion.button whileHover={{ x: 10 }} className="flex items-center gap-2 font-bold text-[#F39221] group">Get a Custom Strategy <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/></motion.button>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {["Increase Traffic", "Quality Leads", "Boost ROI", "Brand Authority"].map((title, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                      className="h-2 bg-[#3D7E8C] rounded-full mb-4"
                    ></motion.div>
                    <h4 className="font-black text-slate-800">{title}</h4>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* --- SECTION 3: OUR PROCESS --- */}
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                <span className="text-[#3D7E8C]">🔷</span> Our Success Process
              </h2>
              <p className="text-slate-500 font-medium">From blueprint to big-scale growth.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {/* Desktop Connecting Line Animation */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10 origin-left"
              ></motion.div>
              
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 text-[#3D7E8C] flex items-center justify-center mb-6 group-hover:border-[#F39221] group-hover:text-[#F39221] transition-all shadow-sm"
                  >
                    {step.icon}
                  </motion.div>
                  <span className="text-[10px] font-black text-[#F39221] mb-2">{step.num}</span>
                  <h4 className="font-extrabold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- SECTION 4: INDUSTRIES --- */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3D7E8C]/20 to-transparent"></div>
            <div className="relative z-10">
              <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-5xl font-black mb-8">
                <span className="text-[#F39221]">🔷</span> Industries We Work With
              </motion.h2>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4"
              >
                {industries.map((ind, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F39221]/50 transition-all group cursor-default"
                  >
                    <span className="text-[#F39221] group-hover:rotate-12 transition-transform">{ind.icon}</span>
                    <span className="font-bold text-sm tracking-wide">{ind.name}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-slate-400 text-sm font-medium"
              >
                Ready to dominate your industry? Let’s talk.
              </motion.p>
            </div>
          </motion.div>
         
{/* --- SECTION 5: CLIENT LOGOS --- */}
<div className="mt-20 overflow-hidden relative py-10">
  {/* Soft Edge Overlays (Optional, but keeps logos from hitting the screen edge abruptly) */}
  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

  <motion.div
    className="flex whitespace-nowrap"
    animate={{ x: ["0%", "-50%"] }} 
    transition={{
      repeat: Infinity,
      ease: "linear",
      duration: 120, // Adjust speed for 69 images
    }}
    style={{ width: "fit-content" }}
  >
    {[...Array(2)].map((_, groupIdx) => (
      <div key={groupIdx} className="flex items-center gap-12 px-6">
        {Array.from({ length: 69 }, (_, i) => i + 1).map((num) => (
          <motion.img
            key={`${groupIdx}-${num}`}
            src={`/logos/${num}.png`} 
            alt=""
            // Translate up and scale slightly on hover
            whileHover={{ y: -10, scale: 1.1 }}
            className="h-12 md:h-16 w-auto object-contain flex-shrink-0 cursor-pointer transition-shadow"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        ))}
      </div>
    ))}
  </motion.div>
</div>
</div>
      </section>
    </div>
  );
};

export default Webthech;