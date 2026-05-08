import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, HelpCircle, 
  ChevronDown, ChevronLeft, ChevronRight, Play,
  ArrowRight
} from 'lucide-react';
import { useAuth } from "../context/Context";

const ResultHero = () => {
  const { faqs, packages } = useAuth();
  
  //Expanded list to demonstrate scrolling
  const allClients = [
    { id: 1, name: "John Doe", role: "CEO, TechFlow", text: "Incredible growth in 3 months!", video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34448-large.mp4" },
    { id: 2, name: "Sarah Smith", role: "Director, Innovate", text: "The best SEO team we've hired.", video: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-laptop-while-sitting-at-a-31358-large.mp4" },
    { id: 3, name: "Mike Ross", role: "Founder, Peak", text: "Highly professional results.", video: "https://assets.mixkit.co/videos/preview/mixkit-man-working-at-his-desk-in-the-office-31355-large.mp4" },
    { id: 4, name: "Rachel Zane", role: "CMO, Global", text: "Our traffic doubled instantly.", video: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-working-on-her-laptop-31352-large.mp4" },
    { id: 5, name: "Harvey S.", role: "Partner, PH", text: "Exceptional attention to detail.", video: "https://assets.mixkit.co/videos/preview/mixkit-man-under-colored-lights-in-a-nightclub-40548-large.mp4" },
    { id: 6, name: "Donna P.", role: "COO, Specter", text: "They just get digital marketing.", video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-laptop-40545-large.mp4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;

  // Navigation Logic for sliding window
  const nextSlide = () => {
    if (currentIndex + cardsToShow < allClients.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(allClients.length - cardsToShow); // Go to end
    }
  };

  const results = [
    "Higher Google Rankings", "More Website Traffic", 
    "Better Lead Generation", "Increased Sales", 
    "Strong Online Presence"
  ];
  const [activeTab, setActiveTab] = useState('Monthly');

  const durations = [
    { id: 'Monthly', label: 'Monthly', sub: '(1 month)' },
    { id: 'Quarterly', label: 'Quarterly', sub: '(3 months)' },
    { id: 'HalfYearly', label: 'Half Yearly', sub: '(6 months)' },
    { id: 'Yearly', label: 'Yearly', sub: '(12 months)' },
  ];

  const packageData = [
    {
      title: "Basic",
      desc: "Perfect for personal branding.",
      prices: { Monthly: "4,999", Quarterly: "13,499", HalfYearly: "24,999", Yearly: "45,999" },
      features: ["5 Social Media Posts", "Basic SEO", "Email Support", "1 Revision"],
      featured: false
    },
    {
      title: "Standard",
      desc: "Ideal for growing startups.",
      prices: { Monthly: "9,999", Quarterly: "26,999", HalfYearly: "49,999", Yearly: "89,999" },
      features: ["15 Social Media Posts", "Advanced SEO", "WhatsApp Support", "3 Revisions"],
      featured: true // Orange highlight
    },
    {
      title: "Premium",
      desc: "Full digital transformation.",
      prices: { Monthly: "19,999", Quarterly: "53,999", HalfYearly: "99,999", Yearly: "1,79,999" },
      features: ["30 Social Media Posts", "Technical SEO", "Priority Support", "Unlimited Revisions"],
      featured: false
    },
    {
      title: "Enterprise",
      desc: "Tailored for large corporations.",
      prices: { Monthly: "39,999", Quarterly: "1,07,999", HalfYearly: "1,99,999", Yearly: "3,59,999" },
      features: ["Custom Strategy", "Ad Campaign Mgmt", "Dedicated Manager", "Full Tech Support"],
      featured: false
    }
  ];

  return (
    <div className="font-montserrat text-slate-800 overflow-hidden">
      
      {/* --- SECTION 1: EXPECTED RESULTS --- */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Results You Can Expect</h2>
            <p className="text-slate-500 font-medium">Data-backed growth for your digital footprint.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((res, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border-b-4 border-[#3D7E8C]">
                <CheckCircle className="text-[#3D7E8C]" size={24} />
                <span className="font-bold text-lg">{res}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: VIDEO CAROUSEL (MAX 4 CARDS) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
    What our <span className="text-[#F39221]">Clients </span> say <span className="text-[#3D7E8C]">About us</span>
  </h2>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-sm">Showing {currentIndex + 1}-{Math.min(currentIndex + cardsToShow, allClients.length)} of {allClients.length}</p>
          </div>
          
          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode='wait'>
              {allClients.slice(currentIndex, currentIndex + cardsToShow).map((client) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col h-full shadow-sm"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <video 
                      src={client.video}
                      autoPlay loop muted playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full">
                          <Play size={12} className="text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-slate-600 font-bold text-sm italic mb-4 leading-snug flex-grow">
                      "{client.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-8 h-8 rounded-full bg-[#3D7E8C] flex items-center justify-center text-white text-xs font-black">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-xs text-slate-900">{client.name}</h4>
                        <p className="text-[10px] text-[#F39221] font-bold">{client.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

    <section className="py-24 px-6 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Our <span className="text-[#F39221]">Packages</span>
          </h2>
          <div className="w-24 h-2 bg-[#3D7E8C] mx-auto rounded-full"></div>
        </div>

        {/* 4-Duration Toggle Bar */}
{/* --- WIDER BOLD DURATION TOGGLE --- */}
<div className="flex justify-center mb-20 px-6">
  <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full max-w-7xl">
    {durations.map((d) => (
      <button
        key={d.id}
        onClick={() => setActiveTab(d.id)}
        className={`flex flex-col items-center justify-center flex-1 min-w-[200px] py-8 rounded-[2.5rem] transition-all duration-300 border-2 ${
          activeTab === d.id 
          ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105 z-10' 
          : 'bg-white border-slate-100 text-slate-400 hover:border-[#3D7E8C]/50 hover:bg-slate-50'
        }`}
      >
        <span className="text-lg font-black uppercase tracking-[0.2em]">
          {d.label}
        </span>
        <span className={`text-xs font-bold mt-1 uppercase tracking-widest ${
          activeTab === d.id ? 'text-[#F39221]' : 'text-slate-400'
        }`}>
          {d.sub}
        </span>

        {/* The little teal indicator bar from your header style */}
        {activeTab === d.id && (
          <motion.div 
            layoutId="activeUnderline"
            className="w-12 h-1.5 bg-[#3D7E8C] mt-4 rounded-full"
          />
        )}
      </button>
    ))}
  </div>
</div>
        {/* 4 Pricing Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {packageData.map((pkg, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-[2.5rem] border-2 flex flex-col transition-all duration-500 hover:shadow-2xl bg-[#3D7E8C] ${
                pkg.featured ? 'border-[#F39221] shadow-xl scale-105 z-10' : 'border-slate-100'
              }`}
            >
              <h3 className="text-2xl font-black mb-2 text-white">{pkg.title}</h3>
              <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed">{pkg.desc}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-black text-[#F39221]">₹{pkg.prices[activeTab]}</span>
                <span className="text-slate-200 font-bold ml-1">/-</span>
                <p className="text-[10px] text-slate-200 font-bold uppercase mt-1 tracking-widest">
                  Total for {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </p>
              </div>

              <div className="space-y-4 flex-grow mb-8">
                {pkg.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-bold text-white">
                    <CheckCircle size={16} className="text-[#3D7E8C] shrink-0" /> 
                    {f}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl border-none text-white font-black uppercase tracking-widest transition-transform active:scale-95 bg-[#F39221] 
              `}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* --- SECTION: FAQ --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">FAQ Section</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white shadow-sm cursor-pointer">
                <summary className="flex items-center justify-between font-black text-slate-800 list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="text-[#3D7E8C]" size={20} />
                    {faq.question}
                  </div>
                  <ChevronDown className="group-open:rotate-180 transition-transform" size={20} />
                </summary>
                <p className="mt-4 text-slate-600 font-medium pl-8 border-l-2 border-[#3D7E8C]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultHero;
