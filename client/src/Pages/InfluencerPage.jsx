import { useState, useEffect } from "react";

var API = "https://digital-marketing-temp.onrender.com/api/influencer"
  ? "https://digital-marketing-temp.onrender.com/api/influencer"
  : "http://localhost:5000/api/influencer";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060910;
    --surface: #0d1220;
    --surface2: #131a2e;
    --border: rgba(255,255,255,0.07);
    --border-active: rgba(99,179,255,0.4);
    --text: #f0f4ff;
    --text-muted: #6b7a99;
    --text-dim: #3d4a66;
    --accent: #4f8ef7;
    --accent2: #7c3aed;
    --accent-glow: rgba(79,142,247,0.25);
    --success: #10b981;
    --amber: #f59e0b;
    --step-done: #10b981;
    --step-active: #4f8ef7;
    --step-idle: #1e2a44;
  }

  .ip2-root {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 16px 80px;
    position: relative;
  }

  /* Ambient background orbs */
  .ip2-orb1 {
    position: fixed; pointer-events: none; z-index: 0;
    top: -120px; left: -80px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(79,142,247,0.10) 0%, transparent 65%);
    border-radius: 50%;
    animation: pulse1 8s ease-in-out infinite alternate;
  }
  .ip2-orb2 {
    position: fixed; pointer-events: none; z-index: 0;
    bottom: -100px; right: -60px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%);
    border-radius: 50%;
    animation: pulse1 11s ease-in-out infinite alternate-reverse;
  }
  @keyframes pulse1 {
    from { transform: scale(1) translate(0,0); }
    to   { transform: scale(1.15) translate(20px, 15px); }
  }

  /* Header */
  .ip2-header {
    text-align: center;
    margin-bottom: 48px;
    position: relative; z-index: 1;
    animation: fadeUp 0.7s ease both;
  }
  .ip2-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
    padding: 6px 16px;
    border: 1px solid rgba(79,142,247,0.25);
    border-radius: 100px;
    background: rgba(79,142,247,0.07);
  }
  .ip2-headline {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    font-weight: 400;
    font-style: italic;
    line-height: 1.1;
    color: var(--text);
    margin-bottom: 12px;
  }
  .ip2-headline em {
    font-style: normal;
    background: linear-gradient(90deg, var(--accent), #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ip2-sub {
    font-size: 0.95rem; color: var(--text-muted); font-weight: 300; max-width: 420px; margin: 0 auto; line-height: 1.65;
  }

  /* Role selector */
  .ip2-role-wrap {
    display: flex; gap: 14px;
    margin-bottom: 48px;
    position: relative; z-index: 1;
  }
  .ip2-role-card {
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    padding: 28px 40px;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    min-width: 180px;
  }
  .ip2-role-card:hover {
    border-color: var(--border-active);
    background: var(--surface2);
    transform: translateY(-3px);
  }
  .ip2-role-card.active {
    border-color: var(--accent);
    background: rgba(79,142,247,0.08);
    box-shadow: 0 0 0 1px var(--accent), 0 8px 40px var(--accent-glow);
  }
  .ip2-role-icon {
    font-size: 2rem;
    width: 56px; height: 56px;
    background: var(--surface2);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
  }
  .ip2-role-card.active .ip2-role-icon {
    background: rgba(79,142,247,0.15);
  }
  .ip2-role-label {
    font-size: 0.95rem; font-weight: 600; color: var(--text);
  }
  .ip2-role-desc {
    font-size: 0.75rem; color: var(--text-muted); text-align: center; line-height: 1.5;
  }

  /* Wizard shell */
  .ip2-wizard {
    width: 100%; max-width: 680px;
    position: relative; z-index: 1;
    animation: fadeUp 0.5s ease both;
  }

  /* Step progress bar */
  .ip2-stepper {
    display: flex; align-items: center; justify-content: center;
    gap: 0; margin-bottom: 40px;
    padding: 0 8px;
  }
  .ip2-step-item {
    display: flex; flex-direction: column; align-items: center;
    flex: 1; position: relative;
  }
  .ip2-step-item:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 18px; left: calc(50% + 18px);
    width: calc(100% - 36px);
    height: 1.5px;
    background: var(--border);
    transition: background 0.4s ease;
    z-index: 0;
  }
  .ip2-step-item.done:not(:last-child)::after {
    background: var(--step-done);
  }
  .ip2-step-dot {
    width: 36px; height: 36px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.78rem; font-weight: 700;
    border: 1.5px solid var(--border);
    background: var(--step-idle);
    color: var(--text-dim);
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    position: relative; z-index: 1;
    cursor: pointer;
  }
  .ip2-step-item.active .ip2-step-dot {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
    box-shadow: 0 0 20px var(--accent-glow);
  }
  .ip2-step-item.done .ip2-step-dot {
    background: var(--step-done);
    border-color: var(--step-done);
    color: white;
  }
  .ip2-step-label {
    font-size: 0.68rem; font-weight: 500;
    color: var(--text-dim);
    margin-top: 8px; text-align: center;
    text-transform: uppercase; letter-spacing: 0.5px;
    transition: color 0.3s;
  }
  .ip2-step-item.active .ip2-step-label { color: var(--accent); }
  .ip2-step-item.done .ip2-step-label  { color: var(--step-done); }

  /* Step panel */
  .ip2-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    position: relative;
  }
  .ip2-panel::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--accent) 40%, #a78bfa 70%, transparent 100%);
    opacity: 0.5;
  }

  .ip2-panel-head {
    padding: 32px 40px 0;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .ip2-panel-icon-wrap {
    width: 48px; height: 48px; flex-shrink: 0;
    background: rgba(79,142,247,0.1);
    border: 1px solid rgba(79,142,247,0.2);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
  }
  .ip2-panel-title {
    font-size: 1.25rem; font-weight: 700; color: var(--text);
    line-height: 1.2;
  }
  .ip2-panel-subtitle {
    font-size: 0.8rem; color: var(--text-muted); margin-top: 3px; line-height: 1.5;
  }
  .ip2-step-counter {
    margin-left: auto;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 1px;
    color: var(--text-dim); white-space: nowrap;
    padding-top: 4px;
  }

  .ip2-panel-body {
    padding: 28px 40px 32px;
    display: flex; flex-direction: column; gap: 20px;
  }

  /* Form fields */
  .ip2-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ip2-row.single { grid-template-columns: 1fr; }
  .ip2-field { display: flex; flex-direction: column; gap: 6px; }
  .ip2-label {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; color: var(--text-muted);
  }
  .ip2-input, .ip2-select, .ip2-textarea {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 11px 14px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.9rem; color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  .ip2-input::placeholder, .ip2-textarea::placeholder { color: var(--text-dim); }
  .ip2-input:focus, .ip2-select:focus, .ip2-textarea:focus {
    border-color: var(--border-active);
    box-shadow: 0 0 0 3px rgba(79,142,247,0.1);
  }
  .ip2-select option { background: #0d1220; }
  .ip2-textarea { resize: vertical; min-height: 88px; }

  /* Chips */
  .ip2-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .ip2-chip {
    padding: 7px 15px;
    border-radius: 100px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem; font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: center; gap: 6px;
  }
  .ip2-chip:hover { border-color: rgba(79,142,247,0.4); color: var(--text); }
  .ip2-chip.on {
    background: rgba(79,142,247,0.15);
    border-color: var(--accent);
    color: var(--text);
    box-shadow: 0 0 12px rgba(79,142,247,0.15);
  }
  .ip2-chip-check { font-size: 0.65rem; opacity: 0; transition: opacity 0.2s; }
  .ip2-chip.on .ip2-chip-check { opacity: 1; }

  /* Niche tag (square-ish) */
  .ip2-niche {
    padding: 7px 14px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    font-family: 'Outfit', sans-serif;
    font-size: 0.78rem; font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ip2-niche:hover { border-color: var(--border-active); color: var(--text); }
  .ip2-niche.on {
    background: rgba(79,142,247,0.12);
    border-color: var(--accent);
    color: var(--text);
  }

  /* Stat range slider */
  .ip2-range-group { display: flex; flex-direction: column; gap: 8px; }
  .ip2-range-head { display: flex; justify-content: space-between; align-items: baseline; }
  .ip2-range-head label { font-size: 0.72rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); }
  .ip2-range-val { font-size: 0.9rem; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }
  input[type=range].ip2-range {
    width: 100%; height: 4px;
    -webkit-appearance: none;
    background: var(--border);
    border-radius: 4px; outline: none; cursor: pointer;
  }
  input[type=range].ip2-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    background: var(--accent);
    border-radius: 50%; cursor: pointer;
    border: 2px solid var(--bg);
    box-shadow: 0 0 8px var(--accent-glow);
  }

  /* Nav */
  .ip2-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px 28px;
    border-top: 1px solid var(--border);
  }
  .ip2-btn-back {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px;
    border: 1px solid var(--border);
    background: transparent; color: var(--text-muted);
    font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .ip2-btn-back:hover { border-color: var(--border-active); color: var(--text); }
  .ip2-btn-next {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 28px; border-radius: 10px;
    border: none;
    background: var(--accent); color: white;
    font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 700;
    cursor: pointer; transition: all 0.25s;
    box-shadow: 0 4px 20px var(--accent-glow);
  }
  .ip2-btn-next:hover { transform: translateY(-2px); box-shadow: 0 8px 30px var(--accent-glow); }
  .ip2-btn-next:active { transform: translateY(0); }
  .ip2-btn-next:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .ip2-btn-submit {
    background: linear-gradient(135deg, var(--accent), #7c3aed);
    box-shadow: 0 4px 24px rgba(124,58,237,0.35);
  }

  /* Progress line under stepper */
  .ip2-progress-bar {
    height: 2px; background: var(--border);
    border-radius: 2px; margin-bottom: 32px; overflow: hidden;
  }
  .ip2-progress-fill {
    height: 100%; background: linear-gradient(90deg, var(--accent), #7c3aed);
    border-radius: 2px; transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  /* Success state */
  .ip2-success {
    text-align: center; padding: 60px 40px;
  }
  .ip2-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(16,185,129,0.12);
    border: 2px solid var(--success);
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; margin: 0 auto 24px;
    animation: popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both;
  }
  @keyframes popIn {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  .ip2-success h3 {
    font-size: 1.5rem; font-weight: 700; color: var(--text); margin-bottom: 10px;
  }
  .ip2-success p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; }

  /* Toast */
  .ip2-toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: var(--surface2); border: 1px solid rgba(79,142,247,0.3);
    color: var(--text); padding: 12px 24px;
    border-radius: 12px; font-size: 0.875rem; font-weight: 500;
    z-index: 9999; animation: fadeUp 0.35s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    white-space: nowrap;
  }

  /* Browse section */
  .ip2-browse-wrap {
    width: 100%; max-width: 680px;
    position: relative; z-index: 1;
    margin-top: 28px;
  }
  .ip2-browse-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .ip2-browse-title {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    color: var(--text-muted); display: flex; align-items: center; gap: 8px;
  }
  .ip2-browse-title::before { content: ''; display: block; width: 20px; height: 1.5px; background: var(--accent); }
  .ip2-filter-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 16px; }
  .ip2-filter-chip {
    padding: 5px 13px; border-radius: 100px;
    border: 1px solid var(--border);
    background: transparent; color: var(--text-muted);
    font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .ip2-filter-chip.on { background: var(--accent); border-color: var(--accent); color: white; }
  .ip2-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ip2-mini-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px; padding: 18px;
    cursor: pointer; transition: all 0.25s;
  }
  .ip2-mini-card:hover {
    border-color: var(--border-active);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .ip2-mini-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .ip2-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(79,142,247,0.15);
    display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
  }
  .ip2-mini-name { font-size: 0.85rem; font-weight: 600; color: var(--text); }
  .ip2-mini-sub  { font-size: 0.72rem; color: var(--text-muted); margin-top: 1px; }
  .ip2-mini-stats { display: flex; gap: 14px; flex-wrap: wrap; }
  .ip2-mini-stat { font-size: 0.73rem; color: var(--text-muted); }
  .ip2-mini-stat strong { display: block; font-size: 0.83rem; font-weight: 700; color: var(--text); }
  .ip2-apply-hint { margin-top: 10px; font-size: 0.72rem; color: var(--accent); font-weight: 600; }

  /* Apply modal */
  .ip2-modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 9998; animation: fadeIn 0.2s ease;
  }
  .ip2-modal {
    background: var(--surface2);
    border: 1px solid var(--border-active);
    border-radius: 20px; padding: 32px;
    max-width: 460px; width: 90%;
    animation: fadeUp 0.3s ease;
  }
  .ip2-modal h3 { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .ip2-modal p  { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 18px; line-height: 1.6; }
  .ip2-modal-actions { display: flex; gap: 10px; margin-top: 16px; }
  .ip2-btn-cancel {
    flex: 1; padding: 11px; border-radius: 10px;
    border: 1px solid var(--border); background: transparent;
    color: var(--text-muted); font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .ip2-btn-cancel:hover { border-color: var(--border-active); color: var(--text); }
  .ip2-btn-confirm {
    flex: 2; padding: 11px; border-radius: 10px;
    border: none; background: var(--accent); color: white;
    font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 16px var(--accent-glow);
  }
  .ip2-btn-confirm:hover { transform: translateY(-1px); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  @media (max-width: 600px) {
    .ip2-panel-head { padding: 24px 22px 0; }
    .ip2-panel-body { padding: 20px 22px 24px; }
    .ip2-nav { padding: 16px 22px 22px; }
    .ip2-row { grid-template-columns: 1fr; }
    .ip2-role-wrap { flex-direction: column; }
    .ip2-cards-grid { grid-template-columns: 1fr; }
  }
`;

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "youtube",   label: "YouTube",   icon: "▶️" },
  { id: "tiktok",    label: "TikTok",    icon: "🎵" },
  { id: "twitter",   label: "Twitter/X", icon: "𝕏" },
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
  if (!val) return "—";
  if (val >= 10000000) return (val/10000000).toFixed(1)+"Cr+";
  if (val >= 100000)   return (val/100000).toFixed(1)+"L";
  if (val >= 1000)     return (val/1000).toFixed(0)+"K";
  return val;
}

const INF_STEPS = [
  { label: "Profile",   icon: "👤" },
  { label: "Platforms", icon: "📱" },
  { label: "Audience",  icon: "📊" },
  { label: "Collabs",   icon: "🤝" },
];
const BRAND_STEPS = [
  { label: "Company",  icon: "🏢" },
  { label: "Campaign", icon: "🎯" },
  { label: "Budget",   icon: "💰" },
  { label: "Details",  icon: "📋" },
];

export default function InfluencerPage() {
  const [role, setRole]           = useState(null);
  const [step, setStep]           = useState(0);
  const [done, setDone]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState("");

  // influencer state
  const [platforms, setPlatforms] = useState([]);
  const [niches, setNiches]       = useState([]);
  const [followers, setFollowers] = useState(50000);
  const [avgViews, setAvgViews]   = useState(20000);
  const [highestView, setHighestView] = useState(100000);
  const [audienceAge, setAudienceAge] = useState("");
  const [audienceGender, setAudienceGender] = useState("");
  const [inf, setInf] = useState({
    name:"", handle:"", email:"", phone:"",
    bio:"", location:"", engRate:"",
    collabType:"", ratePerPost:"", pastCollaborations:"",
  });

  // brand state
  const [brandNiches, setBrandNiches] = useState([]);
  const [brand, setBrand] = useState({
    company:"", contact:"", email:"", phone:"", website:"",
    niche:"", influencerTier:"", platformPref:"", audienceLocation:"",
    budget:"", timeline:"", description:"", deliverables:"",
    collabType:"", specialNotes:"",
  });

  // browse
  const [liveCampaigns, setLiveCampaigns]     = useState([]);
  const [liveInfluencers, setLiveInfluencers] = useState([]);
  const [browseFilter, setBrowseFilter]       = useState("All");
  const [applyModal, setApplyModal]           = useState(null);
  const [applyMsg, setApplyMsg]               = useState("");
  const [myInfluencerId, setMyInfluencerId]   = useState(() => localStorage.getItem("myInfluencerId") || null);
  const [myCampaignId,   setMyCampaignId]     = useState(() => localStorage.getItem("myCampaignId")   || null);

  useEffect(() => {
    if (role === "influencer") fetch(`${API}/campaigns`).then(r=>r.json()).then(setLiveCampaigns).catch(()=>{});
    if (role === "brand")      fetch(`${API}/influencers`).then(r=>r.json()).then(setLiveInfluencers).catch(()=>{});
  }, [role, done]);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""), 3500); };

  const pickRole = (r) => { setRole(r); setStep(0); setDone(false); setBrowseFilter("All"); };
  const goBack  = ()  => step > 0 && setStep(s => s-1);
  const goNext  = ()  => setStep(s => s+1);

  const steps = role === "influencer" ? INF_STEPS : BRAND_STEPS;
  const progress = ((step+1) / steps.length) * 100;

  // ── Submit influencer ──
  const submitInfluencer = async () => {
    if (!inf.name || !inf.handle || !inf.email) return showToast("❌ Name, handle & email required");
    setLoading(true);
    try {
      const body = { ...inf, platforms, niches, followers, avgViews, highestView, audienceAge, audienceGender };
      const res  = await fetch(`${API}/influencers`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("myInfluencerId", data._id);
      setMyInfluencerId(data._id);
      setDone(true);
    } catch(err) { showToast("❌ "+err.message); }
    finally { setLoading(false); }
  };

  // ── Submit brand ──
  const submitBrand = async () => {
    if (!brand.company || !brand.email) return showToast("❌ Company name & email required");
    setLoading(true);
    try {
      const body = { ...brand, niches: brandNiches };
      const res  = await fetch(`${API}/campaigns`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("myCampaignId", data._id);
      setMyCampaignId(data._id);
      setDone(true);
    } catch(err) { showToast("❌ "+err.message); }
    finally { setLoading(false); }
  };

  const handleApply = async () => {
    if (!myInfluencerId) return showToast("❌ Create your influencer profile first");
    if (!applyModal) return;
    try {
      const res = await fetch(`${API}/campaigns/${applyModal._id}/apply`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ influencerId: myInfluencerId, message: applyMsg }),
      });
      const data = await res.json();
      if (res.status === 409) return showToast("⚠️ Already applied to this campaign");
      if (!res.ok) throw new Error(data.error);
      showToast("✅ Application sent to "+applyModal.company+"!");
      setApplyModal(null); setApplyMsg("");
    } catch(err) { showToast("❌ "+err.message); }
  };

  const browseFilters = role === "influencer"
    ? ["All", ...new Set(liveCampaigns.map(b=>b.niche).filter(Boolean))]
    : ["All", ...new Set(liveInfluencers.flatMap(i=>i.niches||[]).filter(Boolean))];
  const filteredCampaigns   = browseFilter==="All" ? liveCampaigns   : liveCampaigns.filter(b=>b.niche===browseFilter);
  const filteredInfluencers = browseFilter==="All" ? liveInfluencers : liveInfluencers.filter(i=>i.niches?.includes(browseFilter));

  // ── Step panels ──
  const renderInfStep = () => {
    if (step === 0) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">👤</div>
          <div>
            <div className="ip2-panel-title">Personal Info</div>
            <div className="ip2-panel-subtitle">Tell brands who you are</div>
          </div>
          <div className="ip2-step-counter">Step 1 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Full Name *</label>
              <input className="ip2-input" placeholder="Rahul Sharma" value={inf.name} onChange={e=>setInf({...inf,name:e.target.value})} />
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Handle *</label>
              <input className="ip2-input" placeholder="@yourhandle" value={inf.handle} onChange={e=>setInf({...inf,handle:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Email *</label>
              <input className="ip2-input" type="email" placeholder="you@email.com" value={inf.email} onChange={e=>setInf({...inf,email:e.target.value})} />
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Phone</label>
              <input className="ip2-input" placeholder="+91 XXXXX XXXXX" value={inf.phone} onChange={e=>setInf({...inf,phone:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Location</label>
              <input className="ip2-input" placeholder="Mumbai, India" value={inf.location} onChange={e=>setInf({...inf,location:e.target.value})} />
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Engagement Rate (%)</label>
              <input className="ip2-input" placeholder="e.g. 4.5" value={inf.engRate} onChange={e=>setInf({...inf,engRate:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row single">
            <div className="ip2-field">
              <label className="ip2-label">Bio</label>
              <textarea className="ip2-textarea" placeholder="Tell brands your story in a few lines..." value={inf.bio} onChange={e=>setInf({...inf,bio:e.target.value})} />
            </div>
          </div>
        </div>
      </>
    );

    if (step === 1) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">📱</div>
          <div>
            <div className="ip2-panel-title">Platforms & Niches</div>
            <div className="ip2-panel-subtitle">Where do you create content?</div>
          </div>
          <div className="ip2-step-counter">Step 2 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-field">
            <label className="ip2-label">Your Platforms</label>
            <div className="ip2-chips">
              {PLATFORMS.map(p => (
                <div key={p.id} className={`ip2-chip ${platforms.includes(p.id)?"on":""}`}
                  onClick={()=>setPlatforms(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])}>
                  <span>{p.icon}</span>{p.label}<span className="ip2-chip-check">✓</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ip2-field">
            <label className="ip2-label">Content Niches</label>
            <div className="ip2-chips" style={{gap:"8px"}}>
              {NICHES.map(n => (
                <div key={n} className={`ip2-niche ${niches.includes(n)?"on":""}`}
                  onClick={()=>setNiches(prev=>prev.includes(n)?prev.filter(x=>x!==n):[...prev,n])}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );

    if (step === 2) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">📊</div>
          <div>
            <div className="ip2-panel-title">Audience Stats</div>
            <div className="ip2-panel-subtitle">Help brands understand your reach</div>
          </div>
          <div className="ip2-step-counter">Step 3 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-range-group">
            <div className="ip2-range-head">
              <label className="ip2-label">Followers</label>
              <span className="ip2-range-val">{formatRange(followers)}</span>
            </div>
            <input type="range" className="ip2-range" min={1000} max={10000000} step={1000}
              value={followers} onChange={e=>setFollowers(Number(e.target.value))} />
          </div>
          <div className="ip2-range-group">
            <div className="ip2-range-head">
              <label className="ip2-label">Avg Views / Post</label>
              <span className="ip2-range-val">{formatRange(avgViews)}</span>
            </div>
            <input type="range" className="ip2-range" min={100} max={5000000} step={100}
              value={avgViews} onChange={e=>setAvgViews(Number(e.target.value))} />
          </div>
          <div className="ip2-range-group">
            <div className="ip2-range-head">
              <label className="ip2-label">Highest Views</label>
              <span className="ip2-range-val">{formatRange(highestView)}</span>
            </div>
            <input type="range" className="ip2-range" min={1000} max={50000000} step={1000}
              value={highestView} onChange={e=>setHighestView(Number(e.target.value))} />
          </div>
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Audience Age</label>
              <select className="ip2-select" value={audienceAge} onChange={e=>setAudienceAge(e.target.value)}>
                <option value="">Select</option>
                <option>13–17</option><option>18–24</option><option>25–34</option><option>35–44</option><option>45+</option>
              </select>
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Audience Gender</label>
              <select className="ip2-select" value={audienceGender} onChange={e=>setAudienceGender(e.target.value)}>
                <option value="">Select</option>
                <option>Mostly Male</option><option>Mostly Female</option><option>Mixed</option>
              </select>
            </div>
          </div>
        </div>
      </>
    );

    if (step === 3) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">🤝</div>
          <div>
            <div className="ip2-panel-title">Collaboration Prefs</div>
            <div className="ip2-panel-subtitle">What kind of deals do you want?</div>
          </div>
          <div className="ip2-step-counter">Step 4 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Collab Type</label>
              <select className="ip2-select" value={inf.collabType} onChange={e=>setInf({...inf,collabType:e.target.value})}>
                <option value="">Select</option>
                <option>Paid Partnership</option>
                <option>Barter / Free Product</option>
                <option>Affiliate</option>
                <option>Long-term Ambassador</option>
                <option>Open to all</option>
              </select>
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Rate per Post (₹)</label>
              <input className="ip2-input" placeholder="e.g. 15000" value={inf.ratePerPost} onChange={e=>setInf({...inf,ratePerPost:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row single">
            <div className="ip2-field">
              <label className="ip2-label">Past Collaborations</label>
              <textarea className="ip2-textarea" placeholder="Brands you've worked with before..." value={inf.pastCollaborations} onChange={e=>setInf({...inf,pastCollaborations:e.target.value})} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderBrandStep = () => {
    if (step === 0) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">🏢</div>
          <div>
            <div className="ip2-panel-title">Company Details</div>
            <div className="ip2-panel-subtitle">Who's behind this campaign?</div>
          </div>
          <div className="ip2-step-counter">Step 1 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Company / Brand *</label>
              <input className="ip2-input" placeholder="Acme Corp" value={brand.company} onChange={e=>setBrand({...brand,company:e.target.value})} />
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Contact Person</label>
              <input className="ip2-input" placeholder="Ananya Singh" value={brand.contact} onChange={e=>setBrand({...brand,contact:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Business Email *</label>
              <input className="ip2-input" type="email" placeholder="marketing@co.com" value={brand.email} onChange={e=>setBrand({...brand,email:e.target.value})} />
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Phone</label>
              <input className="ip2-input" placeholder="+91 XXXXX XXXXX" value={brand.phone} onChange={e=>setBrand({...brand,phone:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row single">
            <div className="ip2-field">
              <label className="ip2-label">Website</label>
              <input className="ip2-input" placeholder="https://yourcompany.com" value={brand.website} onChange={e=>setBrand({...brand,website:e.target.value})} />
            </div>
          </div>
        </div>
      </>
    );

    if (step === 1) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">🎯</div>
          <div>
            <div className="ip2-panel-title">Influencer Requirements</div>
            <div className="ip2-panel-subtitle">What kind of creator are you looking for?</div>
          </div>
          <div className="ip2-step-counter">Step 2 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Influencer Niche</label>
              <select className="ip2-select" value={brand.niche} onChange={e=>setBrand({...brand,niche:e.target.value})}>
                <option value="">Select niche</option>
                {BRAND_NICHES.map(n=><option key={n}>{n}</option>)}
              </select>
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Preferred Tier</label>
              <select className="ip2-select" value={brand.influencerTier} onChange={e=>setBrand({...brand,influencerTier:e.target.value})}>
                <option value="">Select tier</option>
                <option>Nano (1K–10K)</option>
                <option>Micro (10K–100K)</option>
                <option>Mid-Tier (100K–500K)</option>
                <option>Macro (500K–1M)</option>
                <option>Mega / Celebrity (1M+)</option>
                <option>Open to all</option>
              </select>
            </div>
          </div>
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Platform</label>
              <select className="ip2-select" value={brand.platformPref} onChange={e=>setBrand({...brand,platformPref:e.target.value})}>
                <option value="">Any platform</option>
                {PLATFORMS.map(p=><option key={p.id}>{p.label}</option>)}
              </select>
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Audience Location</label>
              <input className="ip2-input" placeholder="Pan India / Mumbai" value={brand.audienceLocation} onChange={e=>setBrand({...brand,audienceLocation:e.target.value})} />
            </div>
          </div>
          <div className="ip2-field">
            <label className="ip2-label">Content Categories</label>
            <div className="ip2-chips" style={{gap:"8px"}}>
              {BRAND_NICHES.map(n=>(
                <div key={n} className={`ip2-niche ${brandNiches.includes(n)?"on":""}`}
                  onClick={()=>setBrandNiches(prev=>prev.includes(n)?prev.filter(x=>x!==n):[...prev,n])}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );

    if (step === 2) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">💰</div>
          <div>
            <div className="ip2-panel-title">Budget & Timeline</div>
            <div className="ip2-panel-subtitle">Define your campaign scope</div>
          </div>
          <div className="ip2-step-counter">Step 3 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Campaign Budget (₹)</label>
              <input className="ip2-input" placeholder="e.g. 50000" value={brand.budget} onChange={e=>setBrand({...brand,budget:e.target.value})} />
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Timeline</label>
              <input className="ip2-input" placeholder="e.g. 2 weeks" value={brand.timeline} onChange={e=>setBrand({...brand,timeline:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row">
            <div className="ip2-field">
              <label className="ip2-label">Deliverables</label>
              <select className="ip2-select" value={brand.deliverables} onChange={e=>setBrand({...brand,deliverables:e.target.value})}>
                <option value="">Select</option>
                <option>Instagram Post + Story</option>
                <option>YouTube Dedicated Video</option>
                <option>YouTube Integration</option>
                <option>TikTok Video</option>
                <option>Reels Only</option>
                <option>Custom Package</option>
              </select>
            </div>
            <div className="ip2-field">
              <label className="ip2-label">Collaboration Type</label>
              <select className="ip2-select" value={brand.collabType} onChange={e=>setBrand({...brand,collabType:e.target.value})}>
                <option value="">Select</option>
                <option>One-time Campaign</option>
                <option>Long-term / Ambassador</option>
                <option>Affiliate Marketing</option>
                <option>Barter / Product Gifting</option>
                <option>Event Coverage</option>
              </select>
            </div>
          </div>
        </div>
      </>
    );

    if (step === 3) return (
      <>
        <div className="ip2-panel-head">
          <div className="ip2-panel-icon-wrap">📋</div>
          <div>
            <div className="ip2-panel-title">Campaign Details</div>
            <div className="ip2-panel-subtitle">Describe what you're looking for</div>
          </div>
          <div className="ip2-step-counter">Step 4 of 4</div>
        </div>
        <div className="ip2-panel-body">
          <div className="ip2-row single">
            <div className="ip2-field">
              <label className="ip2-label">Campaign Description</label>
              <textarea className="ip2-textarea" placeholder="Describe your product and campaign goals..." value={brand.description} onChange={e=>setBrand({...brand,description:e.target.value})} />
            </div>
          </div>
          <div className="ip2-row single">
            <div className="ip2-field">
              <label className="ip2-label">Special Notes</label>
              <textarea className="ip2-textarea" placeholder="Any do's, don'ts, or specific requirements for influencers..." style={{minHeight:72}} value={brand.specialNotes} onChange={e=>setBrand({...brand,specialNotes:e.target.value})} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      if (role === "influencer") submitInfluencer();
      else submitBrand();
    } else {
      goNext();
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ip2-root">
        <div className="ip2-orb1" /><div className="ip2-orb2" />

        {/* Header */}
        <div className="ip2-header">
          <div className="ip2-eyebrow">✦ Influencer Platform ✦</div>
          <h1 className="ip2-headline">Connect.<br/><em>Collaborate.</em> Grow.</h1>
          <p className="ip2-sub">The bridge between creators and brands — build real partnerships that move the needle.</p>
        </div>

        {/* Role selector */}
        <div className="ip2-role-wrap">
          {[
            { id:"influencer", icon:"🎙️", label:"I'm a Creator",  desc:"Find brand deals & grow your income" },
            { id:"brand",      icon:"🏢", label:"I'm a Brand",    desc:"Discover influencers for your campaign" },
          ].map(r => (
            <div key={r.id} className={`ip2-role-card ${role===r.id?"active":""}`} onClick={()=>pickRole(r.id)}>
              <div className="ip2-role-icon">{r.icon}</div>
              <div className="ip2-role-label">{r.label}</div>
              <div className="ip2-role-desc">{r.desc}</div>
            </div>
          ))}
        </div>

        {/* Wizard */}
        {role && !done && (
          <div className="ip2-wizard">
            {/* Stepper */}
            <div className="ip2-stepper">
              {steps.map((s, i) => (
                <div key={i} className={`ip2-step-item ${i < step ? "done" : i === step ? "active" : ""}`}
                  onClick={()=>i<step&&setStep(i)}>
                  <div className="ip2-step-dot">
                    {i < step ? "✓" : i+1}
                  </div>
                  <div className="ip2-step-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="ip2-progress-bar">
              <div className="ip2-progress-fill" style={{width:`${progress}%`}} />
            </div>

            {/* Panel */}
            <div className="ip2-panel">
              {role === "influencer" ? renderInfStep() : renderBrandStep()}

              <div className="ip2-nav">
                <button className="ip2-btn-back" onClick={goBack} style={{visibility: step===0 ? "hidden" : "visible"}}>
                  ← Back
                </button>
                <button
                  className={`ip2-btn-next ${isLastStep ? "ip2-btn-submit" : ""}`}
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? "Saving…" : isLastStep ? "🚀 Submit Profile" : "Continue →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {role && done && (
          <div className="ip2-wizard">
            <div className="ip2-panel">
              <div className="ip2-success">
                <div className="ip2-success-icon">✓</div>
                <h3>{role === "influencer" ? "Profile Live!" : "Campaign Posted!"}</h3>
                <p>
                  {role === "influencer"
                    ? "Your influencer profile is now visible to brands. Scroll down to apply to open campaigns."
                    : "Your campaign is now live. Influencers can discover and apply to it below."}
                </p>
                <button className="ip2-btn-next" style={{margin:"24px auto 0",display:"inline-flex"}}
                  onClick={()=>{setDone(false);setStep(0);}}>
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Browse section */}
        {role && (
          <div className="ip2-browse-wrap">
            <div className="ip2-browse-head">
              <div className="ip2-browse-title">
                {role === "influencer" ? "Open Brand Campaigns" : "Registered Influencers"}
              </div>
            </div>

            <div className="ip2-filter-row">
              {browseFilters.map(f=>(
                <div key={f} className={`ip2-filter-chip ${browseFilter===f?"on":""}`}
                  onClick={()=>setBrowseFilter(f)}>{f}</div>
              ))}
            </div>

            {role === "influencer" && filteredCampaigns.length === 0 && (
              <p style={{color:"var(--text-dim)",fontSize:"0.82rem",textAlign:"center",padding:"24px 0"}}>No campaigns yet</p>
            )}
            {role === "brand" && filteredInfluencers.length === 0 && (
              <p style={{color:"var(--text-dim)",fontSize:"0.82rem",textAlign:"center",padding:"24px 0"}}>No influencers registered yet</p>
            )}

            <div className="ip2-cards-grid">
              {role === "influencer" && filteredCampaigns.map(b=>(
                <div key={b._id} className="ip2-mini-card" onClick={()=>setApplyModal(b)}>
                  <div className="ip2-mini-top">
                    <div className="ip2-avatar">🏢</div>
                    <div>
                      <div className="ip2-mini-name">{b.company}</div>
                      <div className="ip2-mini-sub">{b.niche || b.niches?.[0] || "Brand Campaign"}</div>
                    </div>
                  </div>
                  <div className="ip2-mini-stats">
                    <div className="ip2-mini-stat"><strong>{b.budget?`₹${b.budget}`:"—"}</strong>Budget</div>
                    <div className="ip2-mini-stat"><strong>{b.timeline||"—"}</strong>Timeline</div>
                  </div>
                  <div className="ip2-apply-hint">Tap to apply →</div>
                </div>
              ))}

              {role === "brand" && filteredInfluencers.map(i=>(
                <div key={i._id} className="ip2-mini-card">
                  <div className="ip2-mini-top">
                    <div className="ip2-avatar">🎙️</div>
                    <div>
                      <div className="ip2-mini-name">{i.name}</div>
                      <div className="ip2-mini-sub">@{i.handle} · {i.platforms?.[0]||"Creator"}</div>
                    </div>
                  </div>
                  <div className="ip2-mini-stats">
                    <div className="ip2-mini-stat"><strong>{formatRange(i.followers)}</strong>Followers</div>
                    <div className="ip2-mini-stat"><strong>{formatRange(i.avgViews)}</strong>Avg Views</div>
                    {i.ratePerPost && <div className="ip2-mini-stat"><strong>₹{i.ratePerPost}</strong>Per Post</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!role && (
          <p style={{color:"var(--text-dim)",fontSize:"0.85rem",marginTop:8}}>↑ Choose your role above to get started</p>
        )}

        {/* Apply Modal */}
        {applyModal && (
          <div className="ip2-modal-backdrop" onClick={()=>{setApplyModal(null);setApplyMsg("");}}>
            <div className="ip2-modal" onClick={e=>e.stopPropagation()}>
              <h3>Apply to {applyModal.company}</h3>
              <p>{applyModal.description || "No description provided."}</p>
              <textarea
                className="ip2-textarea"
                style={{width:"100%"}}
                placeholder="Introduce yourself and why you're a great fit…"
                value={applyMsg}
                onChange={e=>setApplyMsg(e.target.value)}
              />
              <div className="ip2-modal-actions">
                <button className="ip2-btn-cancel" onClick={()=>{setApplyModal(null);setApplyMsg("");}}>Cancel</button>
                <button className="ip2-btn-confirm" onClick={handleApply}>🚀 Send Application</button>
              </div>
            </div>
          </div>
        )}

        {toast && <div className="ip2-toast">{toast}</div>}
      </div>
    </>
  );
}