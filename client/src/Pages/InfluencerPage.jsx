
import { useState, useEffect } from "react";



const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/influencer"
    : "https://digital-marketing-temp.onrender.com/api/influencer";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "youtube", label: "YouTube", icon: "▶️" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "twitter", label: "Twitter/X", icon: "𝕏" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "facebook", label: "Facebook", icon: "📘" },
];

const NICHES = [
  "Fitness & Gym",
  "Food & Cooking",
  "Travel",
  "Tech & Gadgets",
  "Fashion",
  "Beauty",
  "Finance",
  "Gaming",
  "Health & Wellness",
  "Lifestyle",
  "Parenting",
  "Education",
  "Comedy",
  "Music",
  "Automotive",
];

const BRAND_NICHES = [
  "Gym & Fitness",
  "Food & Beverage",
  "Travel & Tourism",
  "Tech Products",
  "Fashion & Apparel",
  "Beauty & Skincare",
  "Finance & Crypto",
  "Gaming",
  "Health & Wellness",
  "Lifestyle",
  "Parenting",
  "EdTech",
  "Entertainment",
  "Automotive",
];

function formatRange(val) {
  if (!val) return "—";
  if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr+";
  if (val >= 100000) return (val / 100000).toFixed(1) + "L";
  if (val >= 1000) return (val / 1000).toFixed(0) + "K";
  return val;
}

const INF_STEPS = [
  { label: "Profile", icon: "👤" },
  { label: "Platforms", icon: "📱" },
  { label: "Audience", icon: "📊" },
  { label: "Collabs", icon: "🤝" },
];

const BRAND_STEPS = [
  { label: "Company", icon: "🏢" },
  { label: "Campaign", icon: "🎯" },
  { label: "Budget", icon: "💰" },
  { label: "Details", icon: "📋" },
];

const STATS = [
  { value: "12,400+", label: "Creators Registered" },
  { value: "3,200+", label: "Brand Campaigns" },
  { value: "₹48Cr+", label: "Deals Closed" },
  { value: "94%", label: "Satisfaction Rate" },
];

const HOW_IT_WORKS = [
  {
    icon: "✍️",
    title: "Create Your Profile",
    desc: "Influencers build their media kit; brands post campaign briefs — takes under 5 minutes.",
  },
  {
    icon: "🔍",
    title: "Discover & Match",
    desc: "Smart filters surface the right creators for every niche, tier, and audience demographic.",
  },
  {
    icon: "🤝",
    title: "Connect & Negotiate",
    desc: "Apply directly to campaigns or receive inbound pitches from brands that love your content.",
  },
  {
    icon: "🚀",
    title: "Execute & Grow",
    desc: "Close the deal, deliver great content, and unlock your next collab with a growing reputation.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Menon",
    handle: "@priyacooks",
    niche: "Food & Cooking",
    followers: "280K",
    text: "Landed 4 paid collabs in my first month. The platform actually understands what micro-influencers need.",
    avatar: "PM",
  },
  {
    name: "Arjun Sethi",
    handle: "@techwitharjun",
    niche: "Tech & Gadgets",
    followers: "95K",
    text: "The campaign briefs are super detailed — no more back-and-forth emails just to understand the requirements.",
    avatar: "AS",
  },
  {
    name: "Sneha Kapoor",
    handle: "@snehalifestyle",
    niche: "Lifestyle",
    followers: "1.2M",
    text: "Finally a platform that treats influencers like professionals, not just ad inventory.",
    avatar: "SK",
  },
];

export default function InfluencerPage() {
  const [role, setRole] = useState(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const [platforms, setPlatforms] = useState([]);
  const [niches, setNiches] = useState([]);
  const [followers, setFollowers] = useState(50000);
  const [avgViews, setAvgViews] = useState(20000);
  const [highestView, setHighestView] = useState(100000);
  const [audienceAge, setAudienceAge] = useState("");
  const [audienceGender, setAudienceGender] = useState("");

  const [inf, setInf] = useState({
    name: "",
    handle: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    engRate: "",
    collabType: "",
    ratePerPost: "",
    pastCollaborations: "",
  });

  const [brandNiches, setBrandNiches] = useState([]);

  const [brand, setBrand] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    website: "",
    niche: "",
    influencerTier: "",
    platformPref: "",
    audienceLocation: "",
    budget: "",
    timeline: "",
    description: "",
    deliverables: "",
    collabType: "",
    specialNotes: "",
  });

  const [liveCampaigns, setLiveCampaigns] = useState([]);
  const [liveInfluencers, setLiveInfluencers] = useState([]);
  const [browseFilter, setBrowseFilter] = useState("All");
  const [applyModal, setApplyModal] = useState(null);
  const [applyMsg, setApplyMsg] = useState("");

  const [myInfluencerId, setMyInfluencerId] = useState(
    () => localStorage.getItem("myInfluencerId") || null
  );

  const [myCampaignId, setMyCampaignId] = useState(
    () => localStorage.getItem("myCampaignId") || null
  );

  useEffect(() => {
    if (role === "influencer") {
      fetch(`${API}/campaigns`)
        .then((r) => r.json())
        .then(setLiveCampaigns)
        .catch(() => {});
    }

    if (role === "brand") {
      fetch(`${API}/influencers`)
        .then((r) => r.json())
        .then(setLiveInfluencers)
        .catch(() => {});
    }
  }, [role, done]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const pickRole = (r) => {
    setRole(r);
    setStep(0);
    setDone(false);
    setBrowseFilter("All");
  };

  const goBack = () => step > 0 && setStep((s) => s - 1);
  const goNext = () => setStep((s) => s + 1);

  const steps = role === "influencer" ? INF_STEPS : BRAND_STEPS;
  const progress = ((step + 1) / steps.length) * 100;

  const submitInfluencer = async () => {
    if (!inf.name || !inf.handle || !inf.email) {
      return showToast("❌ Name, handle & email required");
    }

    setLoading(true);

    try {
      const body = {
        ...inf,
        platforms,
        niches,
        followers,
        avgViews,
        highestView,
        audienceAge,
        audienceGender,
      };

      const res = await fetch(`${API}/influencers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("myInfluencerId", data._id);
      setMyInfluencerId(data._id);
      setDone(true);
    } catch (err) {
      showToast("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitBrand = async () => {
    if (!brand.company || !brand.email) {
      return showToast("❌ Company name & email required");
    }

    setLoading(true);

    try {
      const body = {
        ...brand,
        niches: brandNiches,
      };

      const res = await fetch(`${API}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("myCampaignId", data._id);
      setMyCampaignId(data._id);
      setDone(true);
    } catch (err) {
      showToast("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!myInfluencerId) {
      return showToast("❌ Create your influencer profile first");
    }

    if (!applyModal) return;

    try {
      const res = await fetch(`${API}/campaigns/${applyModal._id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          influencerId: myInfluencerId,
          message: applyMsg,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        return showToast("⚠️ Already applied to this campaign");
      }

      if (!res.ok) throw new Error(data.error);

      showToast("✅ Application sent to " + applyModal.company + "!");
      setApplyModal(null);
      setApplyMsg("");
    } catch (err) {
      showToast("❌ " + err.message);
    }
  };

  const browseFilters =
    role === "influencer"
      ? ["All", ...new Set(liveCampaigns.map((b) => b.niche).filter(Boolean))]
      : [
          "All",
          ...new Set(
            liveInfluencers.flatMap((i) => i.niches || []).filter(Boolean)
          ),
        ];

  const filteredCampaigns =
    browseFilter === "All"
      ? liveCampaigns
      : liveCampaigns.filter((b) => b.niche === browseFilter);

  const filteredInfluencers =
    browseFilter === "All"
      ? liveInfluencers
      : liveInfluencers.filter((i) =>
          i.niches?.includes(browseFilter)
        );

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      if (role === "influencer") submitInfluencer();
      else submitBrand();
    } else {
      goNext();
    }
  };

  /* =========================================================
     SHARED FORM STYLES
  ========================================================= */

  const inputClass =
    "input input-bordered w-full bg-base-100 border-slate-200 focus:border-[#3D7E8C] focus:outline-none focus:ring-2 focus:ring-[#3D7E8C]/10";

  const selectClass =
    "select select-bordered w-full bg-base-100 border-slate-200 focus:border-[#3D7E8C] focus:outline-none";

  const textareaClass =
    "textarea textarea-bordered w-full bg-base-100 border-slate-200 focus:border-[#3D7E8C] focus:outline-none focus:ring-2 focus:ring-[#3D7E8C]/10";

  const labelClass =
    "label-text text-[11px] font-black uppercase tracking-widest text-[#3D7E8C]";

  /* =========================================================
     INFLUENCER FORM
  ========================================================= */

  const renderInfStep = () => {
    if (step === 0)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                👤
              </div>

              <div className="flex-1">
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 01
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Personal Information
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Tell brands your story. Building authentic partnerships
                  starts by sharing who you are.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Full Name *</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="Rahul Sharma"
                  value={inf.name}
                  onChange={(e) =>
                    setInf({ ...inf, name: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Handle *</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="@yourhandle"
                  value={inf.handle}
                  onChange={(e) =>
                    setInf({ ...inf, handle: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Email *</span>
                </div>

                <input
                  className={inputClass}
                  type="email"
                  placeholder="you@email.com"
                  value={inf.email}
                  onChange={(e) =>
                    setInf({ ...inf, email: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Phone</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="+91 XXXXX XXXXX"
                  value={inf.phone}
                  onChange={(e) =>
                    setInf({ ...inf, phone: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Location</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="Mumbai, India"
                  value={inf.location}
                  onChange={(e) =>
                    setInf({ ...inf, location: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>
                    Engagement Rate (%)
                  </span>
                </div>

                <input
                  className={inputClass}
                  placeholder="e.g. 4.5"
                  value={inf.engRate}
                  onChange={(e) =>
                    setInf({ ...inf, engRate: e.target.value })
                  }
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label pb-2">
                <span className={labelClass}>Bio</span>
              </div>

              <textarea
                className={`${textareaClass} min-h-[120px]`}
                placeholder="Tell brands your story in a few lines..."
                value={inf.bio}
                onChange={(e) =>
                  setInf({ ...inf, bio: e.target.value })
                }
              />
            </label>
          </div>
        </>
      );

    if (step === 1)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                📱
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 02
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Platforms & Niches
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Tell brands where you create content and what you create.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-8">
            <div>
              <span className={labelClass}>Your Platforms</span>

              <div className="flex flex-wrap gap-3 mt-4">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 border ${
                      platforms.includes(p.id)
                        ? "bg-[#F39221] border-[#F39221] text-white shadow-lg shadow-orange-200"
                        : "bg-white border-slate-200 text-slate-500 hover:border-[#3D7E8C] hover:text-[#3D7E8C]"
                    }`}
                    onClick={() =>
                      setPlatforms((prev) =>
                        prev.includes(p.id)
                          ? prev.filter((x) => x !== p.id)
                          : [...prev, p.id]
                      )
                    }
                  >
                    <span>{p.icon}</span> {p.label}
                    {platforms.includes(p.id) && (
                      <span className="ml-1">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={labelClass}>Content Niches</span>

              <div className="flex flex-wrap gap-2.5 mt-4">
                {NICHES.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                      niches.includes(n)
                        ? "bg-[#3D7E8C] border-[#3D7E8C] text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-[#3D7E8C] hover:text-[#3D7E8C]"
                    }`}
                    onClick={() =>
                      setNiches((prev) =>
                        prev.includes(n)
                          ? prev.filter((x) => x !== n)
                          : [...prev, n]
                      )
                    }
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      );

    if (step === 2)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                📊
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 03
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Audience Stats
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Help brands understand your reach and audience.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-7">
            {[
              {
                label: "Followers",
                val: followers,
                setVal: setFollowers,
                min: 1000,
                max: 10000000,
                step: 1000,
              },
              {
                label: "Avg Views / Post",
                val: avgViews,
                setVal: setAvgViews,
                min: 100,
                max: 5000000,
                step: 100,
              },
              {
                label: "Highest Views",
                val: highestView,
                setVal: setHighestView,
                min: 1000,
                max: 50000000,
                step: 1000,
              },
            ].map(({ label, val, setVal, min, max, step: s }) => (
              <div key={label} className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className={labelClass}>{label}</span>

                  <span className="text-lg font-black text-[#F39221]">
                    {formatRange(val)}
                  </span>
                </div>

                <input
                  type="range"
                  className="range range-sm w-full accent-[#F39221]"
                  min={min}
                  max={max}
                  step={s}
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Audience Age</span>
                </div>

                <select
                  className={selectClass}
                  value={audienceAge}
                  onChange={(e) => setAudienceAge(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>13–17</option>
                  <option>18–24</option>
                  <option>25–34</option>
                  <option>35–44</option>
                  <option>45+</option>
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Audience Gender</span>
                </div>

                <select
                  className={selectClass}
                  value={audienceGender}
                  onChange={(e) =>
                    setAudienceGender(e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option>Mostly Male</option>
                  <option>Mostly Female</option>
                  <option>Mixed</option>
                </select>
              </label>
            </div>
          </div>
        </>
      );

    if (step === 3)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                🤝
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 04
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Collaboration Preferences
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Tell brands what kind of partnerships you want.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Collab Type</span>
                </div>

                <select
                  className={selectClass}
                  value={inf.collabType}
                  onChange={(e) =>
                    setInf({ ...inf, collabType: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Paid Partnership</option>
                  <option>Barter / Free Product</option>
                  <option>Affiliate</option>
                  <option>Long-term Ambassador</option>
                  <option>Open to all</option>
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Rate per Post (₹)</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="e.g. 15000"
                  value={inf.ratePerPost}
                  onChange={(e) =>
                    setInf({ ...inf, ratePerPost: e.target.value })
                  }
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label pb-2">
                <span className={labelClass}>Past Collaborations</span>
              </div>

              <textarea
                className={`${textareaClass} min-h-[120px]`}
                placeholder="Brands you've worked with before..."
                value={inf.pastCollaborations}
                onChange={(e) =>
                  setInf({
                    ...inf,
                    pastCollaborations: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </>
      );
  };

  /* =========================================================
     BRAND FORM
  ========================================================= */

  const renderBrandStep = () => {
    if (step === 0)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                🏢
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 01
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Company Details
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Tell creators who's behind this campaign.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>
                    Company / Brand *
                  </span>
                </div>

                <input
                  className={inputClass}
                  placeholder="Acme Corp"
                  value={brand.company}
                  onChange={(e) =>
                    setBrand({ ...brand, company: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Contact Person</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="Ananya Singh"
                  value={brand.contact}
                  onChange={(e) =>
                    setBrand({ ...brand, contact: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>
                    Business Email *
                  </span>
                </div>

                <input
                  className={inputClass}
                  type="email"
                  placeholder="marketing@co.com"
                  value={brand.email}
                  onChange={(e) =>
                    setBrand({ ...brand, email: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Phone</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="+91 XXXXX XXXXX"
                  value={brand.phone}
                  onChange={(e) =>
                    setBrand({ ...brand, phone: e.target.value })
                  }
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label pb-2">
                <span className={labelClass}>Website</span>
              </div>

              <input
                className={inputClass}
                placeholder="https://yourcompany.com"
                value={brand.website}
                onChange={(e) =>
                  setBrand({ ...brand, website: e.target.value })
                }
              />
            </label>
          </div>
        </>
      );

    if (step === 1)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                🎯
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 02
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Influencer Requirements
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Define the kind of creator you are looking for.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>
                    Influencer Niche
                  </span>
                </div>

                <select
                  className={selectClass}
                  value={brand.niche}
                  onChange={(e) =>
                    setBrand({ ...brand, niche: e.target.value })
                  }
                >
                  <option value="">Select niche</option>

                  {BRAND_NICHES.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Preferred Tier</span>
                </div>

                <select
                  className={selectClass}
                  value={brand.influencerTier}
                  onChange={(e) =>
                    setBrand({
                      ...brand,
                      influencerTier: e.target.value,
                    })
                  }
                >
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

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Platform</span>
                </div>

                <select
                  className={selectClass}
                  value={brand.platformPref}
                  onChange={(e) =>
                    setBrand({
                      ...brand,
                      platformPref: e.target.value,
                    })
                  }
                >
                  <option value="">Any platform</option>

                  {PLATFORMS.map((p) => (
                    <option key={p.id}>{p.label}</option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>
                    Audience Location
                  </span>
                </div>

                <input
                  className={inputClass}
                  placeholder="Pan India / Mumbai"
                  value={brand.audienceLocation}
                  onChange={(e) =>
                    setBrand({
                      ...brand,
                      audienceLocation: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div>
              <span className={labelClass}>Content Categories</span>

              <div className="flex flex-wrap gap-2.5 mt-4">
                {BRAND_NICHES.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                      brandNiches.includes(n)
                        ? "bg-[#3D7E8C] border-[#3D7E8C] text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-[#3D7E8C] hover:text-[#3D7E8C]"
                    }`}
                    onClick={() =>
                      setBrandNiches((prev) =>
                        prev.includes(n)
                          ? prev.filter((x) => x !== n)
                          : [...prev, n]
                      )
                    }
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      );

    if (step === 2)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                💰
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 03
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Budget & Timeline
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Define your campaign scope.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>
                    Campaign Budget (₹)
                  </span>
                </div>

                <input
                  className={inputClass}
                  placeholder="e.g. 50000"
                  value={brand.budget}
                  onChange={(e) =>
                    setBrand({ ...brand, budget: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Timeline</span>
                </div>

                <input
                  className={inputClass}
                  placeholder="e.g. 2 weeks"
                  value={brand.timeline}
                  onChange={(e) =>
                    setBrand({ ...brand, timeline: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <label className="form-control w-full">
                <div className="label pb-2">
                  <span className={labelClass}>Deliverables</span>
                </div>

                <select
                  className={selectClass}
                  value={brand.deliverables}
                  onChange={(e) =>
                    setBrand({
                      ...brand,
                      deliverables: e.target.value,
                    })
                  }
                >
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
                <div className="label pb-2">
                  <span className={labelClass}>
                    Collaboration Type
                  </span>
                </div>

                <select
                  className={selectClass}
                  value={brand.collabType}
                  onChange={(e) =>
                    setBrand({
                      ...brand,
                      collabType: e.target.value,
                    })
                  }
                >
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

    if (step === 3)
      return (
        <>
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/20">
                📋
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#F39221] mb-2">
                  Step 04
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-base-content">
                  Campaign Details
                </h3>

                <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                  Describe what you're looking for.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col gap-5">
            <label className="form-control w-full">
              <div className="label pb-2">
                <span className={labelClass}>
                  Campaign Description
                </span>
              </div>

              <textarea
                className={`${textareaClass} min-h-[120px]`}
                placeholder="Describe your product and campaign goals..."
                value={brand.description}
                onChange={(e) =>
                  setBrand({
                    ...brand,
                    description: e.target.value,
                  })
                }
              />
            </label>

            <label className="form-control w-full">
              <div className="label pb-2">
                <span className={labelClass}>Special Notes</span>
              </div>

              <textarea
                className={`${textareaClass} min-h-[100px]`}
                placeholder="Any do's, don'ts, or specific requirements for influencers..."
                value={brand.specialNotes}
                onChange={(e) =>
                  setBrand({
                    ...brand,
                    specialNotes: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </>
      );
  };

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content selection:bg-[#3D7E8C]/20 overflow-x-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative pt-28 pb-32 md:pt-36 md:pb-40 px-6 bg-[#0f172a] overflow-hidden text-center">

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="Creative workspace"
            className="w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-[#0f172a]/70" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#3D7E8C]/20 via-transparent to-[#F39221]/10" />
        </div>

        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#F39221]/10 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-[#3D7E8C]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto animate-[fadeIn_0.8s_ease_both]">

          <span className="text-[#F39221] font-black uppercase text-xs tracking-[0.3em] mb-5 block">
            Creator Partnerships
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-100 tracking-tighter leading-[0.95] mb-7">
            Connect.
            <br className="md:hidden" />{" "}
            <span className="text-[#3D7E8C]">Collaborate.</span>{" "}
            <span className="text-[#F39221]">Grow.</span>
          </h1>

          <div className="w-24 h-2 bg-[#F39221] mx-auto rounded-full mb-8" />

          <p className="text-slate-300 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            The bridge between creators and brands — build real
            partnerships that move the needle across India's
            fastest-growing creator economy.
          </p>

          <div className="flex gap-4 flex-wrap justify-center mt-10">

            <button
              className="px-8 py-4 rounded-full bg-[#F39221] text-white font-black shadow-xl shadow-orange-900/20 hover:-translate-y-1 hover:bg-[#e0831c] transition-all duration-300"
              onClick={() => {
                const el = document.getElementById("get-started");
                el && el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started →
            </button>

            <button
              className="px-8 py-4 rounded-full bg-white/5 border border-[#3D7E8C]/60 text-white font-black hover:bg-[#3D7E8C] hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                el && el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How It Works
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="w-full py-14 px-6 bg-base-100 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center"
            >
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#3D7E8C] block">
                {s.value}
              </span>

              <span className="text-[11px] font-black tracking-widest uppercase text-slate-400">
                {s.label}
              </span>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="w-full py-24 px-6 bg-base-200"
      >
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <span className="text-[#3D7E8C] font-black uppercase text-[11px] tracking-[0.3em] mb-4 block">
              The Process
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tighter">
              Four steps{" "}
              <span className="text-[#F39221]">for your</span>{" "}
              <span className="text-[#3D7E8C]">next deal.</span>
            </h2>

            <div className="w-16 h-1 bg-[#3D7E8C] rounded-full mx-auto mb-6" />

            <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto">
              Simple, fast, and built for India's creator economy.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {HOW_IT_WORKS.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-[2rem] p-8 md:p-10 bg-base-100 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3D7E8C] to-[#F39221] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex gap-6 items-start">

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-[#3D7E8C]/10 border border-[#3D7E8C]/10">
                    {item.icon}
                  </div>

                  <div className="flex-1">

                    <div className="text-[11px] font-black text-[#F39221] tracking-[0.2em] mb-2">
                      0{idx + 1}
                    </div>

                    <h3 className="text-xl md:text-2xl font-black tracking-tighter text-base-content mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm md:text-base leading-relaxed text-slate-500 font-medium">
                      {item.desc}
                    </p>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          GET STARTED
      ===================================================== */}

      <section
        id="get-started"
        className="w-full py-24 px-5 bg-base-100"
      >
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">

            <span className="text-[#3D7E8C] font-black uppercase text-[11px] tracking-[0.3em] mb-4 block">
              Join Now
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tighter">
              Who are{" "}
              <span className="text-[#F39221]">you?</span>
            </h2>

            <div className="w-16 h-1 bg-[#F39221] rounded-full mx-auto mb-6" />

            <p className="text-slate-500 font-medium">
              Choose your role to get started.
            </p>

          </div>

          {/* ROLE SELECTOR */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">

            {[
              {
                id: "influencer",
                icon: "🎙️",
                label: "I'm a Creator",
                desc: "Find brand deals & grow your income",
              },
              {
                id: "brand",
                icon: "🏢",
                label: "I'm a Brand",
                desc: "Discover influencers for your campaign",
              },
            ].map((r) => (

              <button
                type="button"
                key={r.id}
                className={`text-left p-7 md:p-8 rounded-[2rem] border transition-all duration-300 ${
                  role === r.id
                    ? "border-[#F39221] bg-[#3D7E8C] text-white shadow-xl shadow-teal-900/10 scale-[1.01]"
                    : "border-slate-200 bg-base-100 hover:border-[#3D7E8C]/50 hover:-translate-y-1 shadow-sm"
                }`}
                onClick={() => pickRole(r.id)}
              >

                <div className="flex items-center gap-5">

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                      role === r.id
                        ? "bg-[#F39221]/20"
                        : "bg-[#3D7E8C]/10"
                    }`}
                  >
                    {r.icon}
                  </div>

                  <div>
                    <div
                      className={`text-xl font-black tracking-tight ${
                        role === r.id
                          ? "text-white"
                          : "text-base-content"
                      }`}
                    >
                      {r.label}
                    </div>

                    <div
                      className={`text-sm font-medium mt-1 ${
                        role === r.id
                          ? "text-white/80"
                          : "text-slate-500"
                      }`}
                    >
                      {r.desc}
                    </div>
                  </div>

                </div>
              </button>

            ))}

          </div>

          {/* WIZARD */}

          {role && !done && (

            <div className="w-full">

              {/* STEPPER */}

              <div className="flex items-center justify-center mb-10 px-2">

                {steps.map((s, i) => (

                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 relative"
                  >

                    {i < steps.length - 1 && (
                      <div
                        className={`absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] transition-colors duration-300 ${
                          i < step
                            ? "bg-[#F39221]"
                            : "bg-slate-200"
                        }`}
                      />
                    )}

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black relative z-10 transition-all duration-300 border-2 ${
                        i < step
                          ? "bg-[#3D7E8C] border-[#3D7E8C] text-white"
                          : i === step
                          ? "bg-[#F39221] border-[#F39221] text-white shadow-lg shadow-orange-200"
                          : "bg-white border-slate-200 text-slate-300"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>

                    <div
                      className={`text-[10px] md:text-[11px] font-black mt-3 text-center uppercase tracking-widest ${
                        i === step
                          ? "text-[#F39221]"
                          : i < step
                          ? "text-[#3D7E8C]"
                          : "text-slate-300"
                      }`}
                    >
                      {s.label}
                    </div>

                  </div>

                ))}

              </div>

              {/* PROGRESS */}

              <div className="h-1.5 rounded-full mb-8 overflow-hidden bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#F39221] to-[#3D7E8C]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* FORM PANEL */}

              <div className="rounded-[2.5rem] overflow-hidden relative bg-base-100 border border-slate-200 shadow-2xl">

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F39221] via-[#3D7E8C] to-[#F39221]" />

                {role === "influencer"
                  ? renderInfStep()
                  : renderBrandStep()}

                {/* NAVIGATION */}

                <div className="flex items-center justify-between gap-4 px-8 md:px-10 py-6 border-t border-slate-100 bg-slate-50">

                  <button
                    type="button"
                    className="px-5 py-3 rounded-full font-bold text-sm border border-slate-200 text-slate-500 hover:bg-white transition-all"
                    style={{
                      visibility:
                        step === 0 ? "hidden" : "visible",
                    }}
                    onClick={goBack}
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className={`px-7 py-3 rounded-full font-black text-sm text-white transition-all duration-300 ${
                      isLastStep
                        ? "bg-gradient-to-r from-[#F39221] to-[#3D7E8C] shadow-lg shadow-orange-200"
                        : "bg-[#F39221] hover:bg-[#e0831c] shadow-lg shadow-orange-200"
                    }`}
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading
                      ? "Saving…"
                      : isLastStep
                      ? "🚀 Submit Profile"
                      : "Continue →"}
                  </button>

                </div>

              </div>
            </div>
          )}

          {/* SUCCESS */}

          {role && done && (

            <div className="rounded-[2.5rem] overflow-hidden relative bg-base-100 border border-slate-200 shadow-2xl">

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F39221] to-[#3D7E8C]" />

              <div className="text-center py-20 px-8">

                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-7 bg-[#3D7E8C]/10 border-2 border-[#3D7E8C] animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both]">
                  ✓
                </div>

                <span className="text-[#F39221] font-black uppercase text-[11px] tracking-[0.3em]">
                  Successfully Submitted
                </span>

                <h3 className="text-3xl md:text-4xl font-black tracking-tighter mt-3 mb-4">
                  {role === "influencer"
                    ? "Profile Live!"
                    : "Campaign Posted!"}
                </h3>

                <p className="text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
                  {role === "influencer"
                    ? "Your influencer profile is now visible to brands. Scroll down to apply to open campaigns."
                    : "Your campaign is now live. Influencers can discover and apply to it below."}
                </p>

                <button
                  type="button"
                  className="mt-8 px-6 py-3 rounded-full border border-[#F39221]/40 text-[#F39221] font-black text-sm hover:bg-[#F39221]/10 transition-all"
                  onClick={() => {
                    setDone(false);
                    setStep(0);
                  }}
                >
                  ✏️ Edit Profile
                </button>

              </div>
            </div>
          )}

          {!role && (
            <div className="text-center mt-4 text-sm text-slate-400 font-medium">
              ↑ Choose your role above to get started
            </div>
          )}

          {/* =================================================
              BROWSE
          ================================================= */}

          {role && (

            <div className="mt-20">

              <div className="mb-7">

                <span className="text-[#3D7E8C] font-black uppercase text-[11px] tracking-[0.3em] block mb-3">
                  {role === "influencer"
                    ? "Open Opportunities"
                    : "Creator Network"}
                </span>

                <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
                  {role === "influencer"
                    ? "Open Brand Campaigns"
                    : "Registered Influencers"}
                </h3>

                <div className="w-12 h-1 bg-[#F39221] rounded-full mt-4" />

              </div>

              <div className="flex gap-2.5 flex-wrap mb-7">

                {browseFilters.map((f) => (
                  <button
                    type="button"
                    key={f}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all border ${
                      browseFilter === f
                        ? "bg-[#F39221] border-[#F39221] text-white shadow-md"
                        : "bg-white border-slate-200 text-slate-500 hover:border-[#3D7E8C] hover:text-[#3D7E8C]"
                    }`}
                    onClick={() => setBrowseFilter(f)}
                  >
                    {f}
                  </button>
                ))}

              </div>

              {role === "influencer" &&
                filteredCampaigns.length === 0 && (
                  <div className="text-center py-16 rounded-[2rem] bg-base-200 border border-slate-100">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-sm text-slate-400 font-medium">
                      No campaigns yet
                    </p>
                  </div>
                )}

              {role === "brand" &&
                filteredInfluencers.length === 0 && (
                  <div className="text-center py-16 rounded-[2rem] bg-base-200 border border-slate-100">
                    <div className="text-4xl mb-3">🎙️</div>
                    <p className="text-sm text-slate-400 font-medium">
                      No influencers registered yet
                    </p>
                  </div>
                )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {role === "influencer" &&
                  filteredCampaigns.map((b) => (
                    <div
                      key={b._id}
                      className="group rounded-[2rem] p-7 cursor-pointer transition-all duration-300 hover:-translate-y-2 bg-white border border-slate-200 shadow-sm hover:shadow-xl"
                      onClick={() => setApplyModal(b)}
                    >

                      <div className="flex items-center gap-4 mb-6">

                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-[#F39221]/10 border border-[#F39221]/10">
                          🏢
                        </div>

                        <div>
                          <div className="text-lg font-black tracking-tight text-base-content">
                            {b.company}
                          </div>

                          <div className="text-xs mt-1 text-[#3D7E8C] font-bold">
                            {b.niche ||
                              b.niches?.[0] ||
                              "Brand Campaign"}
                          </div>
                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">

                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Budget
                          </div>

                          <strong className="text-xl font-black text-[#3D7E8C]">
                            {b.budget ? `₹${b.budget}` : "—"}
                          </strong>
                        </div>

                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Timeline
                          </div>

                          <strong className="text-sm font-black text-base-content">
                            {b.timeline || "—"}
                          </strong>
                        </div>

                      </div>

                      <div className="mt-6 text-sm font-black text-[#F39221] group-hover:translate-x-1 transition-transform">
                        Tap to apply →
                      </div>

                    </div>
                  ))}

                {role === "brand" &&
                  filteredInfluencers.map((i) => (
                    <div
                      key={i._id}
                      className="group rounded-[2rem] p-7 cursor-pointer transition-all duration-300 hover:-translate-y-2 bg-white border border-slate-200 shadow-sm hover:shadow-xl"
                    >

                      <div className="flex items-center gap-4 mb-6">

                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-[#3D7E8C]/10 border border-[#3D7E8C]/10">
                          🎙️
                        </div>

                        <div>
                          <div className="text-lg font-black tracking-tight text-base-content">
                            {i.name}
                          </div>

                          <div className="text-xs mt-1 text-[#3D7E8C] font-bold">
                            @{i.handle} ·{" "}
                            {i.platforms?.[0] || "Creator"}
                          </div>
                        </div>

                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-5">

                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Followers
                          </div>

                          <strong className="text-xl font-black text-[#3D7E8C]">
                            {formatRange(i.followers)}
                          </strong>
                        </div>

                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Avg Views
                          </div>

                          <strong className="text-xl font-black text-[#3D7E8C]">
                            {formatRange(i.avgViews)}
                          </strong>
                        </div>

                        {i.ratePerPost && (
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                              Per Post
                            </div>

                            <strong className="text-xl font-black text-[#F39221]">
                              ₹{i.ratePerPost}
                            </strong>
                          </div>
                        )}

                      </div>

                    </div>
                  ))}

              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="w-full py-24 px-6 bg-[#3D7E8C]/5 border-y border-[#3D7E8C]/10">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <span className="text-[#F39221] font-black uppercase text-[11px] tracking-[0.3em] mb-4 block">
              Creators Love Us
            </span>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-base-content">
              Real stories,{" "}
              <span className="text-[#3D7E8C]">
                real results.
              </span>
            </h2>

            <div className="w-16 h-1 bg-[#F39221] rounded-full mx-auto mt-6" />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] p-8 bg-base-100 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >

                <div className="text-4xl text-[#F39221] font-black mb-4">
                  “
                </div>

                <div className="text-base leading-relaxed text-slate-600 font-medium mb-8">
                  {t.text}
                </div>

                <div className="flex items-center gap-4 mt-auto">

                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black bg-gradient-to-br from-[#F39221] to-[#3D7E8C] text-white">
                    {t.avatar}
                  </div>

                  <div>
                    <div className="text-sm font-black text-base-content">
                      {t.name}
                    </div>

                    <div className="text-xs text-slate-400 font-medium mt-1">
                      {t.handle} · {t.followers} followers
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          APPLY MODAL
      ===================================================== */}

      {applyModal && (

        <div
          className="fixed inset-0 z-[9998] bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-5"
          onClick={() => {
            setApplyModal(null);
            setApplyMsg("");
          }}
        >

          <div
            className="w-full max-w-xl rounded-[2rem] bg-base-100 border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="h-1 bg-gradient-to-r from-[#F39221] to-[#3D7E8C]" />

            <div className="p-8 md:p-10">

              <span className="text-[#F39221] font-black uppercase text-[10px] tracking-[0.3em]">
                Apply Now
              </span>

              <h3 className="text-2xl md:text-3xl font-black tracking-tighter mt-2 mb-3">
                Apply to {applyModal.company}
              </h3>

              <p className="text-sm leading-relaxed text-slate-500 font-medium mb-6">
                {applyModal.description ||
                  "No description provided."}
              </p>

              <textarea
                className={`${textareaClass} min-h-[140px]`}
                placeholder="Introduce yourself and why you're a great fit…"
                value={applyMsg}
                onChange={(e) => setApplyMsg(e.target.value)}
              />

              <div className="flex gap-3 mt-6">

                <button
                  type="button"
                  className="flex-1 px-5 py-3 rounded-full border border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all"
                  onClick={() => {
                    setApplyModal(null);
                    setApplyMsg("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="flex-[2] px-5 py-3 rounded-full bg-[#F39221] text-white font-black text-sm shadow-lg shadow-orange-200 hover:bg-[#e0831c] transition-all"
                  onClick={handleApply}
                >
                  🚀 Send Application
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">

          <div className="px-6 py-4 rounded-2xl bg-[#0f172a] text-white border border-white/10 shadow-2xl text-sm font-bold">
            {toast}
          </div>

        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes popIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}
