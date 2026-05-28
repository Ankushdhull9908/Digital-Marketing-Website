import { useState, useEffect } from "react";

var API = "https://digital-marketing-temp.onrender.com/api/influencer"
  ? "https://digital-marketing-temp.onrender.com/api/influencer"
  : "http://localhost:5000/api/influencer";

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

const STATS = [
  { value: "12,400+", label: "Creators Registered" },
  { value: "3,200+",  label: "Brand Campaigns" },
  { value: "₹48Cr+",  label: "Deals Closed" },
  { value: "94%",     label: "Satisfaction Rate" },
];

const HOW_IT_WORKS = [
  { icon: "✍️", title: "Create Your Profile", desc: "Influencers build their media kit; brands post campaign briefs — takes under 5 minutes." },
  { icon: "🔍", title: "Discover & Match",    desc: "Smart filters surface the right creators for every niche, tier, and audience demographic." },
  { icon: "🤝", title: "Connect & Negotiate", desc: "Apply directly to campaigns or receive inbound pitches from brands that love your content." },
  { icon: "🚀", title: "Execute & Grow",       desc: "Close the deal, deliver great content, and unlock your next collab with a growing reputation." },
];

const TESTIMONIALS = [
  { name: "Priya Menon", handle: "@priyacooks", niche: "Food & Cooking", followers: "280K", text: "Landed 4 paid collabs in my first month. The platform actually understands what micro-influencers need.", avatar: "PM" },
  { name: "Arjun Sethi",  handle: "@techwitharjun", niche: "Tech & Gadgets", followers: "95K",  text: "The campaign briefs are super detailed — no more back-and-forth emails just to understand the requirements.", avatar: "AS" },
  { name: "Sneha Kapoor", handle: "@snehalifestyle", niche: "Lifestyle",      followers: "1.2M", text: "Finally a platform that treats influencers like professionals, not just ad inventory.", avatar: "SK" },
];

export default function InfluencerPage() {
  const [role, setRole]           = useState(null);
  const [step, setStep]           = useState(0);
  const [done, setDone]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState("");

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

  const [brandNiches, setBrandNiches] = useState([]);
  const [brand, setBrand] = useState({
    company:"", contact:"", email:"", phone:"", website:"",
    niche:"", influencerTier:"", platformPref:"", audienceLocation:"",
    budget:"", timeline:"", description:"", deliverables:"",
    collabType:"", specialNotes:"",
  });

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

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      if (role === "influencer") submitInfluencer();
      else submitBrand();
    } else {
      goNext();
    }
  };

  const renderInfStep = () => {
    if (step === 0) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <section className="relative w-full py-20 px-6 md:px-12 bg-base-200 flex items-center justify-center rounded-t-2xl overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')` }}
              />
              <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />
            </div>
            <div className="relative z-10 w-full max-w-3xl text-left border-l-4 pl-8 border-[#F39221]">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg bg-[#F39221]/10 border border-[#F39221]/30">
                  👤
                </div>
                <div className="flex-1 text-base-content">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Personal Information</h1>
                  <p className="text-lg mt-3 max-w-md text-base-content/80">
                    Tell the brands your story. Building authentic partnerships starts by sharing who you are.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 1 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Full Name *</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="Rahul Sharma" value={inf.name} onChange={e=>setInf({...inf,name:e.target.value})} />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Handle *</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="@yourhandle" value={inf.handle} onChange={e=>setInf({...inf,handle:e.target.value})} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Email *</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" type="email" placeholder="you@email.com" value={inf.email} onChange={e=>setInf({...inf,email:e.target.value})} />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Phone</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="+91 XXXXX XXXXX" value={inf.phone} onChange={e=>setInf({...inf,phone:e.target.value})} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Location</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="Mumbai, India" value={inf.location} onChange={e=>setInf({...inf,location:e.target.value})} />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Engagement Rate (%)</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="e.g. 4.5" value={inf.engRate} onChange={e=>setInf({...inf,engRate:e.target.value})} />
            </label>
          </div>
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Bio</span></div>
            <textarea className="textarea textarea-bordered min-h-[88px] resize-y bg-base-200" placeholder="Tell brands your story in a few lines..." value={inf.bio} onChange={e=>setInf({...inf,bio:e.target.value})} />
          </label>
        </div>
      </>
    );

    if (step === 1) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">📱</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Platforms & Niches</div>
            <div className="text-xs mt-0.5 text-base-content/40">Where do you create content?</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 2 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Your Platforms</span>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(p => (
                <button key={p.id}
                  className={`btn btn-sm rounded-full gap-1.5 transition-all border ${platforms.includes(p.id) ? 'bg-[#F39221] border-[#F39221] text-white' : 'bg-transparent border-base-content/10 text-base-content/40'}`}
                  onClick={()=>setPlatforms(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])}>
                  <span>{p.icon}</span>{p.label}
                  {platforms.includes(p.id) && <span className="text-[0.6rem]">✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Content Niches</span>
            <div className="flex flex-wrap gap-2">
              {NICHES.map(n => (
                <button key={n}
                  className={`btn btn-xs rounded-lg transition-all border ${niches.includes(n) ? 'bg-[#3D7E8C] border-[#3D7E8C] text-white' : 'bg-transparent border-base-content/10 text-base-content/40'}`}
                  onClick={()=>setNiches(prev=>prev.includes(n)?prev.filter(x=>x!==n):[...prev,n])}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );

    if (step === 2) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">📊</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Audience Stats</div>
            <div className="text-xs mt-0.5 text-base-content/40">Help brands understand your reach</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 3 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-5">
          {[
            { label: "Followers", val: followers, setVal: setFollowers, min: 1000, max: 10000000, step: 1000 },
            { label: "Avg Views / Post", val: avgViews, setVal: setAvgViews, min: 100, max: 5000000, step: 100 },
            { label: "Highest Views", val: highestView, setVal: setHighestView, min: 1000, max: 50000000, step: 1000 },
          ].map(({ label, val, setVal, min, max, step: s }) => (
            <div key={label} className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">{label}</span>
                <span className="text-sm font-bold tabular-nums text-[#F39221]">{formatRange(val)}</span>
              </div>
              <input type="range" className="range range-xs w-full accent-[#F39221]" min={min} max={max} step={s} value={val} onChange={e=>setVal(Number(e.target.value))} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Audience Age</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={audienceAge} onChange={e=>setAudienceAge(e.target.value)}>
                <option value="">Select</option>
                <option>13–17</option><option>18–24</option><option>25–34</option><option>35–44</option><option>45+</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Audience Gender</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={audienceGender} onChange={e=>setAudienceGender(e.target.value)}>
                <option value="">Select</option>
                <option>Mostly Male</option><option>Mostly Female</option><option>Mixed</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );

    if (step === 3) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">🤝</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Collaboration Prefs</div>
            <div className="text-xs mt-0.5 text-base-content/40">What kind of deals do you want?</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 4 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Collab Type</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={inf.collabType} onChange={e=>setInf({...inf,collabType:e.target.value})}>
                <option value="">Select</option>
                <option>Paid Partnership</option>
                <option>Barter / Free Product</option>
                <option>Affiliate</option>
                <option>Long-term Ambassador</option>
                <option>Open to all</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Rate per Post (₹)</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="e.g. 15000" value={inf.ratePerPost} onChange={e=>setInf({...inf,ratePerPost:e.target.value})} />
            </label>
          </div>
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Past Collaborations</span></div>
            <textarea className="textarea textarea-bordered min-h-[88px] resize-y bg-base-200" placeholder="Brands you've worked with before..." value={inf.pastCollaborations} onChange={e=>setInf({...inf,pastCollaborations:e.target.value})} />
          </label>
        </div>
      </>
    );
  };

  const renderBrandStep = () => {
    if (step === 0) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">🏢</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Company Details</div>
            <div className="text-xs mt-0.5 text-base-content/40">Who's behind this campaign?</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 1 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Company / Brand *</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="Acme Corp" value={brand.company} onChange={e=>setBrand({...brand,company:e.target.value})} />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Contact Person</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="Ananya Singh" value={brand.contact} onChange={e=>setBrand({...brand,contact:e.target.value})} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Business Email *</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" type="email" placeholder="marketing@co.com" value={brand.email} onChange={e=>setBrand({...brand,email:e.target.value})} />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Phone</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="+91 XXXXX XXXXX" value={brand.phone} onChange={e=>setBrand({...brand,phone:e.target.value})} />
            </label>
          </div>
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Website</span></div>
            <input className="input input-bordered input-sm w-full bg-base-200" placeholder="https://yourcompany.com" value={brand.website} onChange={e=>setBrand({...brand,website:e.target.value})} />
          </label>
        </div>
      </>
    );

    if (step === 1) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">🎯</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Influencer Requirements</div>
            <div className="text-xs mt-0.5 text-base-content/40">What kind of creator are you looking for?</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 2 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Influencer Niche</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={brand.niche} onChange={e=>setBrand({...brand,niche:e.target.value})}>
                <option value="">Select niche</option>
                {BRAND_NICHES.map(n=><option key={n}>{n}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Preferred Tier</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={brand.influencerTier} onChange={e=>setBrand({...brand,influencerTier:e.target.value})}>
                <option value="">Select tier</option>
                <option>Nano (1K–10K)</option>
                <option>Micro (10K–100K)</option>
                <option>Mid-Tier (100K–500K)</option>
                <option>Macro (500K–1M)</option>
                <option>Mega / Celebrity (1M+)</option>
                <option>Open to all</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Platform</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={brand.platformPref} onChange={e=>setBrand({...brand,platformPref:e.target.value})}>
                <option value="">Any platform</option>
                {PLATFORMS.map(p=><option key={p.id}>{p.label}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Audience Location</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="Pan India / Mumbai" value={brand.audienceLocation} onChange={e=>setBrand({...brand,audienceLocation:e.target.value})} />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Content Categories</span>
            <div className="flex flex-wrap gap-2">
              {BRAND_NICHES.map(n=>(
                <button key={n}
                  className={`btn btn-xs rounded-lg transition-all border ${brandNiches.includes(n) ? 'bg-[#3D7E8C] border-[#3D7E8C] text-white' : 'bg-transparent border-base-content/10 text-base-content/40'}`}
                  onClick={()=>setBrandNiches(prev=>prev.includes(n)?prev.filter(x=>x!==n):[...prev,n])}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );

    if (step === 2) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">💰</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Budget & Timeline</div>
            <div className="text-xs mt-0.5 text-base-content/40">Define your campaign scope</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 3 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Campaign Budget (₹)</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="e.g. 50000" value={brand.budget} onChange={e=>setBrand({...brand,budget:e.target.value})} />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Timeline</span></div>
              <input className="input input-bordered input-sm w-full bg-base-200" placeholder="e.g. 2 weeks" value={brand.timeline} onChange={e=>setBrand({...brand,timeline:e.target.value})} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Deliverables</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={brand.deliverables} onChange={e=>setBrand({...brand,deliverables:e.target.value})}>
                <option value="">Select</option>
                <option>Instagram Post + Story</option>
                <option>YouTube Dedicated Video</option>
                <option>YouTube Integration</option>
                <option>TikTok Video</option>
                <option>Reels Only</option>
                <option>Custom Package</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Collaboration Type</span></div>
              <select className="select select-bordered select-sm w-full bg-base-200" value={brand.collabType} onChange={e=>setBrand({...brand,collabType:e.target.value})}>
                <option value="">Select</option>
                <option>One-time Campaign</option>
                <option>Long-term / Ambassador</option>
                <option>Affiliate Marketing</option>
                <option>Barter / Product Gifting</option>
                <option>Event Coverage</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );

    if (step === 3) return (
      <>
        <div className="flex items-start gap-4 p-8 pb-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">📋</div>
          <div className="flex-1">
            <div className="text-lg font-bold">Campaign Details</div>
            <div className="text-xs mt-0.5 text-base-content/40">Describe what you're looking for</div>
          </div>
          <div className="text-xs font-semibold tracking-widest pt-1 text-[#3D7E8C]/60">Step 4 of 4</div>
        </div>
        <div className="p-8 pt-6 flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Campaign Description</span></div>
            <textarea className="textarea textarea-bordered min-h-[88px] resize-y bg-base-200" placeholder="Describe your product and campaign goals..." value={brand.description} onChange={e=>setBrand({...brand,description:e.target.value})} />
          </label>
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text text-[0.7rem] font-semibold tracking-widest uppercase text-[#3D7E8C]/70">Special Notes</span></div>
            <textarea className="textarea textarea-bordered min-h-[72px] resize-y bg-base-200" placeholder="Any do's, don'ts, or specific requirements for influencers..." value={brand.specialNotes} onChange={e=>setBrand({...brand,specialNotes:e.target.value})} />
          </label>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden font-serif text-base-content" data-theme="night" style={{background: "hsl(var(--b3, 222 47% 11%))"}}>

      {/* ── AMBIENT ORBS ── */}
      <div className="fixed pointer-events-none z-0" style={{top:"-120px",left:"-80px",width:"520px",height:"520px",borderRadius:"50%",background:"rgba(243,146,33,0.07)",filter:"blur(80px)"}} />
      <div className="fixed pointer-events-none z-0" style={{bottom:"-80px",right:"-60px",width:"440px",height:"440px",borderRadius:"50%",background:"rgba(61,126,140,0.07)",filter:"blur(80px)"}} />

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-screen">
        {/* BG image */}
        <div className="absolute inset-0 z-0 bg-neutral">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* dark + colour overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[hsl(var(--b3,222_47%_11%))] via-[hsl(var(--b3,222_47%_11%))/80] to-[hsl(var(--b3,222_47%_11%))/40]" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 animate-[fadeIn_0.9s_ease_both]">
          {/* badge */}
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[3px] uppercase mb-8 px-5 py-2 rounded-full text-[#F39221] border border-[#F39221]/30 bg-[#F39221]/10">
            ✦ Influencer Platform ✦
          </div>

          {/* MAIN HEADING — default serif font as instructed */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-5 text-slate-100">
            Connect.{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F39221] to-[#F39221]">
              Collaborate.
            </span>{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#3D7E8C] to-[#3D7E8C]">
              Grow.
            </span>
          </h1>

          <p className="text-sm font-light leading-relaxed max-w-lg mx-auto mb-10 text-slate-100">
            The bridge between creators and brands — build real partnerships that move the needle across India's fastest-growing creator economy.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              className="btn btn-md px-8 py-4 font-bold bg-[#F39221] border-none text-white rounded-full hover:bg-[#e0831c] transition-colors"
              onClick={()=>{ const el=document.getElementById("get-started"); el&&el.scrollIntoView({behavior:"smooth"}); }}>
              Get Started →
            </button>
            <button
              className="btn btn-md px-8 py-4 font-bold bg-base-200 border border-[#3D7E8C]/50 text-[#3D7E8C] rounded-full hover:bg-base-300 transition-colors"
              onClick={()=>{ const el=document.getElementById("how-it-works"); el&&el.scrollIntoView({behavior:"smooth"}); }}>
              How It Works
            </button>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce text-base-content/50">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════ */}
      <section className="w-full py-14 px-6 relative z-10 bg-base-100 border-y border-base-content/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl font-bold text-[#F39221]">{s.value}</span>
              <span className="text-xs tracking-widest uppercase text-base-content/70">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="w-full py-20 px-6 relative z-10 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-[11px] font-semibold tracking-[3px] uppercase mb-4 px-4 py-1.5 rounded-full text-base-content border border-[#3D7E8C]/30 bg-[#3D7E8C]/10">
              The Process
            </div>
           <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6 tracking-tighter">
              Four steps <span className="text-[#F39221]">for your</span> <span className="text-[#3D7E8C]">next deal.</span>
            </h2>
            <p className="text-base-content/80 text-sm max-w-[480px] mx-auto">Simple, fast, and built for India's creator economy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map((item, idx) => (
              <div key={idx} className="rounded-3xl p-7 flex gap-5 items-start transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-content/10 shadow-lg">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-base-200">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold mb-1.5 text-base-content font-serif">{item.title}</div>
                  <div className="text-sm leading-relaxed text-base-content/70">{item.desc}</div>
                </div>
                <div className="ml-auto text-3xl font-bold shrink-0 text-base-content/10 font-serif">0{idx+1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GET STARTED — Role selector + Wizard
      ══════════════════════════════════════════ */}
      <section id="get-started" className="w-full py-20 px-4 relative z-10 bg-base-100">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-[11px] font-semibold tracking-[3px] uppercase mb-4 px-4 py-1.5 rounded-full text-[#F39221] border border-[#F39221]/30 bg-[#F39221]/10">
              Join Now
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6 tracking-tighter">
              Who are <span className="text-[#F39221]">you?</span>
            </h2>
            <p className="text-base-content/80 text-sm">Choose your role to get started.</p>
          </div>

          {/* Role cards */}
          <div className="flex gap-4 mb-12 max-sm:flex-col justify-center">
            {[
              { id:"influencer", icon:"🎙️", label:"I'm a Creator",  desc:"Find brand deals & grow your income" },
              { id:"brand",      icon:"🏢", label:"I'm a Brand",    desc:"Discover influencers for your campaign" },
            ].map(r => (
              <div key={r.id}
                className={`flex flex-col items-center gap-3 px-10 py-7 rounded-2xl cursor-pointer transition-all duration-300 min-w-[180px] border ${role === r.id ? 'border-2 border-[#F39221] bg-[#3D7E8C] shadow-[0_0_0_1px_rgba(243,146,33,0.2),0_8px_40px_rgba(243,146,33,0.15)]' : 'border border-base-content/5 bg-base-200 hover:bg-base-300'}`}
                onClick={()=>pickRole(r.id)}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{background:role===r.id?"rgba(243,146,33,0.15)":"rgba(255,255,255,0.05)"}}>
                  {r.icon}
                </div>
                <div className="text-sm font-semibold text-base-content font-serif">{r.label}</div>
                <div className="text-xs text-center leading-snug text-base-content/60">{r.desc}</div>
              </div>
            ))}
          </div>

          {/* Wizard */}
          {role && !done && (
            <div className="w-full">
              {/* Stepper */}
              <div className="flex items-center justify-center mb-10 px-2">
                {steps.map((s, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 relative">
                    {i < steps.length - 1 && (
                      <div className="absolute top-[18px] left-[calc(50%+18px)] w-[calc(100%-36px)] h-[1.5px] z-0 transition-colors duration-300" style={{background: i < step ? "#F39221" : "rgba(255,255,255,0.1)"}} />
                    )}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold relative z-10 cursor-pointer transition-all duration-300 border ${i < step ? 'bg-[#3D7E8C] border-[#3D7E8C] text-white' : i === step ? 'bg-[#F39221] border-[#F39221] text-white shadow-[0_0_20px_rgba(243,146,33,0.35)]' : 'bg-transparent border-base-content/10 text-base-content/20'}`}
                      onClick={()=>i<step&&setStep(i)}>
                      {i < step ? "✓" : i+1}
                    </div>
                    <div className="text-[0.68rem] font-medium mt-2 text-center uppercase tracking-[0.5px] transition-colors duration-300" style={{color: i === step ? "#F39221" : i < step ? "#3D7E8C" : "rgba(255,255,255,0.2)"}}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-[2px] rounded mb-8 overflow-hidden bg-base-content/10">
                <div className="h-full rounded transition-all duration-500 bg-gradient-to-r from-[#F39221] to-[#3D7E8C]" style={{width:`${progress}%`}} />
              </div>

              {/* Panel */}
              <div className="rounded-3xl overflow-hidden relative bg-base-200 border border-base-content/10 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F39221] to-[#3D7E8C] opacity-60" />
                {role === "influencer" ? renderInfStep() : renderBrandStep()}
                {/* Nav */}
                <div className="flex items-center justify-between px-8 py-5 border-t border-base-content/10">
                  <button
                    className="btn btn-sm gap-2 font-medium bg-transparent border border-base-content/20 text-base-content/50 hover:bg-base-content/5"
                    style={{visibility: step===0 ? "hidden" : "visible"}}
                    onClick={goBack}>
                    ← Back
                  </button>
                  <button
                    className={`btn btn-sm gap-2 font-bold text-white ${isLastStep ? 'bg-gradient-to-r from-[#F39221] to-[#3D7E8C] border-none shadow-[0_4px_24px_rgba(243,146,33,0.3)]' : 'bg-[#F39221] border-none shadow-[0_4px_20px_rgba(243,146,33,0.25)] hover:bg-[#e0831c]'}`}
                    onClick={handleNext}
                    disabled={loading}>
                    {loading ? "Saving…" : isLastStep ? "🚀 Submit Profile" : "Continue →"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success */}
          {role && done && (
            <div className="rounded-3xl overflow-hidden relative bg-base-200 border border-base-content/10 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F39221] to-[#3D7E8C] opacity-60" />
              <div className="text-center py-16 px-10">
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 bg-[#3D7E8C]/10 border-2 border-[#3D7E8C] animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both]">
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-2.5 font-serif text-base-content">
                  {role === "influencer" ? "Profile Live!" : "Campaign Posted!"}
                </h3>
                <p className="text-sm leading-relaxed text-base-content/60">
                  {role === "influencer"
                    ? "Your influencer profile is now visible to brands. Scroll down to apply to open campaigns."
                    : "Your campaign is now live. Influencers can discover and apply to it below."}
                </p>
                <button
                  className="btn btn-sm mt-6 gap-2 bg-transparent border border-[#F39221]/40 text-[#F39221] hover:bg-[#F39221]/10"
                  onClick={()=>{setDone(false);setStep(0);}}>
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          )}

          {!role && (
            <p className="text-sm text-center mt-2 text-base-content/20">↑ Choose your role above to get started</p>
          )}

          {/* Browse */}
          {role && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[0.7rem] font-semibold tracking-[2px] uppercase flex items-center gap-2 text-base-content/35">
                  <span className="block w-[20px] h-[1.5px] bg-[#F39221]" />
                  {role === "influencer" ? "Open Brand Campaigns" : "Registered Influencers"}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {browseFilters.map(f=>(
                  <button key={f}
                    className={`btn btn-xs rounded-full transition-all border ${browseFilter===f ? 'bg-[#F39221] border-[#F39221] text-white' : 'bg-transparent border-base-content/10 text-base-content/40 hover:bg-base-content/5'}`}
                    onClick={()=>setBrowseFilter(f)}>
                    {f}
                  </button>
                ))}
              </div>

              {role === "influencer" && filteredCampaigns.length === 0 && (
                <p className="text-xs text-center py-6 text-base-content/20">No campaigns yet</p>
              )}
              {role === "brand" && filteredInfluencers.length === 0 && (
                <p className="text-xs text-center py-6 text-base-content/20">No influencers registered yet</p>
              )}

              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                {role === "influencer" && filteredCampaigns.map(b=>(
                  <div key={b._id}
                    className="rounded-2xl p-[18px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 bg-base-200 border border-base-content/10"
                    onClick={()=>setApplyModal(b)}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 bg-[#F39221]/10">🏢</div>
                      <div>
                        <div className="text-sm font-semibold text-base-content font-serif">{b.company}</div>
                        <div className="text-[0.7rem] mt-0.5 text-base-content/40">{b.niche || b.niches?.[0] || "Brand Campaign"}</div>
                      </div>
                    </div>
                    <div className="flex gap-3.5 flex-wrap">
                      <div className="text-[0.73rem] text-base-content/40"><strong className="block text-[0.83rem] font-bold text-base-content">{b.budget?`₹${b.budget}`:"—"}</strong>Budget</div>
                      <div className="text-[0.73rem] text-base-content/40"><strong className="block text-[0.83rem] font-bold text-base-content">{b.timeline||"—"}</strong>Timeline</div>
                    </div>
                    <div className="mt-2.5 text-[0.7rem] font-semibold text-[#F39221]">Tap to apply →</div>
                  </div>
                ))}

                {role === "brand" && filteredInfluencers.map(i=>(
                  <div key={i._id} className="rounded-2xl p-[18px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 bg-base-200 border border-base-content/10">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 bg-[#3D7E8C]/10">🎙️</div>
                      <div>
                        <div className="text-sm font-semibold text-base-content font-serif">{i.name}</div>
                        <div className="text-[0.7rem] mt-0.5 text-base-content/40">@{i.handle} · {i.platforms?.[0]||"Creator"}</div>
                      </div>
                    </div>
                    <div className="flex gap-3.5 flex-wrap">
                      <div className="text-[0.73rem] text-base-content/40"><strong className="block text-[0.83rem] font-bold text-base-content">{formatRange(i.followers)}</strong>Followers</div>
                      <div className="text-[0.73rem] text-base-content/40"><strong className="block text-[0.83rem] font-bold text-base-content">{formatRange(i.avgViews)}</strong>Avg Views</div>
                      {i.ratePerPost && <div className="text-[0.73rem] text-base-content/40"><strong className="block text-[0.83rem] font-bold text-base-content">₹{i.ratePerPost}</strong>Per Post</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="w-full py-20 px-6 relative z-10 bg-[#3D7E8C]/5 border-y border-base-content/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-[11px] font-semibold tracking-[3px] uppercase mb-4 px-4 py-1.5 rounded-full text-[#3D7E8C] border border-[#3D7E8C]/30 bg-[#3D7E8C]/10">
              Creators Love Us
            </div>
            <h2 className="text-2xl md:text-4xl font-normal font-serif text-slate-100">
              Real stories, real results
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="rounded-2xl p-7 flex flex-col gap-5 bg-base-100 border border-base-content/10 shadow-lg">
                <div className="text-[0.85rem] leading-relaxed italic text-base-content/60 font-serif">
                  "{t.text}"
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-[#F39221] to-[#3D7E8C] text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-base-content font-serif">{t.name}</div>
                    <div className="text-[0.7rem] text-base-content/40">{t.handle} · {t.followers} followers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* ── Apply Modal ── */}
      {applyModal && (
        <div className="modal modal-open" onClick={()=>{setApplyModal(null);setApplyMsg("");}}>
          <div className="modal-box rounded-2xl bg-base-200 border border-[#F39221]/30" onClick={e=>e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-1.5 font-serif text-base-content">Apply to {applyModal.company}</h3>
            <p className="text-[0.82rem] mb-4 leading-relaxed text-base-content/60">{applyModal.description || "No description provided."}</p>
            <textarea
              className="textarea textarea-bordered w-full bg-base-100 border-[#3D7E8C]/30 text-base-content"
              placeholder="Introduce yourself and why you're a great fit…"
              value={applyMsg}
              onChange={e=>setApplyMsg(e.target.value)}
            />
            <div className="modal-action gap-2 mt-4">
              <button className="btn btn-sm flex-1 bg-transparent border border-base-content/10 text-base-content/50" onClick={()=>{setApplyModal(null);setApplyMsg("");}}>Cancel</button>
              <button className="btn btn-sm flex-[2] font-bold bg-[#F39221] border-none text-white shadow-[0_4px_16px_rgba(243,146,33,0.3)] hover:bg-[#e0831c]" onClick={handleApply}>🚀 Send Application</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast toast-bottom toast-center z-[9999]">
          <div className="alert text-sm font-medium bg-base-200 border border-[#F39221]/30 text-base-content shadow-xl">
            <span>{toast}</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}