import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  ArrowUpRight, 
  Info, 
  ChevronRight,
  Target,
  Sparkles
} from 'lucide-react';
const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(15);
  const [returnRate, setReturnRate] = useState(12);

  const [results, setResults] = useState({
    totalInvested: 0,
    estimatedReturns: 0,
    totalValue: 0,
    wealthGainMult: 0
  });

  useEffect(() => {
    const i = returnRate / 12 / 100;
    const n = investmentPeriod * 12;
    const totalValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthlyInvestment * n;
    
    setResults({
      totalInvested: Math.round(invested),
      estimatedReturns: Math.round(totalValue - invested),
      totalValue: Math.round(totalValue),
      wealthGainMult: (totalValue / invested).toFixed(1)
    });
  }, [monthlyInvestment, investmentPeriod, returnRate]);

  const formatter = (val) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(val);

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6 font-montserrat text-base-content overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-gradient-to-b from-base-300 to-transparent opacity-50 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        
        {/* TOP NAV/HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#3D7E8C] uppercase mb-2">
              <Sparkles size={14} /> Intelligence Finance
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Compounding <span className="text-slate-300">Engine.</span></h1>
          </div>
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BENTO GRID: LEFT (INPUTS) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Input Card 1: Amount */}
            <div className="p-8 bg-base-100 border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex justify-between items-center mb-8">
                <div className="p-3 bg-base-200 rounded-2xl group-hover:bg-[#3D7E8C] group-hover:text-base-100 transition-colors">
                  <Wallet size={20} />
                </div>
                <input 
                  type="number" value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="text-right font-black text-2xl w-32 focus:outline-none bg-transparent"
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Monthly Deposit</p>
              <input 
                type="range" min="500" max="100000" step="500" 
                value={monthlyInvestment} 
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="range range-xs range-primary" 
              />
            </div>

            {/* Input Card 2: Return */}
            <div className="p-8 bg-base-100 border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex justify-between items-center mb-8">
                <div className="p-3 bg-base-200 rounded-2xl group-hover:bg-[#F39221] group-hover:text-base-100 transition-colors">
                  <TrendingUp size={20} />
                </div>
                <div className="flex items-baseline">
                  <input 
                    type="number" value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="text-right font-black text-2xl w-16 focus:outline-none bg-transparent"
                  />
                  <span className="font-bold text-slate-400 ml-1">%</span>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Expected Growth</p>
              <input 
                type="range" min="1" max="30" step="0.1" 
                value={returnRate} 
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="range range-xs range-secondary" 
              />
            </div>

            {/* Input Card 3: Duration */}
            <div className="p-8 bg-base-100 border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex justify-between items-center mb-8">
                <div className="p-3 bg-base-200 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="flex items-baseline">
                  <input 
                    type="number" value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="text-right font-black text-2xl w-16 focus:outline-none bg-transparent"
                  />
                  <span className="font-bold text-slate-400 ml-1">Yrs</span>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-base-400 mb-4">Time Horizon</p>
              <input 
                type="range" min="1" max="40" step="1" 
                value={investmentPeriod} 
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="range range-xs range-accent" 
              />
            </div>
          </div>

          {/* BENTO GRID: RIGHT (RESULTS) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LARGE TOTAL VALUE CARD */}
            <div className="md:col-span-2 bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between group">
              {/* Background Art */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#3D7E8C] rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Projection Data</div>
                    <div className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Live
                    </div>
                </div>
                <p className="text-slate-400 font-bold text-sm mb-4">Future Estimated Wealth</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10">
                    {formatter(results.totalValue)}
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-end justify-between relative z-10">
                <div className="flex gap-10">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Invested</p>
                        <p className="text-2xl font-bold">{formatter(results.totalInvested)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Gains</p>
                        <p className="text-2xl font-bold text-emerald-400">{formatter(results.estimatedReturns)}</p>
                    </div>
                </div>
                <button className="btn btn-lg bg-[#F39221] hover:bg-[#d8821d] border-none text-white rounded-2xl px-10 font-black group">
                    ACTION PLAN <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* SMALL INSIGHT CARD 1 */}
            <div className="bg-base-200 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between hover:bg-base-100 transition-colors duration-300">
                <Target className="text-[#3D7E8C] mb-6" size={32} />
                <div>
                    <h4 className="font-black text-4xl mb-2">{results.wealthGainMult}x</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Wealth Multiplier Effect</p>
                </div>
            </div>

            {/* SMALL INSIGHT CARD 2 */}
            <div className="bg-base-200 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between hover:bg-base-100 transition-colors duration-300">
                <div className="flex justify-between items-start mb-6">
                    <Info className="text-slate-400" size={32} />
                    <ChevronRight className="text-slate-300" />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        Compounding works best with time. Increasing your duration by <span className="text-slate-900 font-bold">5 years</span> could potentially yield 40% more.
                    </p>
                </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SipCalculator
