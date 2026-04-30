import { useState, useEffect } from "react";

var API = "https://digital-marketing-temp.onrender.com/api/influencer"
  ? "https://digital-marketing-temp.onrender.com/api/influencer"
  : "http://localhost:5000/api/influencer";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --blue-950: #0a1628;
    --blue-900: #0f2044;
    --blue-800: #1a3a6e;
    --blue-700: #1e4d9b;
    --blue-600: #2563eb;
    --blue-500: #3b82f6;
    --blue-400: #60a5fa;
    --blue-300: #93c5fd;
    --blue-100: #dbeafe;
    --blue-50:  #eff6ff;
    --white: #ffffff;
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-400: #94a3b8;
    --gray-600: #475569;
    --gray-800: #1e293b;
    --accent: #06b6d4;
    --accent-light: #cffafe;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ip-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, var(--blue-950) 0%, var(--blue-900) 40%, #0d1f3c 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 16px 80px;
    position: relative;
    overflow: hidden;
  }

  .ip-root::before {
    content: '';
    position: fixed;
    top: -200px; left: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: floatOrb 10s ease-in-out infinite alternate;
  }
  .ip-root::after {
    content: '';
    position: fixed;
    bottom: -150px; right: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: floatOrb 13s ease-in-out infinite alternate-reverse;
  }

  @keyframes floatOrb {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.1); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* Header */
  .ip-header {
    text-align: center;
    margin-bottom: 48px;
    animation: fadeInUp 0.8s ease both;
    position: relative; z-index: 1;
  }
  .ip-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(37,99,235,0.2);
    border: 1px solid rgba(96,165,250,0.3);
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    color: var(--blue-300);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .ip-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    background: linear-gradient(120deg, #fff 30%, var(--blue-300) 70%, var(--accent) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
    line-height: 1.15;
    margin-bottom: 14px;
  }
  .ip-subtitle {
    color: var(--blue-300);
    font-size: 1.05rem;
    font-weight: 300;
    opacity: 0.85;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Toggle */
  .ip-toggle-wrap {
    display: flex;
    gap: 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(96,165,250,0.2);
    border-radius: 16px;
    padding: 6px;
    margin-bottom: 40px;
    animation: fadeInUp 0.8s 0.15s ease both;
    position: relative; z-index: 1;
  }
  .ip-toggle-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 36px;
    border-radius: 11px;
    border: none;
    font-family: 'Sora', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    position: relative;
    background: transparent;
    color: var(--blue-300);
  }
  .ip-toggle-btn.active {
    background: linear-gradient(135deg, var(--blue-600), var(--blue-500));
    color: white;
    box-shadow: 0 4px 24px rgba(37,99,235,0.5), 0 0 0 1px rgba(96,165,250,0.3);
  }
  .ip-toggle-btn:hover:not(.active) {
    background: rgba(255,255,255,0.06);
    color: white;
  }
  .ip-toggle-icon { font-size: 1.2rem; }

  /* Card */
  .ip-card {
    width: 100%;
    max-width: 720px;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(96,165,250,0.15);
    border-radius: 28px;
    padding: 44px 48px;
    position: relative; z-index: 1;
    animation: scaleIn 0.5s ease both;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
  }
  .ip-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(96,165,250,0.4), rgba(6,182,212,0.4), transparent);
    border-radius: 28px 28px 0 0;
  }

  .ip-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(96,165,250,0.12);
  }
  .ip-card-icon {
    width: 50px; height: 50px;
    background: linear-gradient(135deg, var(--blue-700), var(--blue-600));
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 16px rgba(37,99,235,0.4);
    flex-shrink: 0;
  }
  .ip-card-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
  }
  .ip-card-desc {
    font-size: 0.875rem;
    color: var(--blue-300);
    margin-top: 2px;
  }

  /* Form Grid */
  .ip-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .ip-form-grid .span2 { grid-column: span 2; }

  .ip-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .ip-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--blue-300);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .ip-input, .ip-select, .ip-textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(96,165,250,0.2);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    color: white;
    outline: none;
    transition: all 0.25s ease;
    width: 100%;
  }
  .ip-input::placeholder, .ip-textarea::placeholder { color: rgba(148,163,184,0.5); }
  .ip-input:focus, .ip-select:focus, .ip-textarea:focus {
    border-color: var(--blue-400);
    background: rgba(37,99,235,0.08);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
  }
  .ip-select option { background: var(--blue-900); color: white; }
  .ip-textarea { resize: vertical; min-height: 90px; }

  /* Input with icon */
  .ip-input-wrap { position: relative; }
  .ip-input-wrap .ip-input { padding-left: 40px; }
  .ip-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: var(--blue-400); font-size: 1rem; pointer-events: none;
  }

  /* Platforms */
  .ip-platforms {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 4px;
  }
  .ip-platform-chip {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 16px;
    border-radius: 100px;
    border: 1px solid rgba(96,165,250,0.25);
    background: rgba(255,255,255,0.04);
    color: var(--blue-300);
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.22s ease;
  }
  .ip-platform-chip.selected {
    background: linear-gradient(135deg, rgba(37,99,235,0.35), rgba(6,182,212,0.2));
    border-color: var(--blue-400);
    color: white;
    box-shadow: 0 0 12px rgba(37,99,235,0.25);
  }
  .ip-platform-chip:hover:not(.selected) { border-color: var(--blue-400); color: white; }

  /* Niche tags */
  .ip-niches {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }
  .ip-niche-tag {
    padding: 7px 16px;
    border-radius: 8px;
    border: 1px solid rgba(96,165,250,0.2);
    background: rgba(255,255,255,0.03);
    color: var(--blue-300);
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.22s ease;
    font-weight: 500;
  }
  .ip-niche-tag.selected {
    background: rgba(37,99,235,0.25);
    border-color: var(--blue-500);
    color: white;
  }
  .ip-niche-tag:hover:not(.selected) { border-color: var(--blue-400); color: white; }

  /* Range slider */
  .ip-range-wrap { position: relative; }
  .ip-range {
    width: 100%;
    -webkit-appearance: none;
    height: 4px;
    background: rgba(96,165,250,0.2);
    border-radius: 4px;
    outline: none;
    margin-top: 8px;
  }
  .ip-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    background: linear-gradient(135deg, var(--blue-500), var(--accent));
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(37,99,235,0.5);
  }
  .ip-range-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 0.75rem;
    color: var(--blue-400);
  }
  .ip-range-val {
    text-align: center;
    font-family: 'Sora', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--blue-300);
    margin-top: 6px;
  }

  /* Section divider */
  .ip-section-title {
    font-family: 'Sora', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ip-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(6,182,212,0.3), transparent);
  }

  /* Divider */
  .ip-divider {
    border: none;
    border-top: 1px solid rgba(96,165,250,0.1);
    margin: 28px 0;
  }

  /* Submit */
  .ip-submit {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--blue-600) 0%, var(--blue-500) 50%, var(--accent) 100%);
    background-size: 200% auto;
    color: white;
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.35s ease;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 24px rgba(37,99,235,0.4);
    margin-top: 8px;
    position: relative;
    overflow: hidden;
  }
  .ip-submit::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .ip-submit:hover {
    background-position: right center;
    box-shadow: 0 8px 32px rgba(37,99,235,0.6);
    transform: translateY(-1px);
  }
  .ip-submit:hover::before { opacity: 1; }
  .ip-submit:active { transform: translateY(0); }

  /* Success toast */
  .ip-toast {
    position: fixed;
    bottom: 32px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, var(--blue-700), var(--blue-600));
    color: white;
    padding: 14px 28px;
    border-radius: 14px;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    z-index: 9999;
    animation: fadeInUp 0.4s ease;
    border: 1px solid rgba(96,165,250,0.3);
    display: flex; align-items: center; gap: 10px;
  }

  /* Browse brands / influencers panel */
  .ip-browse-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .ip-browse-title {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: white;
  }
  .ip-filter-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .ip-filter-chip {
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid rgba(96,165,250,0.25);
    background: rgba(255,255,255,0.03);
    color: var(--blue-300);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ip-filter-chip.active {
    background: var(--blue-700);
    border-color: var(--blue-500);
    color: white;
  }
  .ip-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 8px;
  }
  .ip-mini-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(96,165,250,0.12);
    border-radius: 16px;
    padding: 18px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .ip-mini-card:hover {
    border-color: var(--blue-400);
    background: rgba(37,99,235,0.08);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
  .ip-mini-card-top {
    display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
  }
  .ip-avatar {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .ip-mini-name {
    font-family: 'Sora', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
  }
  .ip-mini-tag {
    font-size: 0.72rem;
    color: var(--blue-400);
    margin-top: 1px;
  }
  .ip-mini-stats {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .ip-mini-stat {
    font-size: 0.75rem;
    color: var(--blue-300);
  }
  .ip-mini-stat span {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    color: white;
    display: block;
    font-size: 0.85rem;
  }

  @media (max-width: 640px) {
    .ip-card { padding: 28px 20px; }
    .ip-form-grid { grid-template-columns: 1fr; }
    .ip-form-grid .span2 { grid-column: span 1; }
    .ip-cards-grid { grid-template-columns: 1fr; }
    .ip-toggle-btn { padding: 12px 22px; font-size: 0.85rem; }
  }
`;

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "youtube",   label: "YouTube",   icon: "▶️" },
  { id: "tiktok",    label: "TikTok",    icon: "🎵" },
  { id: "twitter",   label: "Twitter/X", icon: "🐦" },
  { id: "linkedin",  label: "LinkedIn",  icon: "💼" },
  { id: "facebook",  label: "Facebook",  icon: "📘" },
];
const NICHES = [
  "Fitness & Gym","Food & Cooking","Travel","Tech & Gadgets",
  "Fashion","Beauty","Finance","Gaming","Health & Wellness",
  "Lifestyle","Parenting","Education","Comedy","Music","Automotive",
];
const BRAND_NICHES = [
  "Gym & Fitness","Food & Beverage","Travel & Tourism","Tech Products",
  "Fashion & Apparel","Beauty & Skincare","Finance & Crypto","Gaming",
  "Health & Wellness","Lifestyle","Parenting","EdTech","Entertainment","Automotive",
];

function formatRange(val) {
  if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr+";
  if (val >= 100000)   return (val / 100000).toFixed(1) + "L";
  if (val >= 1000)     return (val / 1000).toFixed(0) + "K";
  return val;
}

export default function InfluencerPage() {
  const [role, setRole]               = useState(null);
  const [platforms, setPlatforms]     = useState([]);
  const [niches, setNiches]           = useState([]);
  const [brandNiches, setBrandNiches] = useState([]);
  const [followers, setFollowers]     = useState(50000);
  const [avgViews, setAvgViews]       = useState(20000);
  const [highestView, setHighestView] = useState(100000);
  const [audienceAge, setAudienceAge]       = useState("");
  const [audienceGender, setAudienceGender] = useState("");
  const [browseFilter, setBrowseFilter]     = useState("All");
  const [toast, setToast]             = useState("");
  const [loading, setLoading]         = useState(false);

  // live data from backend
  const [liveCampaigns,   setLiveCampaigns]   = useState([]);  // brands to browse (influencer sees)
  const [liveInfluencers, setLiveInfluencers] = useState([]);  // influencers to browse (brand sees)

  // saved profile ids (stored in localStorage so the same browser session can track)
  const [myInfluencerId, setMyInfluencerId] = useState(() => localStorage.getItem("myInfluencerId") || null);
  const [myCampaignId,   setMyCampaignId]   = useState(() => localStorage.getItem("myCampaignId")   || null);

  // apply modal
  const [applyModal, setApplyModal]   = useState(null); // campaign object
  const [applyMsg,   setApplyMsg]     = useState("");

  const [inf, setInf] = useState({
    name:"", handle:"", email:"", phone:"", bio:"",
    location:"", engRate:"", collabType:"", ratePerPost:"", pastCollaborations:"",
  });
  const [brand, setBrand] = useState({
    company:"", contact:"", email:"", phone:"", website:"",
    niche:"", influencerTier:"", platformPref:"", audienceLocation:"",
    budget:"", timeline:"", description:"", deliverables:"", collabType:"", specialNotes:"",
  });

  // Load browse data when role changes
  useEffect(() => {
    if (role === "influencer") {
      fetch(`${API}/campaigns`).then(r => r.json()).then(setLiveCampaigns).catch(console.error);
    }
    if (role === "brand") {
      fetch(`${API}/influencers`).then(r => r.json()).then(setLiveInfluencers).catch(console.error);
    }
  }, [role]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  const togglePlatform  = (id) => setPlatforms(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  const toggleNiche     = (n)  => setNiches(p => p.includes(n) ? p.filter(x=>x!==n) : [...p,n]);
  const toggleBrandNiche = (n) => setBrandNiches(p => p.includes(n) ? p.filter(x=>x!==n) : [...p,n]);

  // ── Submit influencer profile ──
  const handleInfluencerSubmit = async (e) => {
    e.preventDefault();
    if (!inf.name || !inf.handle || !inf.email) return showToast("❌ Name, handle and email are required");
    setLoading(true);
    try {
      const body = { ...inf, platforms, niches, followers, avgViews, highestView, audienceAge, audienceGender };
      const res  = await fetch(`${API}/influencers`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("myInfluencerId", data._id);
      setMyInfluencerId(data._id);
      showToast("✅ Influencer profile created! You can now apply to brand campaigns.");
      // Refresh campaigns list
      fetch(`${API}/campaigns`).then(r => r.json()).then(setLiveCampaigns);
    } catch (err) {
      showToast("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Submit brand campaign ──
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    if (!brand.company || !brand.email) return showToast("❌ Company name and email are required");
    setLoading(true);
    try {
      const body = { ...brand, niches: brandNiches };
      const res  = await fetch(`${API}/campaigns`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("myCampaignId", data._id);
      setMyCampaignId(data._id);
      showToast("✅ Brand campaign posted! Influencers can now apply.");
      // Refresh influencers list
      fetch(`${API}/influencers`).then(r => r.json()).then(setLiveInfluencers);
    } catch (err) {
      showToast("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Influencer applies to a campaign ──
  const handleApply = async () => {
    if (!myInfluencerId) return showToast("❌ Please create your influencer profile first (scroll up & submit)");
    if (!applyModal)     return;
    try {
      const res = await fetch(`${API}/campaigns/${applyModal._id}/apply`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ influencerId: myInfluencerId, message: applyMsg }),
      });
      const data = await res.json();
      if (res.status === 409) return showToast("⚠️ You've already applied to this campaign");
      if (!res.ok) throw new Error(data.error);
      showToast("✅ Application sent to " + applyModal.company + "!");
      setApplyModal(null); setApplyMsg("");
    } catch (err) {
      showToast("❌ " + err.message);
    }
  };

  // ── Filter browse items ──
  const browseFilters = role === "influencer"
    ? ["All", ...new Set(liveCampaigns.map(b => b.niche).filter(Boolean))]
    : ["All", ...new Set(liveInfluencers.flatMap(i => i.niches).filter(Boolean))];

  const filteredCampaigns   = browseFilter === "All" ? liveCampaigns : liveCampaigns.filter(b => b.niche === browseFilter);
  const filteredInfluencers = browseFilter === "All" ? liveInfluencers : liveInfluencers.filter(i => i.niches?.includes(browseFilter));

  return (
    <>
      <style>{styles /* your existing styles string */}</style>
      <div className="ip-root">

        {/* Header */}
        <div className="ip-header">
          <div className="ip-badge">✦ Influencer Platform ✦</div>
          <h1 className="ip-title">Connect. Collaborate. Grow.</h1>
          <p className="ip-subtitle">The bridge between creators and brands. Build real partnerships that move the needle.</p>
        </div>

        {/* Toggle */}
        <div className="ip-toggle-wrap">
          <button className={`ip-toggle-btn ${role==="influencer"?"active":""}`} onClick={()=>{setRole("influencer");setBrowseFilter("All");}}>
            <span className="ip-toggle-icon">🎙️</span> I'm an Influencer
          </button>
          <button className={`ip-toggle-btn ${role==="brand"?"active":""}`} onClick={()=>{setRole("brand");setBrowseFilter("All");}}>
            <span className="ip-toggle-icon">🏢</span> I'm a Brand
          </button>
        </div>

        {/* ── INFLUENCER FORM ── */}
        {role === "influencer" && (
          <div className="ip-card" key="inf">
            <div className="ip-card-header">
              <div className="ip-card-icon">🎙️</div>
              <div>
                <div className="ip-card-title">Influencer Profile</div>
                <div className="ip-card-desc">
                  {myInfluencerId ? "✅ Profile saved — scroll down to apply to campaigns" : "Fill in your details to get discovered by brands"}
                </div>
              </div>
            </div>

            <form onSubmit={handleInfluencerSubmit}>
              <div className="ip-section-title">Personal Info</div>
              <div className="ip-form-grid">
                <div className="ip-field">
                  <label className="ip-label">Full Name *</label>
                  <input className="ip-input" placeholder="Rahul Sharma" value={inf.name} onChange={e=>setInf({...inf,name:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Primary Handle *</label>
                  <div className="ip-input-wrap">
                    <span className="ip-input-icon">@</span>
                    <input className="ip-input" placeholder="yourhandle" value={inf.handle} onChange={e=>setInf({...inf,handle:e.target.value})} />
                  </div>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Email *</label>
                  <input className="ip-input" type="email" placeholder="you@email.com" value={inf.email} onChange={e=>setInf({...inf,email:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Phone</label>
                  <input className="ip-input" placeholder="+91 XXXXX XXXXX" value={inf.phone} onChange={e=>setInf({...inf,phone:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Location</label>
                  <input className="ip-input" placeholder="Mumbai, India" value={inf.location} onChange={e=>setInf({...inf,location:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Engagement Rate (%)</label>
                  <input className="ip-input" placeholder="e.g. 4.5" value={inf.engRate} onChange={e=>setInf({...inf,engRate:e.target.value})} />
                </div>
                <div className="ip-field span2">
                  <label className="ip-label">Bio / About You</label>
                  <textarea className="ip-textarea" placeholder="Tell brands your story..." value={inf.bio} onChange={e=>setInf({...inf,bio:e.target.value})} />
                </div>
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Platforms</div>
              <div className="ip-platforms">
                {PLATFORMS.map(p => (
                  <div key={p.id} className={`ip-platform-chip ${platforms.includes(p.id)?"selected":""}`} onClick={()=>togglePlatform(p.id)}>
                    {p.icon} {p.label}
                  </div>
                ))}
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Audience Stats</div>
              <div className="ip-form-grid">
                <div className="ip-field span2">
                  <label className="ip-label">Followers: <span style={{color:"white",fontWeight:700}}>{formatRange(followers)}</span></label>
                  <input type="range" className="ip-range" min="1000" max="10000000" step="1000" value={followers} onChange={e=>setFollowers(Number(e.target.value))} />
                  <div className="ip-range-labels"><span>1K</span><span>1Cr+</span></div>
                </div>
                <div className="ip-field span2">
                  <label className="ip-label">Avg Views/Post: <span style={{color:"white",fontWeight:700}}>{formatRange(avgViews)}</span></label>
                  <input type="range" className="ip-range" min="100" max="5000000" step="100" value={avgViews} onChange={e=>setAvgViews(Number(e.target.value))} />
                  <div className="ip-range-labels"><span>100</span><span>50L+</span></div>
                </div>
                <div className="ip-field span2">
                  <label className="ip-label">Highest Views: <span style={{color:"white",fontWeight:700}}>{formatRange(highestView)}</span></label>
                  <input type="range" className="ip-range" min="1000" max="50000000" step="1000" value={highestView} onChange={e=>setHighestView(Number(e.target.value))} />
                  <div className="ip-range-labels"><span>1K</span><span>5Cr+</span></div>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Audience Age</label>
                  <select className="ip-select" value={audienceAge} onChange={e=>setAudienceAge(e.target.value)}>
                    <option value="">Select</option>
                    <option>13–17</option><option>18–24</option><option>25–34</option><option>35–44</option><option>45+</option>
                  </select>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Audience Gender</label>
                  <select className="ip-select" value={audienceGender} onChange={e=>setAudienceGender(e.target.value)}>
                    <option value="">Select</option>
                    <option>Mostly Male</option><option>Mostly Female</option><option>Other</option>
                  </select>
                </div>
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Content Niches</div>
              <div className="ip-niches">
                {NICHES.map(n => (
                  <div key={n} className={`ip-niche-tag ${niches.includes(n)?"selected":""}`} onClick={()=>toggleNiche(n)}>{n}</div>
                ))}
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Collaboration Preferences</div>
              <div className="ip-form-grid">
                <div className="ip-field">
                  <label className="ip-label">Collab Type</label>
                  <select className="ip-select" value={inf.collabType} onChange={e=>setInf({...inf,collabType:e.target.value})}>
                    <option value="">Select</option>
                    <option>Paid Partnership</option><option>Barter / Free Product</option>
                    <option>Affiliate</option><option>Long-term Ambassador</option><option>Open to all</option>
                  </select>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Rate per Post (₹)</label>
                  <input className="ip-input" placeholder="e.g. 15000" value={inf.ratePerPost} onChange={e=>setInf({...inf,ratePerPost:e.target.value})} />
                </div>
                <div className="ip-field span2">
                  <label className="ip-label">Past Collaborations</label>
                  <textarea className="ip-textarea" placeholder="Brands you've worked with..." style={{minHeight:70}} value={inf.pastCollaborations} onChange={e=>setInf({...inf,pastCollaborations:e.target.value})} />
                </div>
              </div>

              <button type="submit" className="ip-submit" disabled={loading}>
                {loading ? "⏳ Saving..." : myInfluencerId ? "🔄 Update My Profile" : "🚀 Create My Influencer Profile"}
              </button>
            </form>

            {/* Browse Campaigns */}
            <hr className="ip-divider" />
            <div className="ip-section-title">Browse Brand Campaigns</div>
            <div className="ip-filter-row">
              {browseFilters.map(f => (
                <div key={f} className={`ip-filter-chip ${browseFilter===f?"active":""}`} onClick={()=>setBrowseFilter(f)}>{f}</div>
              ))}
            </div>
            {filteredCampaigns.length === 0 && (
              <p style={{color:"rgba(148,163,184,0.5)",fontSize:"0.85rem",textAlign:"center",padding:"20px 0"}}>No campaigns available yet</p>
            )}
            <div className="ip-cards-grid">
              {filteredCampaigns.map((b) => (
                <div key={b._id} className="ip-mini-card" onClick={() => setApplyModal(b)}>
                  <div className="ip-mini-card-top">
                    <div className="ip-avatar">🏢</div>
                    <div>
                      <div className="ip-mini-name">{b.company}</div>
                      <div className="ip-mini-tag">{b.niche || b.niches?.[0] || "Brand"}</div>
                    </div>
                  </div>
                  <div className="ip-mini-stats">
                    <div className="ip-mini-stat"><span>{b.budget ? `₹${b.budget}` : "—"}</span>Budget</div>
                    <div className="ip-mini-stat"><span>{b.timeline || "—"}</span>Timeline</div>
                  </div>
                  <div style={{marginTop:10,fontSize:"0.75rem",color:"rgba(96,165,250,0.8)",fontWeight:600}}>
                    Tap to Apply →
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BRAND FORM ── */}
        {role === "brand" && (
          <div className="ip-card" key="brand">
            <div className="ip-card-header">
              <div className="ip-card-icon">🏢</div>
              <div>
                <div className="ip-card-title">Brand Campaign</div>
                <div className="ip-card-desc">
                  {myCampaignId ? "✅ Campaign live — scroll down to see influencers" : "Post your campaign and get discovered by influencers"}
                </div>
              </div>
            </div>

            <form onSubmit={handleBrandSubmit}>
              <div className="ip-section-title">Company Details</div>
              <div className="ip-form-grid">
                <div className="ip-field">
                  <label className="ip-label">Company / Brand Name *</label>
                  <input className="ip-input" placeholder="Acme Corp" value={brand.company} onChange={e=>setBrand({...brand,company:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Contact Person</label>
                  <input className="ip-input" placeholder="Ananya Singh" value={brand.contact} onChange={e=>setBrand({...brand,contact:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Business Email *</label>
                  <input className="ip-input" type="email" placeholder="marketing@company.com" value={brand.email} onChange={e=>setBrand({...brand,email:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Phone</label>
                  <input className="ip-input" placeholder="+91 XXXXX XXXXX" value={brand.phone} onChange={e=>setBrand({...brand,phone:e.target.value})} />
                </div>
                <div className="ip-field span2">
                  <label className="ip-label">Website</label>
                  <input className="ip-input" placeholder="https://yourcompany.com" value={brand.website} onChange={e=>setBrand({...brand,website:e.target.value})} />
                </div>
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Influencer Requirements</div>
              <div className="ip-form-grid">
                <div className="ip-field">
                  <label className="ip-label">Influencer Niche</label>
                  <select className="ip-select" value={brand.niche} onChange={e=>setBrand({...brand,niche:e.target.value})}>
                    <option value="">Select niche</option>
                    {BRAND_NICHES.map(n=><option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Preferred Tier</label>
                  <select className="ip-select" value={brand.influencerTier} onChange={e=>setBrand({...brand,influencerTier:e.target.value})}>
                    <option value="">Select tier</option>
                    <option>Nano (1K–10K)</option><option>Micro (10K–100K)</option>
                    <option>Mid-Tier (100K–500K)</option><option>Macro (500K–1M)</option>
                    <option>Mega / Celebrity (1M+)</option><option>Open to all</option>
                  </select>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Platform Preference</label>
                  <select className="ip-select" value={brand.platformPref} onChange={e=>setBrand({...brand,platformPref:e.target.value})}>
                    <option value="">Select platform</option>
                    {PLATFORMS.map(p=><option key={p.id}>{p.label}</option>)}
                    <option>No preference</option>
                  </select>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Audience Location</label>
                  <input className="ip-input" placeholder="Pan India / Mumbai" value={brand.audienceLocation} onChange={e=>setBrand({...brand,audienceLocation:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Campaign Budget (₹)</label>
                  <input className="ip-input" placeholder="e.g. 50000" value={brand.budget} onChange={e=>setBrand({...brand,budget:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Timeline</label>
                  <input className="ip-input" placeholder="e.g. 2 weeks" value={brand.timeline} onChange={e=>setBrand({...brand,timeline:e.target.value})} />
                </div>
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Content Categories</div>
              <div className="ip-niches">
                {BRAND_NICHES.map(n => (
                  <div key={n} className={`ip-niche-tag ${brandNiches.includes(n)?"selected":""}`} onClick={()=>toggleBrandNiche(n)}>{n}</div>
                ))}
              </div>

              <hr className="ip-divider" />
              <div className="ip-section-title">Campaign Details</div>
              <div className="ip-form-grid">
                <div className="ip-field span2">
                  <label className="ip-label">Campaign Description</label>
                  <textarea className="ip-textarea" placeholder="Describe your product and goals..." value={brand.description} onChange={e=>setBrand({...brand,description:e.target.value})} />
                </div>
                <div className="ip-field">
                  <label className="ip-label">Deliverables</label>
                  <select className="ip-select" value={brand.deliverables} onChange={e=>setBrand({...brand,deliverables:e.target.value})}>
                    <option value="">Select</option>
                    <option>Instagram Post + Story</option><option>YouTube Dedicated Video</option>
                    <option>YouTube Integration</option><option>TikTok Video</option>
                    <option>Reels Only</option><option>Custom Package</option>
                  </select>
                </div>
                <div className="ip-field">
                  <label className="ip-label">Collaboration Type</label>
                  <select className="ip-select" value={brand.collabType} onChange={e=>setBrand({...brand,collabType:e.target.value})}>
                    <option value="">Select</option>
                    <option>One-time Campaign</option><option>Long-term / Brand Ambassador</option>
                    <option>Affiliate Marketing</option><option>Barter / Product Gifting</option>
                    <option>Event Coverage</option>
                  </select>
                </div>
                <div className="ip-field span2">
                  <label className="ip-label">Special Notes</label>
                  <textarea className="ip-textarea" placeholder="Any do's and don'ts for influencers..." style={{minHeight:70}} value={brand.specialNotes} onChange={e=>setBrand({...brand,specialNotes:e.target.value})} />
                </div>
              </div>

              <button type="submit" className="ip-submit" disabled={loading}>
                {loading ? "⏳ Posting..." : myCampaignId ? "🔄 Update Campaign" : "🚀 Post Brand Campaign"}
              </button>
            </form>

            {/* Browse Influencers */}
            <hr className="ip-divider" />
            <div className="ip-section-title">Browse Influencers</div>
            <div className="ip-filter-row">
              {browseFilters.map(f => (
                <div key={f} className={`ip-filter-chip ${browseFilter===f?"active":""}`} onClick={()=>setBrowseFilter(f)}>{f}</div>
              ))}
            </div>
            {filteredInfluencers.length === 0 && (
              <p style={{color:"rgba(148,163,184,0.5)",fontSize:"0.85rem",textAlign:"center",padding:"20px 0"}}>No influencers registered yet</p>
            )}
            <div className="ip-cards-grid">
              {filteredInfluencers.map((inf) => (
                <div key={inf._id} className="ip-mini-card">
                  <div className="ip-mini-card-top">
                    <div className="ip-avatar">🎙️</div>
                    <div>
                      <div className="ip-mini-name">{inf.name}</div>
                      <div className="ip-mini-tag">@{inf.handle} · {inf.platforms?.[0] || "Creator"}</div>
                    </div>
                  </div>
                  <div className="ip-mini-stats">
                    <div className="ip-mini-stat"><span>{formatRange(inf.followers)}</span>Followers</div>
                    <div className="ip-mini-stat"><span>{formatRange(inf.avgViews)}</span>Avg Views</div>
                    {inf.ratePerPost && <div className="ip-mini-stat"><span>₹{inf.ratePerPost}</span>Per Post</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!role && (
          <div style={{color:"rgba(148,163,184,0.5)",fontSize:"0.9rem",marginTop:20}}>
            ↑ Choose your role above to get started
          </div>
        )}

        {/* Apply Modal */}
        {applyModal && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}}>
            <div style={{background:"#0f2044",border:"1px solid rgba(96,165,250,0.3)",borderRadius:20,padding:"32px",maxWidth:480,width:"90%"}}>
              <h3 style={{fontFamily:"Sora,sans-serif",color:"white",fontSize:"1.1rem",marginBottom:8}}>
                Apply to {applyModal.company}
              </h3>
              <p style={{color:"rgba(148,163,184,0.7)",fontSize:"0.82rem",marginBottom:20}}>
                {applyModal.description || "No description provided."}
              </p>
              <textarea
                style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(96,165,250,0.3)",borderRadius:12,padding:"12px 14px",color:"white",fontSize:"0.9rem",minHeight:100,outline:"none",resize:"vertical"}}
                placeholder="Introduce yourself and why you're a great fit for this campaign..."
                value={applyMsg}
                onChange={e => setApplyMsg(e.target.value)}
              />
              <div style={{display:"flex",gap:12,marginTop:16}}>
                <button onClick={() => {setApplyModal(null);setApplyMsg("");}} style={{flex:1,padding:"12px",borderRadius:12,border:"1px solid rgba(96,165,250,0.3)",background:"transparent",color:"rgba(148,163,184,0.8)",cursor:"pointer",fontFamily:"Sora,sans-serif",fontWeight:600}}>
                  Cancel
                </button>
                <button onClick={handleApply} style={{flex:2,padding:"12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#2563eb,#3b82f6)",color:"white",cursor:"pointer",fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.95rem"}}>
                  🚀 Send Application
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="ip-toast">{toast}</div>
        )}
      </div>
    </>
  );
}