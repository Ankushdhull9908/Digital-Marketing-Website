import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Hrportal = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    { 
      name: "Basic", 
      price: billingCycle === 'monthly' ? "$10" : "$90", 
      period: billingCycle === 'monthly' ? "/mo" : "/yr", 
      tag: "Startup",
      features: [
        { text: "Employee database management", included: true },
        { text: "Time-off management (Leave)", included: true },
        { text: "Onboarding and offboarding", included: false },
        { text: "Document management", included: false },
        { text: "HR reports", included: false },
        { text: "Zia AI bot", included: false },
      ]
    },
    { 
      name: "Growth", 
      price: billingCycle === 'monthly' ? "$29" : "$260", 
      period: billingCycle === 'monthly' ? "/mo" : "/yr", 
      tag: "Popular", 
      popular: true,
      features: [
        { text: "Employee database management", included: true },
        { text: "Time-off management (Leave)", included: true },
        { text: "Onboarding and offboarding", included: true },
        { text: "Document management", included: true },
        { text: "HR reports", included: false },
        { text: "Zia AI bot", included: false },
      ]
    },
    { 
      name: "Business", 
      price: billingCycle === 'monthly' ? "$49" : "$440", 
      period: billingCycle === 'monthly' ? "/mo" : "/yr", 
      tag: "Scale",
      features: [
        { text: "Employee database management", included: true },
        { text: "Time-off management (Leave)", included: true },
        { text: "Onboarding and offboarding", included: true },
        { text: "Document management", included: true },
        { text: "HR reports", included: true },
        { text: "Zia AI bot (Standard)", included: true },
      ]
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      period: "", 
      tag: "Custom Fit",
      features: [
        { text: "Employee database management", included: true },
        { text: "Time-off management (Leave)", included: true },
        { text: "Onboarding and offboarding", included: true },
        { text: "Document management", included: true },
        { text: "Advanced HR reports & analytics", included: true },
        { text: "Custom Zia AI bot training", included: true },
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-base-100 text-base-content antialiased overflow-x-hidden">
      
      {/* 1. HERO SECTION ➔ WHITE BACKGROUND (bg-base-100) */}
      <section className="relative py-24 lg:py-32 px-6 bg-base-100">
        {/* Ambient theme-colored blur orbs */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#3D7E8C]/10 rounded-full filter blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-24 right-1/4 w-96 h-96 bg-[#F39221]/5 rounded-full filter blur-3xl -z-10 animate-pulse delay-700" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image Container */}
          <div className="lg:col-span-5 w-full aspect-[11/12] rounded-[3rem] bg-base-200 p-4 shadow-xl border border-base-content/5 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3D7E8C]/20 to-[#F39221]/20 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <div 
              className="w-full h-full rounded-[2.2rem] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000')` }}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3D7E8C]/30 bg-base-100 shadow-sm text-[#3D7E8C] text-xs font-bold tracking-widest uppercase">
              ✨ Next-Gen HR Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#3D7E8C]">
              Smarter HR solution, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F39221] to-[#e07f0d]">
                tailored for your needs
              </span>
            </h1>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base font-medium text-base-content/80">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F39221]/10 flex items-center justify-center text-[#F39221] text-xs shrink-0">✓</span> 30-days free trial
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F39221]/10 flex items-center justify-center text-[#F39221] text-xs shrink-0">✓</span> No forced contracts
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F39221]/10 flex items-center justify-center text-[#F39221] text-xs shrink-0">✓</span> No credit cards required
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F39221]/10 flex items-center justify-center text-[#F39221] text-xs shrink-0">✓</span> Hassle-free setup
              </li>
            </ul>

            <div className="pt-4 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#3D7E8C]/60">
                HR management made simple, smart and efficient
              </p>
              <Link to="/contact" className="btn border-none bg-gradient-to-r from-[#F39221] to-[#e07f0d] text-white hover:opacity-95 shadow-xl shadow-[#F39221]/30 rounded-2xl px-10 py-4 h-auto text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 normal-case">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY SECTION ➔ GRAY BACKGROUND (bg-base-200) */}
      <section className="w-full py-14 bg-base-200 border-y border-base-content/5 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-xs tracking-[0.3em] uppercase font-black text-base-content/40">
            Trusted by 500+ forward-thinking companies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 select-none grayscale tracking-widest font-extrabold text-sm md:text-base text-[#3D7E8C]">
            <span>⚡︎ COMPANY_ALPHA</span>
            <span>⚡︎ COMPANY_BETA</span>
            <span>⚡︎ COMPANY_GAMMA</span>
            <span>⚡︎ COMPANY_DELTA</span>
          </div>
        </div>
      </section>

      {/* 3. DEEP DIVE SECTION ➔ WHITE BACKGROUND (bg-base-100) */}
      <section className="w-full py-24 px-6 bg-base-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase rounded-md bg-[#3D7E8C]/10 text-[#3D7E8C]">
              Deep Dive
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#3D7E8C]">
              Engineered to optimize your <span className="text-[#F39221]">internal workflows</span>
            </h3>
            <p className="text-base text-base-content/70 leading-relaxed">
              Automate onboarding, lifecycle data tracking, and dynamic compliance filing structures without manual intervention overhead.
            </p>
          </div>

          <div className="w-full aspect-[4/3] rounded-[2.5rem] bg-base-200 p-3 shadow-xl border border-base-content/5 overflow-hidden relative group">
            <div 
              className="w-full h-full rounded-[2rem] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000')` }}
            />
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION ➔ GRAY BACKGROUND (bg-base-200) */}
      <section className="w-full py-24 bg-base-200 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 bg-gradient-to-br from-[#3D7E8C] to-[#2a5963] text-white rounded-2xl flex items-center justify-center text-xl mx-auto shadow-lg shadow-[#3D7E8C]/20">
            ✦
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#3D7E8C]">
            Why choose <span className="text-[#F39221]">us?</span>
          </h2>
          <p className="text-base-content/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            We are the best in the business, and we have the best customer service. Our engineering team builds security-first components down to the operational layer.
          </p>
        </div>
      </section>

      {/* 5. PRICING SECTION ➔ WHITE BACKGROUND (bg-base-100) */}
      <section className="w-full py-24 px-6 bg-base-100">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#3D7E8C]">
              Flexible plans for <span className="text-[#F39221]">any scale</span>
            </h2>
            
            {/* Toggle switch */}
            <div className="inline-flex p-1.5 rounded-2xl bg-base-200 border border-base-content/5 shadow-sm">
              <button 
                className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-[#3D7E8C] text-white shadow-md' : 'text-base-content/60 hover:text-[#3D7E8C]'}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${billingCycle === 'yearly' ? 'bg-[#3D7E8C] text-white shadow-md' : 'text-slate-500 hover:text-[#3D7E8C]'}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly (Save 25%)
              </button>
            </div>
          </div>

          {/* Pricing Grid - Cards are elevated to bg-base-200 for sleek contrast layer over base-100 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative rounded-[2rem] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 bg-base-200 border ${plan.popular ? 'border-[#F39221] shadow-2xl ring-2 ring-[#F39221]/20 scale-[1.02] lg:scale-[1.05]' : 'border-base-content/5 shadow-md'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#F39221] to-[#e07f0d] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                    {plan.tag}
                  </span>
                )}
                
                <div>
                  <div className="space-y-3">
                    {!plan.popular && <span className="text-[10px] uppercase font-black tracking-widest text-[#3D7E8C]">{plan.tag}</span>}
                    <h3 className="text-xl font-black text-base-content">{plan.name}</h3>
                    <div className="pt-2">
                      <span className="text-4xl font-black tracking-tight text-[#3D7E8C]">{plan.price}</span>
                      <span className="text-xs font-semibold text-base-content/40">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3.5 text-xs border-t border-base-content/5 pt-6">
                    {plan.features.map((feat, fIdx) => (
                      <li 
                        key={fIdx} 
                        className={`flex items-start gap-2.5 font-medium ${feat.included ? 'text-base-content' : 'text-base-content/30 line-through'}`}
                      >
                        {feat.included ? (
                          <span className="text-[#3D7E8C] font-black shrink-0 text-sm">✓</span>
                        ) : (
                          <span className="text-base-content/20 font-black shrink-0 text-sm">✕</span>
                        )}
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 w-full">
                  <button className={`btn btn-md w-full rounded-xl normal-case font-bold border transition-all duration-200 ${plan.popular ? 'border-none bg-gradient-to-r from-[#F39221] to-[#e07f0d] text-white hover:opacity-90 shadow-lg' : 'border-base-content/10 bg-base-100 text-base-content hover:bg-[#3D7E8C] hover:text-white hover:border-[#3D7E8C]'}`}>
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION ➔ GRAY BACKGROUND (bg-base-200) */}
      <section className="w-full py-24 bg-base-200 px-6 border-t border-base-content/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-black tracking-tight text-[#3D7E8C]">
            Contact <span className="text-[#F39221]">Us</span>
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-md mx-auto leading-relaxed">
            Have questions? Get in touch with our team. We provide round-the-clock implementation support.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="btn bg-base-100 border-2 border-[#3D7E8C] text-[#3D7E8C] hover:bg-[#3D7E8C] hover:text-white hover:border-[#3D7E8C] rounded-2xl px-10 py-3 h-auto text-base font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5">
              Drop a Message
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hrportal;