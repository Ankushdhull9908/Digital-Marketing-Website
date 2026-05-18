import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  TrendingUp, 
  Layers, 
  Clock,
  ArrowUpRight
} from "lucide-react";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const user = {
    name: "Keshav Goel",
    role: "Web Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  };

  const stats = [
    { id: 1, label: "Total Projects", value: "12", change: "+2 this month", icon: Layers, color: "text-[#3D7E8C]" },
    { id: 2, label: "Hours Logged", value: "148 hrs", change: "+12.3% vs last week", icon: Clock, color: "text-[#F39221]" },
    { id: 3, label: "Completion Rate", value: "94.2%", change: "+3.1% growth", icon: TrendingUp, color: "text-emerald-400" },
  ];

  return (
    // Changed main layout background to deep dark slate-950
    <div className="min-h-screen bg-base-950 text-base-100 flex relative font-sans overflow-x-hidden">
      
      {/* 1. SIDEBAR - Positioned BELOW the main header using top-20 or pt-20 if your main navbar is fixed */}
      <aside className={`pt-20 fixed inset-y-0 left-0 w-64 bg-base-900 border-r border-base-500 p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } z-30`}> 
        <div>
          {/* Brand/Logo */}
          <div className="flex items-center justify-between mb-10 pl-2">
            
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-base-400 hover:text-base-200 p-2 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "projects", label: "My Projects", icon: FolderOpen },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all relative group ${
                    activeTab === item.id ? "text-base-500" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="activeNavBg" 
                      className="absolute inset-0 bg-[#3D7E8C] border-l-4 border-[#F39221] rounded-2xl z-0"
                    />
                  )}
                  <Icon size={18} className={`z-10 transition-colors ${activeTab === item.id ? "text-[#F39221]" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span className="z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer inside Sidebar */}
        <div className="border-t border-base-800 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#3D7E8C]/40" />
            <div className="leading-tight">
              <h4 className="text-sm font-black tracking-tight text-white">{user.name}</h4>
              <span className="text-xs text-slate-400 font-medium">{user.role}</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-[#F39221] p-1.5 rounded-xl transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Navbar Header - Given high z-index (z-40) to always stay on top of the side navbar */}
        <header className="sticky top-0 bg-base-950/80 backdrop-blur-md z-40 px-6 lg:px-10 py-5 flex items-center justify-between border-b border-base-800/60">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-base-900 text-base-100 border border-base-800">
              <Menu size={20} />
            </button>
            <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tight hidden sm:block text-[#F39221]">
              Welcome back, <span className="text-[#3D7E8C]">Keshav</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size= {16} />
              <input 
                type="text" 
                placeholder="Search metrics or projects..." 
                className="w-full pl-10 pr-4 py-2 bg-base-900 border border-base-800 rounded-xl text-xs font-medium text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#3D7E8C] transition-colors"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-base-900 border border-base-800 text-slate-300 hover:text-[#F39221] relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#F39221] rounded-full" />
            </button>
          </div>
        </header>

        {/* Dashboard Panels */}
        <main className="flex-1 p-6 lg:p-10 space-y-10 max-w-7xl w-full mx-auto">
          
          {/* Featured Teal Card Banner */}
          <section className="relative overflow-hidden bg-[#16676e] border border-[#3D7E8C]/30 rounded-[2.5rem] p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#F39221]/10 to-transparent pointer-events-none" />
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-black bg-[#F39221] text-black px-3 py-1 rounded-full uppercase tracking-wider">Workspace Live</span>
              <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tight pt-2">Build beautiful user interfaces.</h2>
              <p className="text-slate-200 text-sm font-medium leading-relaxed">Track analytics pipelines, sprint milestones, and review pending customer resource actions directly inside your personal workspace hub.</p>
            </div>
            <button className="px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-[#F39221] text-black hover:bg-[#ed9a3b] transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#F39221]/15">
              Launch Creator <ArrowUpRight size={14} />
            </button>
          </section>

          {/* Stats Grid Rows */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((card) => {
              const StatIcon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -4 }}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/40 dynamic-icon">
                      <StatIcon size={20} className={card.color} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight text-white">{card.value}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">{card.change}</p>
                  </div>
                </motion.div>
              );
            })}
          </section>

        </main>
      </div>
    </div>
  );
};

export default UserDashboard;