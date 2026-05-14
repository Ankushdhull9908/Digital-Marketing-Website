import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  Search,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
const WhySEO = () => {
  const benefits = [
    {
      title: "Online Visibility",
      desc: "Rank on the first page of Google, making it easier for potential customers to find you.",
      icon: <Globe className="text-blue-500" />
    },
    {
      title: "Targeted Traffic",
      desc: "Attract users who are actively searching for your specific products or services.",
      icon: <Target className="text-red-500" />
    },
    {
      title: "Cost-Effective",
      desc: "Unlike paid ads, SEO delivers sustainable long-term results and a superior ROI.",
      icon: <DollarSign className="text-emerald-500" />
    },
    {
      title: "Trust & Credibility",
      desc: "High rankings signal to users that your business is an industry leader.",
      icon: <ShieldCheck className="text-[#3D7E8C]" />
    },
    {
      title: "24/7 Growth",
      desc: "SEO works continuously, generating leads even while you sleep.",
      icon: <Clock className="text-amber-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 font-montserrat text-base-content overflow-x-hidden">
      
      {/* --- HERO's SECTION --- */}
      <header className="relative py-20 px-6 bg-base-100 border-b border-base-300 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="badge badge-lg bg-[#3D7E8C] border-none text-base-content font-bold py-4 mb-6">GROW ORGANICALLY</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
              Why SEO is Crucial for Your <span className="text-[#F39221]">Business Success.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium mb-8">
              In today’s digital world, having a website is just the start. If you aren't visible on Google, you're invisible to your customers.
            </p>
            <button className="btn btn-lg bg-slate-900 text-white rounded-xl px-8 hover:scale-105 transition-transform group">
              Start Your Growth <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/3 bg-base-100 p-8 rounded-[2.5rem] shadow-2xl border border-base-300"
          >
            <BarChart3 className="text-[#3D7E8C] mb-4" size={48} />
            <h3 className="text-2xl font-black mb-2">Beat the Competition</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              SEO helps you rank higher in search results, bringing in quality leads and long-term growth without relying on expensive paid ads.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3D7E8C]/5 rounded-full blur-[100px]" />
      </header>

      {/* --- BENEFITS GRID --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-4">The Impact of Ranking</h2>
          <div className="w-24 h-1.5 bg-[#F39221] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="p-10 bg-base-100 border border-base-300 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-base-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h4 className="text-xl font-black mb-4">{b.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
          
          {/* SPECIAL INCLUSIONS CARD */}
          <div className="lg:col-span-1 bg-base-100 rounded-[2rem] p-10 text-base-content flex flex-col justify-between">
            <h4 className="text-xl font-black mb-6">Our SEO Suite Includes:</h4>
            <ul className="space-y-3">
              {["Keyword Strategy", "On-Page SEO", "Technical Fixes", "Content Optimization", "Backlink Building", "Local SEO"].map(item => (
                <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <CheckCircle2 className="text-[#3D7E8C]" size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-6 bg-base-100">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Simple, Transparent <span className="text-[#3D7E8C]">Pricing.</span></h2>
            <p className="text-slate-500 font-medium mb-12">Affordable and result-driven services for businesses of all sizes.</p>
            
            <div className="bg-base-100 border-2 border-[#3D7E8C]/20 rounded-[3rem] p-8 md:p-14 shadow-2xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3D7E8C] text-base-content px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    Most Popular
                </div>
                
                <div className="mb-10">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Starting Package</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-5xl font-black">₹9,999</span>
                        <span className="text-slate-400 font-bold">/ Month</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
                    {["Custom Strategy", "Website Optimization", "Monthly Reporting", "Dedicated Support"].map(item => (
                        <div key={item} className="flex items-center gap-3 p-4 bg-base-100 rounded-xl border border-base-300">
                            <CheckCircle2 className="text-emerald-500" size={20} />
                            <span className="font-bold text-sm text-base-content">{item}</span>
                        </div>
                    ))}
                </div>

                <button className="btn btn-block btn-lg bg-[#F39221] hover:bg-[#d8821d] border-none text-base-content rounded-2xl font-black tracking-widest uppercase">
                    Select This Plan
                </button>
            </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US & CTA --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-black mb-8">Why Choose <span className="text-[#3D7E8C]">WebTech?</span></h2>
                <div className="space-y-6">
                    {[
                        { t: "Expertise", d: "Highly experienced SEO specialists who know the algorithm." },
                        { t: "Proven Growth", d: "Strategies focused on real leads and sales, not just traffic." },
                        { t: "Transparency", d: "Regular work reports and a fully transparent process." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#3D7E8C]/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="text-[#3D7E8C]" size={18} />
                            </div>
                            <div>
                                <h5 className="font-black text-lg">{item.t}</h5>
                                <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-base-100 rounded-[3rem] p-12 text-base-content text-center">
                <h3 className="text-3xl font-black mb-6">Get Started Today!</h3>
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    Want to grow your business online and get more customers organically? Let’s take your website to the top of Google!
                </p>
                <div className="flex flex-col gap-4">
                    <Link to="/contact" className="btn btn-white bg-white text-slate-900 border-none rounded-xl font-black uppercase tracking-widest hover:bg-slate-200">
                        Contact Us Now
                    </Link>
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">No strings attached. Free consultation.</p>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default WhySEO;
