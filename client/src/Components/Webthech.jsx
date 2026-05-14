import React, { useEffect, useEffectEvent } from 'react';
import { motion, useAnimation } from 'framer-motion'; // Step 1 Import motion
import{ 
  CheckCircle2, TrendingUp, Users, Target, BarChart3, 
  ShieldCheck, ArrowRight, Lightbulb, Search, Rocket, 
  Settings2, LineChart, GraduationCap, Utensils, 
  ShoppingCart, Building2, Briefcase 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
 
const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};


 

const Webthech = () => {
  const navigate = useNavigate()
  //Brand Colors: Teal: #3D7E8C | Orange: #F39221
  const handleClick = (id) => {
    // Navigate to the page and scroll to the specific section via hash
    navigate(`/industries#${id}`);
  };

  const controls = useAnimation();
  const logoIndices = Array.from({ length: 69 }, (_, i) => i + 1);

  // Start the infinite animation on mount
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 120,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);
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
  { name: "Schools & Education", icon: <GraduationCap size={20} />, id: "education"  },
  { name: "Restaurants & Cafes", icon: <Utensils    size={20} />, id: "restaurants" },
  { name: "E-commerce",          icon: <ShoppingCart size={20} />, id: "ecommerce"   },
  { name: "Real Estate",         icon: <Building2    size={20} />, id: "realestate"  },
  { name: "Service Businesses",  icon: <Briefcase    size={20} />, id: "services"    },
];

  // Animation Variant
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
      <section className="py-24 px-6 bg-base-100 overflow-hidden">
        <div className="max-w-6xl mx-auto ">
          
         {/* --- SECTION 1: WHY CHOOSE US --- */}
<div className="mb-24">
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex flex-col md:flex-row items-center gap-4 mb-12 "
  >
    <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
       Why Choose <span className="text-[#F39221]">Web</span><span   className="text-[#3D7E8C]"  >tech</span>  ?
    </h2>
    <div className="hidden md:block h-px flex-1 bg-base-300"></div>
  </motion.div>

  {/* Container for List (Left) and Image (Right) */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {/* List of Highlights */}
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {highlights.map((item, index) => (
        <motion.div 
          key={index} 
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          className="flex items-center gap-4 p-6 rounded-2xl bg-base-200 border border-transparent hover:border-[#3D7E8C]/20 hover:bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3D7E8C]/10 text-[#3D7E8C] flex items-center justify-center group-hover:bg-[#3D7E8C] group-hover:text-white transition-colors">
            {item.icon}
          </div>
          <span className="font-bold text-base-content group-hover:text-slate-900 transition-colors">
            {item.text}
          </span>
        </motion.div>
      ))}
    </motion.div>

    {/* Image on the Right */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <img 
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
        alt="Digital Marketing Team" 
        className="rounded-[2rem] shadow-2xl w-full object-cover"
      />
      {/* Decorative orange blob behind image */}
      <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-[#F39221]/20 rounded-full blur-2xl"></div>
    </motion.div>

  </div>
</div>

          {/* --- SECTION 2: GROW YOUR BUSINESS --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] bg-base-200 p-8 md:p-16 overflow-hidden mb-24"
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
                <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6 leading-tight">Grow Your Business <br /><span className="text-[#3D7E8C]">With Our Expertise.</span></h2>
                <p className="text-lg text-base-content font-medium leading-relaxed mb-8">At Webtech Services, we create customized marketing strategies based on your business goals and competition.</p>
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
                  <motion.div key={idx} variants={fadeInUp} className="p-6 rounded-3xl bg-base-200 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                      className="h-2 bg-[#3D7E8C] rounded-full mb-4"
                    ></motion.div>
                    <h4 className="font-black text-base-content">{title}</h4>
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
              <h2 className="text-3xl md:text-5xl font-black text-base-content mb-4">
                 Our Success Process
              </h2>
              <p className="text-base-content font-medium">From blueprint to big-scale growth.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {/* Desktop Connecting Line Animation */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-base-300 -z-10 origin-left"
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
                    className="w-16 h-16 rounded-2xl bg-base-200 border-2 border-base-300 text-[#3D7E8C] flex items-center justify-center mb-6 group-hover:border-[#F39221] group-hover:text-[#F39221] transition-all shadow-sm"
                  >
                    {step.icon}
                  </motion.div>
                  <span className="text-[10px] font-black text-[#F39221] mb-2">{step.num}</span>
                  <h4 className="font-extrabold text-base-content mb-2">{step.title}</h4>
                  <p className="text-xs text-base-content/70 leading-relaxed px-2">{step.desc}</p>
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
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3D7E8C]/20 to-transparent" />
 
      <div className="relative z-10">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black mb-8"
        >
          Industries We Work With
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
              onClick={() => handleClick(ind.id)}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10
                         hover:border-[#F39221]/50 transition-all group cursor-pointer select-none"
            >
              <span className="text-[#F39221] group-hover:rotate-12 transition-transform">
                {ind.icon}
              </span>
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
          Ready to dominate your industry?{" "}
          <span
            className="text-[#F39221] underline underline-offset-2 cursor-pointer hover:text-[#E85D3A] transition-colors"
            onClick={() => navigate("/industries")}
          >
            Let's talk.
          </span>
        </motion.p>
      </div>
    </motion.div>
         
{/* --- SECTION 5: CLIENT LOGOS --- */}
<section className="pt-20 pb-4 bg-base-100 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
          Our <span className="text-[#3D7E8C]">Clients</span>
        </h2>
        <div className="w-24 h-1.5 bg-[#F39221] mx-auto rounded-full"></div>
      </div>

      <div className="relative overflow-hidden py-4">
        {/* Gradient Faders */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-base-100 via-base-200 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-base-100 via-base-200 to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={controls}
          style={{ width: "max-content" }}
        >
          {[0, 1].map((groupIdx) => (
            <div key={groupIdx} className="flex items-center">
              {logoIndices.map((num) => (
                <div
                  key={`${groupIdx}-${num}`}
                  className="px-10 md:px-14 flex-shrink-0"
                  /* 
                    PAUSE LOGIC FIXED: 
                    We stop it on enter, but on leave, we only tell it the 
                    DESTINATION (-50%). Since we don't provide a starting 
                    point, it won't "jump" back to 0%.
                  */
                  onMouseEnter={() => controls.stop()}
                  onMouseLeave={() =>
                    controls.start({
                      x: "-50%", // Goal only, not a sequence
                      transition: { 
                        duration: 120, 
                        ease: "linear", 
                        repeat: Infinity,
                        repeatType: "loop" // Ensures it wraps correctly
                      },
                    })
                  }
                >
                  <motion.img
                    src={`/logos/${num}.png`}
                    alt="Client"
                    whileHover={{ 
                      y: -10, 
                      scale: 1.1,
                      filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))" 
                    }}
                    className="h-16 md:h-24 w-auto object-contain cursor-pointer transition-all duration-300"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
</div>
      </section>
    </div>
  );
};

export default Webthech;
