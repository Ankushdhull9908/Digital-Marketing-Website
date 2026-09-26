import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Share2, CheckCircle2, ArrowLeft, Heart, MessageCircle, Users } from 'lucide-react';

export default function SmmPage() {
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
                <Share2 size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Social Media Marketing (SMM)
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                Build brand awareness, engage audience communities, and drive paid acquisition across Instagram, Facebook, and LinkedIn.
              </p>
              <a href="#contact" className="inline-block px-8 py-4 bg-[#F39221] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#ED9A3B] transition-colors shadow-lg shadow-[#F39221]/20">
                Grow Your Brand
              </a>
            </div>
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="text-[#3D7E8C]" /> SMM Deliverables
              </h3>
              <ul className="space-y-4 text-slate-700 font-bold text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> Custom Visual & Video Content</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> Paid Social Ad Campaigns</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> Community & Comment Management</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#3D7E8C]" /> Influencer Partnership Setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-12 text-center text-slate-900">Platforms We Specialize In</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-100">
            <Heart className="text-[#3D7E8C] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Instagram & Meta</h3>
            <p className="text-slate-600 text-sm">High-converting visual reels, carousel posts, and targeted Meta ads.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-100">
            <Users className="text-[#F39221] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">LinkedIn Marketing</h3>
            <p className="text-slate-600 text-sm">B2B lead generation, thought leadership branding, and executive networking.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-100">
            <MessageCircle className="text-[#3D7E8C] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Community Building</h3>
            <p className="text-slate-600 text-sm">Turn casual social followers into passionate brand advocates and customers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}