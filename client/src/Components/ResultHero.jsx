import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, HelpCircle, 
  ChevronDown, Play
} from 'lucide-react';
import { useAuth } from "../context/Context";

const ResultHero = () => {
  const { faqs } = useAuth(); 
  const [activeTab, setActiveTab] = useState('Monthly');

  const allClients = [
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

  const results = [
    "Higher Google Rankings", "More Website Traffic", 
    "Better Lead Generation", "Increased Sales", 
    "Strong Online Presence"
  ];

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
      featured: true
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
    <div className="font-montserrat text-base-content overflow-hidden w-full">
      
      {/* --- SECTION 1: EXPECTED RESULTS --- */}
      {/* 1. Changed bg-slate-50 to bg-base-200 for a responsive sectional contrast */}
      <section className="py-20 px-6 bg-base-200 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* 2. Added text-base-content to make sure the main header flips color */}
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-base-content">Results You Can Expect</h2>
            {/* 3. Changed text-slate-500 to text-base-content/70 for adaptive subtext */}
            <p className="text-base-content/70 font-medium">Data-backed growth for your digital footprint.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((res, i) => (
              /* 4. Changed bg-white to bg-base-100 so the cards look crisp and clean in both modes.
                    Added text-base-content here to guarantee readability of the {res} item string. */
              <div key={i} className="flex items-center gap-4 p-6 bg-base-100 text-base-content rounded-2xl shadow-sm border-b-4 border-[#3D7E8C]">
                <CheckCircle className="text-[#3D7E8C]" size={24} />
                <span className="font-bold text-lg">{res}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: VIDEO MARQUEE (FIXED: TRUE EDGE-TO-EDGE RECTANGLE) --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee-infinite 40s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <section className="py-24 bg-base-100 overflow-hidden w-full px-0"> {/* px-0 is critical here */}
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            What our <span className="text-[#F39221]">Clients</span> say <span className="text-base-content">About us</span>
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
            Success Stories in Motion
          </p>
        </div>

        {/* Outer wrapper: no padding, no max-width */}
        <div className="relative w-full bg-slate-950 overflow-hidden">
          <div className="animate-marquee-infinite flex">
            {[...allClients, ...allClients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="w-[300px] md:w-[450px] bg-slate-950 border-r border-slate-600 flex flex-col group transition-all duration-500 rounded-none"
              >
                {/* Video - No rounded corners */}
                <div className="relative aspect-video bg-black overflow-hidden rounded-none">
                  <video 
                    src={client.video}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-none"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-xl p-2 rounded-full border border-white/20">
                      <Play size={12} className="text-slate-300 fill-slate-300" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Text Content */}
                <div className="p-8 flex flex-col flex-grow rounded-none">
                  <p className="text-slate-300 font-medium text-base italic mb-6 leading-relaxed flex-grow">
                    "{client.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#3D7E8C] to-[#F39221] flex items-center justify-center text-white text-base font-black">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-white tracking-tight">{client.name}</h4>
                      <p className="text-[9px] text-[#F39221] font-black uppercase tracking-widest">{client.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Side Fades - Reduced for a cleaner edge-to-edge look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950/40 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950/40 to-transparent z-10" />
        </div>
      </section>

      {/* --- SECTION 3: PRICING --- */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Our <span className="text-[#F39221]">Packages</span>
            </h2>
            <div className="w-24 h-2 bg-[#3D7E8C] mx-auto rounded-full"></div>
          </div>

          {/* Duration Toggle */}
          <div className="flex justify-center mb-20 px-6">
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full max-w-7xl">
              {durations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveTab(d.id)}
                  className={`flex flex-col items-center justify-center flex-1 min-w-[180px] py-8 rounded-[2.5rem] transition-all duration-300 border-2 ${
                    activeTab === d.id 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105 z-10' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-[#3D7E8C]/50'
                  }`}
                >
                  <span className="text-base font-black uppercase tracking-[0.2em]">{d.label}</span>
                  <span className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${activeTab === d.id ? 'text-[#F39221]' : 'text-slate-400'}`}>
                    {d.sub}
                  </span>
                  {activeTab === d.id && (
                    <motion.div layoutId="activeUnderline" className="w-12 h-1.5 bg-[#3D7E8C] mt-4 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packageData.map((pkg, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`relative p-10 rounded-[3rem] border-2 flex flex-col transition-all duration-500 overflow-hidden ${
                  pkg.featured 
                    ? 'bg-slate-900 border-[#F39221] shadow-2xl scale-105 z-10' 
                    : 'bg-slate-950 border-white/5'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-6 right-8 bg-[#F39221] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-3 text-white tracking-tight">{pkg.title}</h3>
                  <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed h-12">{pkg.desc}</p>
                </div>

                <div className="mb-10 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-300 ">₹{pkg.prices[activeTab]}</span>
                    <span className="text-slate-500 text-lg font-bold">/-</span>
                  </div>
                </div>

                <div className="space-y-5 flex-grow mb-12 relative z-10">
                  {pkg.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-4 text-xs font-bold text-slate-300">
                      <CheckCircle size={14} className="text-[#3D7E8C] mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button className="relative z-10 w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all bg-[#f39121] text-black hover:bg-[#ed9a3b]">
                  Get Started Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: FAQ --- */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">FAQ Section</h2>
          <div className="space-y-4">
            {faqs && faqs.map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-base-100 shadow-sm cursor-pointer">
                <summary className="flex items-center justify-between font-black text-base-content list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="text-[#3D7E8C]" size={20} />
                    {faq.question}
                  </div>
                  <ChevronDown className="group-open:rotate-180 transition-transform" size={20} />
                </summary>
                <p className="mt-4 text-base-content font-medium pl-8 border-l-2 border-[#3D7E8C]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultHero;