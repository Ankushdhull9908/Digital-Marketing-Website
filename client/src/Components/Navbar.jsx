import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";

import { LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react";

const Navbar = () => {
  //
  const nav = useNavigate();
  const { user, logout } = useAuth();
  const mobileDetailsRef = useRef(null);
 const MARQUEE_ITEMS = ["Influencer Marketing","Brand Partnerships","Content Strategy","Audience Growth","Campaign Analytics","ROI Tracking","Creator Economy","Authentic Reach"];
const style = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-container {
      display: flex;
      width: max-content;
      animation: marquee 30s linear infinite;
    }
    .marquee-container:hover {
      animation-play-state: paused;
    }
  `;
  const handleLinkClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (mobileDetailsRef.current) {
      mobileDetailsRef.current.removeAttribute("open");
    }
  };

  return (
    <>
   <style>{style}</style>
      
      {/* MARQUE */}
      <div className="overflow-hidden bg-slate-900 py-2.5 border-b border-white/5 select-none">
        <div className="marquee-container">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center mx-6 text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="w-1 h-1 bg-[#F39221] rounded-full mr-4 shadow-[0_0_8px_#F39221]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    <div className="navbar bg-base-100 text-base-content shadow-md px-4 lg:px-20 font-montserrat sticky top-0 z-[100]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/OurServices" onClick={handleLinkClick}>Our Services</Link></li>
            <li>
              <details ref={mobileDetailsRef}>
                <summary>Advance Features</summary>
                <ul className="p-2 bg-base-200 rounded-md">
                  <li><Link to="/resume-builder" onClick={handleLinkClick}>Resume Builder</Link></li>
                  <li><Link to="/PortfolioMaker" onClick={handleLinkClick}>Portfolio Maker</Link></li>
                  <li><Link to="/influencer-form" onClick={handleLinkClick}>Influencer Form</Link></li>
                  <li><Link to="/jobportal" onClick={handleLinkClick}>Job Portal</Link></li>
                  <li><a href="https://www.hostinger.com/in/free-domain?utm_id=381673073&msclkid=5b0f7f6e5c631613eac0168be30069bd&utm_source=bing&utm_medium=cpc&utm_campaign=Brand-Exact|NT:Bing|LO:IN&utm_term=hostinger&utm_content=Exact+|+Hostinger" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Buy Domain</a></li>
                  <li><Link to="/landingpage" onClick={handleLinkClick}>Landing Page</Link></li>
                </ul>
              </details>
            </li>
             <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
            <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
          </ul>
        </div>

        <Link className="flex items-center gap-2" to="/" onClick={handleLinkClick}>
          <img 
            src="/logos/logo.png"
            alt="WebTech Logo" 
            className="h-10 w-auto object-contain lg:h-16 rounded" 
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex items-center gap-8">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-sm w-32 lg:w-48 focus:input-primary"
          />
        </div>

        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li><Link to="/" className="hover:text-orange-600" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/OurServices" className="hover:text-orange-600" onClick={handleLinkClick}>Our Services</Link></li>

          <li className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="flex items-center gap-1">
              <h1 className="hover:text-orange-600">Advance Features</h1>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-xl bg-base-100 rounded-box w-52 top-full border border-base-200">
              <li><Link to="/resume-builder" className="hover:text-orange-600" onClick={handleLinkClick}>Resume Builder</Link></li>
              <li><Link to="/PortfolioMaker" className="hover:text-orange-600" onClick={handleLinkClick}>Portfolio Maker</Link></li>
              <li><Link to="/influencer-form" className="hover:text-orange-600" onClick={handleLinkClick}>Influencer Form</Link></li>
              <li><Link to="/jobportal" className="hover:text-orange-600" onClick={handleLinkClick}>Job Portal</Link></li>
              <li><a href="https://www.hostinger.com/in/free-domain?utm_id=381673073&msclkid=5b0f7f6e5c631613eac0168be30069bd&utm_source=bing&utm_medium=cpc&utm_campaign=Brand-Exact|NT:Bing|LO:IN&utm_term=hostinger&utm_content=Exact+|+Hostinger" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600" onClick={handleLinkClick}>Buy Domain</a></li>
              <li><Link to="/landingpage" className="hover:text-orange-600" onClick={handleLinkClick}>Landing Page</Link></li>
              <li><Link to="/SIPCalculator" className="hover:text-orange-600" onClick={handleLinkClick}>SIP Calculator</Link></li>
            </ul>
          </li>
           <li><Link to="/about" className="hover:text-orange-600" onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/contact" className="hover:text-orange-600" onClick={handleLinkClick}>Contact</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {!user ? (
          <button className="btn btn-primary btn-sm lg:btn-md p-2 px-6 rounded-lg">
            <Link to="/auth">Login | Signup</Link>
          </button>
        ) : (
          <div className="dropdown dropdown-end">
            {/* --- IMPROVED AVATAR SECTION --- */}
            <div 
              tabIndex={0} 
              role="button" 
              className="flex items-center gap-2 p-1 hover:bg-base-200 rounded-full transition-all border border-transparent active:scale-95"
            >
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
              </div>
              <ChevronDown size={14} className="text-base-content/50" />
            </div>

            {/* --- CLEAN PROFESSIONAL DROPDOWN --- */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-200 animate-in fade-in zoom-in duration-200"
            >
              {/* User Identity Header */}
              <div className="px-4 py-3 mb-2 border-b border-base-200">
                <p className="font-bold text-sm truncate">{user?.name || "Account"}</p>
                <p className="text-[11px] opacity-60 truncate">{user?.email || "User profile"}</p>
              </div>

              <li>
                <Link to="/dashboard" className="flex items-center gap-3 py-2.5 rounded-lg active:bg-primary" onClick={handleLinkClick}>
                  <LayoutDashboard size={18} className="text-primary" />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li>
                <Link to="/profile" className="flex items-center gap-3 py-2.5 rounded-lg" onClick={handleLinkClick}>
                  <User size={18} />
                  <span>Account Settings</span>
                </Link>
              </li>

              <div className="h-px bg-base-200 my-1"></div>

              <li>
                <button 
                  onClick={logout}
                  className="flex items-center gap-3 py-2.5 rounded-lg text-error hover:bg-error/10 font-semibold"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Navbar
