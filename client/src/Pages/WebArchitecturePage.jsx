import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, CheckCircle2, ArrowLeft, Code, Smartphone, Gauge } from 'lucide-react';

export default function WebArchitecturePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <section className="pt-12 pb-20 px-6 bg-[#F8FAFB] border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#3D7E8C] mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#F39221] mb-6">
                <Layout size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Web Architecture & Development
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                We craft responsive, lightning-fast, and highly converting websites built on modern scalable web technologies.
              </p>
              <a href="#contact" className="inline-block px-8 py-4 bg-[#F39221] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#ED9A3B] transition-colors shadow-lg shadow-[#F39221]/20">
                Build Your Website
              </a>
            </div>
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Code className="text-[#3D7E8C]" /> Web Standards
              </h3>
              <ul className="space-y-4 text-slate-700 font-bold text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> 100% Mobile Responsive Layouts</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> Optimized Core Web Vitals</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> Custom CMS & API Integrations</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> High Security & SSL Protection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-12 text-center text-slate-900">Engineering Excellence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-100">
            <Smartphone className="text-[#3D7E8C] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Mobile First</h3>
            <p className="text-slate-600 text-sm">Layouts tailored seamlessly for smartphones, tablets, and desktop displays.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-100">
            <Gauge className="text-[#F39221] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Sub-Second Speed</h3>
            <p className="text-slate-600 text-sm">Optimized assets and modern JavaScript frameworks for fast page renders.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-100">
            <Layout className="text-[#3D7E8C] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">UX & Conversion</h3>
            <p className="text-slate-600 text-sm">Designed specifically to guide users toward inquiries, bookings, or store checkout.</p>
          </div>
        </div>
      </section>
    </div>
  );
}