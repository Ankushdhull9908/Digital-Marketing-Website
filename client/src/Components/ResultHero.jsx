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
  const allClient = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Creative Director",
      text: "The speed and precision of this platform changed our entire delivery pipeline. Truly elite.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Startup Founder",
      text: "I was able to launch my landing page in record time. The conversion rates are through the roof!",
      video: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-at-a-laptop-in-a-cafe-43152-large.mp4"
    },
    {
      id: 3,
      name: "Marcus Thorne",
      role: "E-commerce Expert",
      text: "Securing my domain and setting up the shop was seamless. Highly recommended for professionals.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-laptop-4422-large.mp4"
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      role: "Digital Nomad",
      text: "The portfolio maker is cinematic. My clients are consistently impressed by the presentation.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-using-a-laptop-at-her-office-desk-42503-large.mp4"
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee-slow 60s linear infinite;
        }

        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}} />
<section className="py-24 bg-white overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            What our <span className="text-[#F39221]">Clients</span> say <span className="text-[#3D7E8C]">About us</span>
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
            Success Stories in Motion
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee-slow flex gap-8 px-4">
            {/* Doubling the array for seamless infinite looping */}
            {[...allClient, ...allClient
              
            ].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="w-[350px] md:w-[450px] bg-slate-950 rounded-[3rem] overflow-hidden border border-white/5 flex flex-col h-full shadow-2xl group transition-all duration-500"
              >
                {/* Autoplay Video Section */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video 
                    src={client.video}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  {/* Floating Video Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-xl p-2.5 rounded-full border border-white/20">
                      <Play size={14} className="text-white fill-white" />
                    </div>
                  </div>
                  {/* Bottom Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-10 flex flex-col flex-grow">
                  <p className="text-slate-300 font-medium text-lg italic mb-8 leading-relaxed flex-grow">
                    "{client.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3D7E8C] to-[#F39221] flex items-center justify-center text-white text-lg font-black">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-white tracking-tight">{client.name}</h4>
                      <p className="text-[10px] text-[#F39221] font-black uppercase tracking-widest">{client.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edge Fades for a professional look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/50 to-transparent z-10" />
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
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {packageData.map((pkg, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative group p-10 rounded-[3rem] border-2 flex flex-col transition-all duration-500 overflow-hidden ${
        pkg.featured 
          ? 'bg-slate-900 border-[#F39221] shadow-[0_20px_50px_rgba(243,146,33,0.15)] scale-105 z-10' 
          : 'bg-slate-950 border-white/5 hover:border-white/20'
      }`}
    >
      {/* Decorative Glow for Featured Card */}
      {pkg.featured && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F39221] blur-[80px] opacity-20 pointer-events-none" />
      )}

      {/* Featured Badge */}
      {pkg.featured && (
        <div className="absolute top-6 right-8 bg-[#F39221] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
          Most Popular
        </div>
      )}

      {/* Header Section */}
      <div className="relative z-10">
        <h3 className="text-2xl font-black mb-3 text-white tracking-tight">{pkg.title}</h3>
        <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed h-12 overflow-hidden">
          {pkg.desc}
        </p>
      </div>

      {/* Pricing Section */}
      <div className="mb-10 relative z-10">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white">₹{pkg.prices[activeTab]}</span>
          <span className="text-slate-500 text-lg font-bold">/-</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-[2px] w-4 bg-[#F39221] rounded-full" />
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            Total for {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </p>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-5 flex-grow mb-12 relative z-10">
        {pkg.features.map((f, idx) => (
          <div key={idx} className="flex items-start gap-4 text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
            <div className="mt-0.5 rounded-full p-0.5 bg-[#3D7E8C]/20">
              <CheckCircle size={14} className="text-[#3D7E8C]" />
            </div>
            <span className="leading-tight">{f}</span>
          </div>
        ))}
      </div>

      {/* Modern Button */}
      <button className="relative z-10 w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-xl bg-[#f39121]  text-black hover:bg-[#ed9a3b] hover:shadow-[#F39221]/20
           
         ">
        Get Started Now
      </button>

      {/* Subtle Bottom Accent for non-featured cards */}
      {!pkg.featured && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
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
