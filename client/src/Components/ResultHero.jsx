import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Quote, PhoneCall, HelpCircle, 
  ChevronDown, MessageSquare, Globe, Smartphone, 
  Share2, Zap, ArrowRight 
} from 'lucide-react';
import { useAuth } from "../context/Context";

const ResultHero = () => {
  // Brand Colors: Teal: #3D7E8C | Orange: #F39221
  const { faqs, clients, loading,packages,Testimonials } = useAuth();

  const results = [
    "Higher Google Rankings", "More Website Traffic", 
    "Better Lead Generation", "Increased Sales", 
    "Strong Online Presence"
  ];

 
  // Animation Variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="font-montserrat text-slate-800 overflow-hidden">
      
      {/* --- SECTION 1: EXPECTED RESULTS --- */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">
               Results You Can Expect
            </h2>
            <p className="text-slate-500 font-medium">Data-backed growth for your digital footprint.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {results.map((res, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border-b-4 border-[#3D7E8C] transition-shadow hover:shadow-md"
              >
                <CheckCircle className="text-[#3D7E8C] flex-shrink-0" size={24} />
                <span className="font-bold text-lg">{res}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION: OUR PACKAGES (RESPONSIVE) --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Our <span className="text-[#F39221]">Packages</span>
            </h2>
            <div className="w-24 h-2 bg-[#3D7E8C] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`card bg-white rounded-[2.5rem] border-2 flex flex-col h-full ${
                  pkg.featured ? 'border-[#F39221] shadow-xl' : 'border-slate-100 shadow-sm'
                } transition-all duration-300`}
              >
                <div className="p-8 md:p-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      {pkg.icon}
                    </div>
                    {pkg.featured && (
                      <span className="badge bg-[#F39221] border-none text-white font-bold p-3">Popular</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black mb-3">{pkg.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  <div className="mb-8">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Starting Price</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-black text-slate-900">₹{pkg.price}</span>
                      <span className="text-slate-500 font-bold text-lg">{pkg.suffix || "/-"}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-grow">
                    <p className="font-black text-xs uppercase tracking-[0.2em] text-[#3D7E8C]">What You Get:</p>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-bold text-slate-600 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`btn btn-block rounded-2xl h-14 border-none text-white font-black group ${
                    pkg.featured ? 'bg-[#F39221] hover:bg-orange-600' : 'bg-[#3D7E8C] hover:bg-[#2D5E69]'
                  }`}>
                    Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-center tracking-tight mb-12"
          >
             Client Testimonials
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Testimonials.map((client, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm"
              >
                <Quote className="absolute top-6 left-6 text-[#F39221]/20" size={40} fill="currentColor" />
                <p className="italic text-lg text-slate-600 mb-6 relative z-10 leading-relaxed">"{client.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3D7E8C] flex items-center justify-center text-white font-bold">
                    {client.initial}
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-900 leading-none">{client.role}</p>
                    <p className="text-xs text-slate-400 mt-1">Verified Client</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* --- SECTION 4: FAQ SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">
               FAQ Section
            </h2>
            <p className="text-slate-500 font-medium">Quick answers to boost your SEO knowledge.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.details 
                key={i} 
                variants={fadeInUp}
                className="group p-6 rounded-2xl bg-[#F8FAFB] border border-transparent hover:border-[#3D7E8C]/20 transition-all cursor-pointer shadow-sm"
              >
                <summary className="flex items-center justify-between font-black text-slate-800 list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="text-[#3D7E8C]" size={20} />
                    {faq.question}
                  </div>
                  <ChevronDown className="group-open:rotate-180 transition-transform text-slate-400" size={20} />
                </summary>
                <p className="mt-4 text-slate-600 font-medium leading-relaxed pl-8 border-l-2 border-[#3D7E8C]">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResultHero;
