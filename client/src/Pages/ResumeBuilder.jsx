import { useState, useRef, useEffect, useCallback } from "react";

/* ─── API BASE ────────────────────────────────────────────── */
const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://digital-marketing-temp.onrender.com/api";

/* ─── SESSION ID (persisted in localStorage) ─────────────── */
function getSessionId() {
  let id = localStorage.getItem("portfolio_session_id");
  if (!id) {
    id = "sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("portfolio_session_id", id);
  }
  return id;
}

/* ─── THEMES ─────────────────────────────────────────────── */
const THEMES = {
  dark: {
    name: "Dark",
    bg: "#0d0d14", bg2: "#151520", bg3: "#1c1c2d", bg4: "#22223a",
    accent: "#6366f1", accent2: "#818cf8", accent3: "#a5b4fc",
    text: "#f1f5f9", text2: "#94a3b8", text3: "#4b5563",
    border: "rgba(255,255,255,.07)", border2: "rgba(255,255,255,.12)",
  },
  ocean: {
    name: "Ocean",
    bg: "#060f1c", bg2: "#0c1a2e", bg3: "#112440", bg4: "#162e52",
    accent: "#0ea5e9", accent2: "#38bdf8", accent3: "#7dd3fc",
    text: "#e0f2fe", text2: "#7dd3fc", text3: "#2563ab",
    border: "rgba(14,165,233,.1)", border2: "rgba(14,165,233,.2)",
  },
  forest: {
    name: "Forest",
    bg: "#060e0a", bg2: "#0a160e", bg3: "#0f2016", bg4: "#142a1c",
    accent: "#22c55e", accent2: "#4ade80", accent3: "#86efac",
    text: "#dcfce7", text2: "#86efac", text3: "#166534",
    border: "rgba(34,197,94,.1)", border2: "rgba(34,197,94,.2)",
  },
  rose: {
    name: "Rose",
    bg: "#120608", bg2: "#1c0a10", bg3: "#260e16", bg4: "#31121e",
    accent: "#f43f5e", accent2: "#fb7185", accent3: "#fda4af",
    text: "#ffe4e6", text2: "#fda4af", text3: "#9f1239",
    border: "rgba(244,63,94,.1)", border2: "rgba(244,63,94,.2)",
  },
  amethyst: {
    name: "Amethyst",
    bg: "#0e0614", bg2: "#160b1e", bg3: "#1e1028", bg4: "#271433",
    accent: "#a855f7", accent2: "#c084fc", accent3: "#d8b4fe",
    text: "#f5f3ff", text2: "#c4b5fd", text3: "#7e22ce",
    border: "rgba(168,85,247,.1)", border2: "rgba(168,85,247,.2)",
  },
};

/* ─── DEFAULT DATA ────────────────────────────────────────── */
const DEF = {
  theme: "dark",
  home: {
    badge: "Available for hire",
    name: "Alex Johnson",
    tagline: "Full-Stack Developer & UI Designer",
    bio: "I craft beautiful digital experiences that blend design and engineering. Passionate about building products people love.",
    cta: "View My Work", cta2: "Download CV", img: null,
  },
  about: {
    headline: "About Me", sub: "Who I am & what I do",
    story: "I'm a passionate developer with 5+ years of experience building scalable web applications. I believe in writing clean, maintainable code and creating intuitive user experiences.",
    story2: "When I'm not coding you'll find me exploring new tech, contributing to open source, or hiking in the mountains.",
    skills: [
      { name: "React / Next.js", level: 90 }, { name: "Node.js / Express", level: 85 },
      { name: "UI/UX Design", level: 80 }, { name: "TypeScript", level: 88 }, { name: "AWS / DevOps", level: 72 },
    ],
    tags: ["React", "TypeScript", "Node.js", "Design", "AWS", "GraphQL"],
    img: null, img2: null,
  },
  projects: {
    headline: "My Projects", sub: "Things I've built",
    items: [
      { title: "E-Commerce Platform", desc: "Full-stack shop with real-time inventory, payments & admin dashboard.", tag: "Full Stack", img: null },
      { title: "Design System", desc: "Component library used by 3 products, built with Storybook and React.", tag: "UI/UX", img: null },
      { title: "Analytics Dashboard", desc: "Real-time data visualization platform with D3.js and WebSockets.", tag: "Data", img: null },
      { title: "Mobile App", desc: "Cross-platform React Native app with 10K+ downloads on the App Store.", tag: "Mobile", img: null },
    ],
  },
  contact: {
    headline: "Get In Touch", sub: "Let's work together",
    intro: "I'm always open to new opportunities and interesting projects. Whether you have a question or just want to say hi — my inbox is open!",
    email: "alex@example.com", phone: "+1 (555) 123-4567",
    location: "San Francisco, CA", github: "github.com/alexj", linkedin: "linkedin.com/in/alexj",
    cta: "Send a Message", img: null,
  },
};

/* ─── EDITABLE TEXT ───────────────────────────────────────── */
function E({ val, set, tag: T = "span", style = {}, multi = false, ph = "Click to edit" }) {
  const r = useRef();
  useEffect(() => {
    if (r.current && r.current.innerText !== val) r.current.innerText = val;
  }, [val]);
  return (
    <T
      ref={r}
      contentEditable
      suppressContentEditableWarning
      style={style}
      data-ph={ph}
      onBlur={() => r.current && set(r.current.innerText)}
      onKeyDown={e => {
        if (!multi && e.key === "Enter") { e.preventDefault(); r.current.blur(); }
      }}
    />
  );
}

/* ─── IMAGE SLOT ──────────────────────────────────────────── */
function ImgSlot({ src, set, style = {}, ph = "Upload Image", phIcon = "🖼️" }) {
  const r = useRef();
  return (
    <div onClick={() => r.current.click()} style={{ cursor: "pointer", position: "relative", overflow: "hidden", ...style }}>
      {src
        ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        : <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,.03)", border: "1.5px dashed rgba(255,255,255,.12)" }}>
          <span style={{ fontSize: 28, opacity: .5 }}>{phIcon}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.3)", letterSpacing: ".5px" }}>{ph}</span>
        </div>
      }
      {src && (
        <div
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0, transition: "opacity .15s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
        >
          <span style={{ fontSize: 20 }}>🔄</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Change Photo</span>
        </div>
      )}
      <input ref={r} type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = ev => set(ev.target.result); // store as base64
          reader.readAsDataURL(e.target.files[0]);
        }
      }} />
    </div>
  );
}

/* ─── SLIDE: HOME ─────────────────────────────────────────── */
function HomeSlide({ data, onChange, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  const d = data.home;
  const s = (k, v) => onChange({ ...data, home: { ...d, [k]: v } });
  return (
    <div style={{ width: "100%", height: "100%", background: t.bg, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", fontFamily: "'Sora',sans-serif" }}>
      <div style={{ position: "absolute", top: "-20%", right: "5%", width: "55%", aspectRatio: "1", background: `radial-gradient(circle, ${t.accent}28 0%, transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "20%", width: "40%", aspectRatio: "1", background: `radial-gradient(circle, ${t.accent2}12 0%, transparent 60%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${t.accent},${t.accent2},transparent)` }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", width: "100%", alignItems: "center", padding: "5% 6%", gap: "4%" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${t.accent}1a`, border: `1px solid ${t.accent}44`, borderRadius: 100, padding: "4px 14px", marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent2, flexShrink: 0 }} />
            <E val={d.badge} set={v => s("badge", v)} style={{ fontSize: "clamp(9px,1.1vw,11px)", fontWeight: 600, color: t.accent2, letterSpacing: ".5px" }} />
          </div>
          <E val={d.name} set={v => s("name", v)} tag="h1"
            style={{ display: "block", fontSize: "clamp(24px,4.5vw,52px)", fontWeight: 900, color: t.text, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 8 }} />
          <E val={d.tagline} set={v => s("tagline", v)} tag="p"
            style={{ display: "block", fontSize: "clamp(10px,1.4vw,15px)", color: t.accent2, fontWeight: 500, marginBottom: 14, letterSpacing: ".2px" }} />
          <E val={d.bio} set={v => s("bio", v)} tag="p" multi
            style={{ display: "block", fontSize: "clamp(9px,1vw,12px)", color: t.text2, lineHeight: 1.7, marginBottom: 22, maxWidth: 420, fontFamily: "'DM Sans',sans-serif" }} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "9px 20px", background: t.accent, borderRadius: 10, cursor: "pointer" }}>
              <E val={d.cta} set={v => s("cta", v)} style={{ fontSize: "clamp(9px,1.1vw,12px)", fontWeight: 700, color: "#fff" }} />
            </div>
            <div style={{ padding: "9px 20px", border: `1px solid ${t.accent}55`, borderRadius: 10, cursor: "pointer", background: "transparent" }}>
              <E val={d.cta2} set={v => s("cta2", v)} style={{ fontSize: "clamp(9px,1.1vw,12px)", fontWeight: 600, color: t.text }} />
            </div>
          </div>
        </div>
        <div style={{ width: "clamp(120px,26%,220px)", flexShrink: 0 }}>
          <ImgSlot src={d.img} set={v => s("img", v)} ph="Upload Photo" phIcon="👤"
            style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", border: `3px solid ${t.accent}55`, background: t.bg2 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE: ABOUT ────────────────────────────────────────── */
function AboutSlide({ data, onChange, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  const d = data.about;
  const s = (k, v) => onChange({ ...data, about: { ...d, [k]: v } });
  const setSk = (i, k, v) => { const sk = [...d.skills]; sk[i] = { ...sk[i], [k]: v }; s("skills", sk); };
  return (
    <div style={{ width: "100%", height: "100%", background: t.bg, display: "flex", overflow: "hidden", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ width: "42%", background: t.bg2, borderRight: `1px solid ${t.border}`, padding: "5% 4%", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        <div>
          <E val={d.headline} set={v => s("headline", v)} tag="h2"
            style={{ display: "block", fontSize: "clamp(16px,2.8vw,26px)", fontWeight: 800, color: t.text, letterSpacing: "-0.5px", marginBottom: 4, fontFamily: "'Sora',sans-serif" }} />
          <E val={d.sub} set={v => s("sub", v)}
            style={{ display: "block", fontSize: "clamp(9px,1vw,11px)", color: t.accent2, fontWeight: 500, marginBottom: 14, letterSpacing: ".3px" }} />
        </div>
        <ImgSlot src={d.img} set={v => s("img", v)} ph="Upload Photo"
          style={{ width: "100%", aspectRatio: "4/3", borderRadius: 12, background: t.bg3, overflow: "hidden" }} />
        <E val={d.story} set={v => s("story", v)} tag="p" multi
          style={{ display: "block", fontSize: "clamp(8px,.95vw,11px)", color: t.text2, lineHeight: 1.7 }} />
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {d.tags.map((tg, i) => (
            <span key={i} style={{ background: `${t.accent}1a`, color: t.accent2, border: `1px solid ${t.accent}33`, borderRadius: 6, padding: "3px 9px", fontSize: "clamp(7px,.85vw,10px)", fontWeight: 600, cursor: "pointer" }}
              onClick={() => { const n = prompt("Edit tag:", tg); if (n !== null) { const tt = [...d.tags]; tt[i] = n; s("tags", tt); } }}>
              {tg}
            </span>
          ))}
          <span style={{ background: "transparent", color: t.text3, border: `1px dashed ${t.border2}`, borderRadius: 6, padding: "3px 9px", fontSize: "clamp(7px,.85vw,10px)", cursor: "pointer" }}
            onClick={() => { const n = prompt("Add tag:"); if (n) s("tags", [...d.tags, n]); }}>+ add</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "5% 4%", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: "clamp(9px,1vw,11px)", fontWeight: 700, color: t.text, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Skills</div>
        {d.skills.map((sk, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <E val={sk.name} set={v => setSk(i, "name", v)} style={{ fontSize: "clamp(8px,.95vw,11px)", fontWeight: 600, color: t.text }} />
                <span style={{ fontSize: "clamp(8px,.95vw,11px)", color: t.accent2, fontWeight: 600 }}>{sk.level}%</span>
              </div>
              <div
                title="Click to set level"
                style={{ height: 6, background: "rgba(255,255,255,.07)", borderRadius: 3, cursor: "pointer", overflow: "hidden" }}
                onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100); setSk(i, "level", Math.max(5, Math.min(100, pct))); }}
              >
                <div style={{ height: "100%", width: `${sk.level}%`, background: `linear-gradient(90deg,${t.accent},${t.accent2})`, borderRadius: 3, transition: "width .25s" }} />
              </div>
            </div>
            <span title="Remove" style={{ fontSize: 12, color: t.text3, cursor: "pointer", flexShrink: 0, paddingBottom: 2 }}
              onClick={() => s("skills", d.skills.filter((_, j) => j !== i))}>✕</span>
          </div>
        ))}
        <span style={{ fontSize: "clamp(8px,.95vw,11px)", color: t.accent, cursor: "pointer", fontWeight: 600, marginTop: 4 }}
          onClick={() => s("skills", [...d.skills, { name: "New Skill", level: 70 }])}>+ Add Skill</span>
        <div style={{ marginTop: "auto" }}>
          <ImgSlot src={d.img2} set={v => s("img2", v)} ph="Optional Image"
            style={{ width: "100%", aspectRatio: "16/7", borderRadius: 10, background: t.bg2, overflow: "hidden", marginTop: 12 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE: PROJECTS ─────────────────────────────────────── */
function ProjectsSlide({ data, onChange, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  const d = data.projects;
  const s = (k, v) => onChange({ ...data, projects: { ...d, [k]: v } });
  const setIt = (i, k, v) => { const it = [...d.items]; it[i] = { ...it[i], [k]: v }; s("items", it); };
  const TAG_C = { "Full Stack": t.accent, "UI/UX": "#ec4899", "Data": "#f59e0b", "Mobile": "#22c55e" };
  return (
    <div style={{ width: "100%", height: "100%", background: t.bg, padding: "4% 5%", overflow: "hidden", fontFamily: "'DM Sans',sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", bottom: "-20%", right: "-5%", width: "40%", aspectRatio: "1", background: `radial-gradient(circle,${t.accent}0f,transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(10px,2.5%,22px)", position: "relative", zIndex: 1 }}>
        <div>
          <E val={d.headline} set={v => s("headline", v)} tag="h2"
            style={{ display: "block", fontSize: "clamp(16px,3vw,28px)", fontWeight: 800, color: t.text, letterSpacing: "-0.5px", fontFamily: "'Sora',sans-serif" }} />
          <E val={d.sub} set={v => s("sub", v)}
            style={{ display: "block", fontSize: "clamp(9px,1vw,11px)", color: t.accent2, fontWeight: 500, marginTop: 3 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px,1.5vw,14px)", position: "relative", zIndex: 1 }}>
        {d.items.map((item, i) => (
          <div key={i} style={{ background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
            <ImgSlot src={item.img} set={v => setIt(i, "img", v)} ph="Upload Image"
              style={{ width: "100%", aspectRatio: "16/7", borderBottom: `1px solid ${t.border}`, background: t.bg3, overflow: "hidden" }} />
            <div style={{ padding: "8px 11px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <E val={item.title} set={v => setIt(i, "title", v)}
                  style={{ fontSize: "clamp(9px,1.15vw,13px)", fontWeight: 700, color: t.text, fontFamily: "'Sora',sans-serif" }} />
                <span
                  style={{ background: `${TAG_C[item.tag] || t.accent}22`, color: TAG_C[item.tag] || t.accent2, padding: "2px 8px", borderRadius: 5, fontSize: "clamp(6px,.78vw,9px)", fontWeight: 700, cursor: "pointer", flexShrink: 0, marginLeft: 6 }}
                  onClick={() => { const n = prompt("Edit tag:", item.tag); if (n) setIt(i, "tag", n); }}
                >
                  {item.tag}
                </span>
              </div>
              <E val={item.desc} set={v => setIt(i, "desc", v)} tag="p" multi
                style={{ display: "block", fontSize: "clamp(7px,.9vw,10px)", color: t.text2, lineHeight: 1.55 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE: CONTACT ──────────────────────────────────────── */
function ContactSlide({ data, onChange, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  const d = data.contact;
  const s = (k, v) => onChange({ ...data, contact: { ...d, [k]: v } });
  const INFO = [{ k: "email", ic: "✉️" }, { k: "phone", ic: "📞" }, { k: "location", ic: "📍" }, { k: "github", ic: "⌨️" }, { k: "linkedin", ic: "💼" }];
  return (
    <div style={{ width: "100%", height: "100%", background: t.bg, display: "flex", overflow: "hidden", fontFamily: "'DM Sans',sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: "10%", left: "-10%", width: "45%", aspectRatio: "1", background: `radial-gradient(circle,${t.accent}1a,transparent 60%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ flex: 1, padding: "5% 5%", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <E val={d.headline} set={v => s("headline", v)} tag="h2"
          style={{ display: "block", fontSize: "clamp(18px,3.5vw,38px)", fontWeight: 900, color: t.text, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 6, fontFamily: "'Sora',sans-serif" }} />
        <E val={d.sub} set={v => s("sub", v)}
          style={{ display: "block", fontSize: "clamp(9px,1.1vw,13px)", color: t.accent2, fontWeight: 500, marginBottom: 16, letterSpacing: ".2px" }} />
        <E val={d.intro} set={v => s("intro", v)} tag="p" multi
          style={{ display: "block", fontSize: "clamp(8px,1vw,12px)", color: t.text2, lineHeight: 1.7, marginBottom: 20, maxWidth: 380 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {INFO.map(({ k, ic }) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "clamp(10px,1.2vw,13px)", flexShrink: 0, width: 20, textAlign: "center" }}>{ic}</span>
              <E val={d[k]} set={v => s(k, v)} style={{ fontSize: "clamp(9px,1vw,12px)", color: t.text2, fontWeight: 500 }} />
            </div>
          ))}
        </div>
        <div style={{ padding: "9px 20px", background: t.accent, borderRadius: 10, cursor: "pointer", display: "inline-block", alignSelf: "flex-start" }}>
          <E val={d.cta} set={v => s("cta", v)} style={{ fontSize: "clamp(9px,1.1vw,12px)", fontWeight: 700, color: "#fff", fontFamily: "'Sora',sans-serif" }} />
        </div>
      </div>
      <div style={{ width: "38%", flexShrink: 0, position: "relative", zIndex: 2 }}>
        <ImgSlot src={d.img} set={v => s("img", v)} ph="Upload Image" phIcon="✉️"
          style={{ width: "100%", height: "100%", background: t.bg2 }} />
      </div>
    </div>
  );
}

/* ─── THUMBNAIL PREVIEWS ──────────────────────────────────── */
function Thumb({ sk, data, theme, active, onClick }) {
  const t = THEMES[theme] || THEMES.dark;
  const ICONS = { home: "🏠", about: "👤", projects: "🚀", contact: "✉️" };
  const LABELS = { home: "Home", about: "About Me", projects: "Projects", contact: "Contact" };
  return (
    <div onClick={onClick} style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", marginBottom: 8, border: `2px solid ${active ? t.accent : "transparent"}`, transition: "border-color .15s" }}>
      <div style={{ width: "100%", height: 72, background: t.bg, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {sk === "home" && <>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 50%,${t.accent}22,transparent 60%)` }} />
          <div style={{ position: "relative", zIndex: 1, padding: "6px 8px", width: "100%" }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: t.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-0.3px" }}>{data.home.name}</div>
            <div style={{ fontSize: 6, color: t.accent2, marginTop: 1, fontWeight: 500 }}>{data.home.tagline.substring(0, 30)}</div>
            <div style={{ marginTop: 5, display: "flex", gap: 3 }}>
              <div style={{ padding: "2px 6px", background: t.accent, borderRadius: 3, fontSize: 5, fontWeight: 700, color: "#fff" }}>{data.home.cta}</div>
            </div>
          </div>
        </>}
        {sk === "about" && <div style={{ padding: "6px 8px", width: "100%" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: t.text, fontFamily: "'Sora',sans-serif", marginBottom: 4 }}>{data.about.headline}</div>
          {data.about.skills.slice(0, 3).map((s, i) => (
            <div key={i} style={{ marginBottom: 3 }}>
              <div style={{ fontSize: 5, color: t.text2, marginBottom: 1 }}>{s.name}</div>
              <div style={{ height: 2, background: "rgba(255,255,255,.08)", borderRadius: 1 }}>
                <div style={{ height: "100%", width: `${s.level}%`, background: t.accent, borderRadius: 1 }} />
              </div>
            </div>
          ))}
        </div>}
        {sk === "projects" && <div style={{ padding: "6px 8px", width: "100%" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: t.text, fontFamily: "'Sora',sans-serif", marginBottom: 4 }}>{data.projects.headline}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            {data.projects.items.slice(0, 4).map((p, i) => (
              <div key={i} style={{ background: t.bg2, borderRadius: 2, padding: "2px 4px", border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 5, fontWeight: 600, color: t.text }}>{p.title.substring(0, 14)}</div>
              </div>
            ))}
          </div>
        </div>}
        {sk === "contact" && <div style={{ padding: "6px 8px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: t.text, fontFamily: "'Sora',sans-serif" }}>{data.contact.headline}</div>
          <div style={{ fontSize: 6, color: t.accent2, marginTop: 2 }}>{data.contact.email}</div>
          <div style={{ marginTop: 5, padding: "2px 8px", background: t.accent, borderRadius: 3, fontSize: 5, fontWeight: 700, color: "#fff", display: "inline-block" }}>{data.contact.cta}</div>
        </div>}
      </div>
      <div style={{ padding: "4px 8px", background: active ? `${t.accent}22` : t.bg2, display: "flex", alignItems: "center", gap: 5, borderTop: `1px solid ${t.border}` }}>
        <span style={{ fontSize: 9 }}>{ICONS[sk]}</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: active ? t.accent2 : t.text2, letterSpacing: ".3px", textTransform: "uppercase" }}>{LABELS[sk]}</span>
        {active && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: t.accent }} />}
      </div>
    </div>
  );
}

/* ─── SECTIONS CONFIG ─────────────────────────────────────── */
const SECS = [
  { key: "home",     label: "Home",     Comp: HomeSlide },
  { key: "about",    label: "About Me", Comp: AboutSlide },
  { key: "projects", label: "Projects", Comp: ProjectsSlide },
  { key: "contact",  label: "Contact",  Comp: ContactSlide },
];

/* ─── HTML EXPORT (unchanged) ─────────────────────────────── */
function generateHTML(d) {
  const t = THEMES[d.theme] || THEMES.dark;
  const skills = d.about.skills.map(sk => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;color:${t.text};margin-bottom:5px"><span>${sk.name}</span><span>${sk.level}%</span></div>
      <div style="height:5px;background:rgba(255,255,255,.08);border-radius:3px"><div style="height:100%;width:${sk.level}%;background:linear-gradient(90deg,${t.accent},${t.accent2});border-radius:3px"></div></div>
    </div>`).join("");
  const tags = d.about.tags.map(tg => `<span style="background:${t.accent}22;color:${t.accent2};border:1px solid ${t.accent}33;border-radius:6px;padding:4px 11px;font-size:11px;font-weight:600">${tg}</span>`).join("");
  const projects = d.projects.items.map(p => `
    <div style="background:${t.bg2};border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden">
      ${p.img ? `<img src="${p.img}" style="width:100%;aspect-ratio:16/7;object-fit:cover"/>` : `<div style="width:100%;aspect-ratio:16/7;background:${t.bg3};display:flex;align-items:center;justify-content:center;font-size:32px">🖼️</div>`}
      <div style="padding:14px 16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">
          <span style="font-size:14px;font-weight:700;color:${t.text};font-family:Sora,sans-serif">${p.title}</span>
          <span style="background:${t.accent}22;color:${t.accent2};padding:3px 10px;border-radius:5px;font-size:10px;font-weight:700">${p.tag}</span>
        </div>
        <p style="font-size:12px;color:${t.text2};line-height:1.55">${p.desc}</p>
      </div>
    </div>`).join("");
  const info = [
    { ic: "✉️", v: d.contact.email }, { ic: "📞", v: d.contact.phone }, { ic: "📍", v: d.contact.location },
    { ic: "⌨️", v: d.contact.github }, { ic: "💼", v: d.contact.linkedin },
  ].map(x => `<div style="display:flex;align-items:center;gap:12px;font-size:13px;color:${t.text2}"><span>${x.ic}</span><span>${x.v}</span></div>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${d.home.name} – Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:${t.bg};color:${t.text};scroll-behavior:smooth;}
a{text-decoration:none;}
nav{position:fixed;top:0;left:0;right:0;background:${t.bg}cc;backdrop-filter:blur(18px);padding:14px 8vw;display:flex;justify-content:space-between;align-items:center;z-index:100;border-bottom:1px solid rgba(255,255,255,.06);}
.logo{font-family:Sora,sans-serif;font-size:17px;font-weight:800;color:${t.text};}
.logo span{color:${t.accent2};}
.nav-links{display:flex;gap:28px;}
.nav-links a{font-size:13px;font-weight:500;color:${t.text2};transition:color .15s;}
.nav-links a:hover{color:${t.text};}
section{min-height:100vh;padding:90px 8vw 60px;display:flex;flex-direction:column;justify-content:center;}
.home-s{flex-direction:row;align-items:center;gap:48px;background:${t.bg};position:relative;overflow:hidden;}
.home-s::before{content:"";position:absolute;top:-20%;right:5%;width:50%;aspect-ratio:1;background:radial-gradient(circle,${t.accent}28,transparent 65%);border-radius:50%;pointer-events:none;}
.badge{display:inline-flex;align-items:center;gap:8px;background:${t.accent}1a;border:1px solid ${t.accent}44;border-radius:100px;padding:5px 16px;font-size:12px;font-weight:600;color:${t.accent2};margin-bottom:18px;}
.badge-dot{width:6px;height:6px;border-radius:50%;background:${t.accent2};flex-shrink:0;}
h1{font-family:Sora,sans-serif;font-size:clamp(32px,6vw,64px);font-weight:900;color:${t.text};letter-spacing:-2px;line-height:1.05;margin-bottom:10px;}
.tagline{font-size:clamp(14px,1.8vw,18px);color:${t.accent2};font-weight:500;margin-bottom:14px;}
.bio{font-size:15px;color:${t.text2};line-height:1.7;margin-bottom:26px;max-width:520px;}
.btn-row{display:flex;gap:14px;flex-wrap:wrap;}
.btn{padding:12px 26px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:transform .15s,box-shadow .15s;}
.btn:hover{transform:translateY(-1px);}
.btn-solid{background:${t.accent};color:#fff;font-family:Sora,sans-serif;}
.btn-outline{border:1px solid ${t.accent}55;color:${t.text};background:transparent;font-family:Sora,sans-serif;}
.avatar{width:clamp(200px,28vw,320px);aspect-ratio:1;border-radius:50%;object-fit:cover;border:3px solid ${t.accent}55;flex-shrink:0;}
.avatar-ph{width:clamp(200px,28vw,320px);aspect-ratio:1;border-radius:50%;background:${t.bg2};display:flex;align-items:center;justify-content:center;font-size:64px;flex-shrink:0;border:3px solid ${t.accent}33;}
.about-s{background:${t.bg2};}
.about-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;width:100%;}
.sec-title{font-family:Sora,sans-serif;font-size:clamp(22px,4vw,40px);font-weight:800;color:${t.text};letter-spacing:-.5px;margin-bottom:5px;}
.sec-sub{font-size:13px;color:${t.accent2};font-weight:500;margin-bottom:22px;}
.about-img{width:100%;border-radius:14px;margin-bottom:18px;aspect-ratio:4/3;object-fit:cover;}
.about-img-ph{width:100%;border-radius:14px;aspect-ratio:4/3;background:${t.bg};display:flex;align-items:center;justify-content:center;font-size:40px;margin-bottom:18px;}
.story{font-size:14px;color:${t.text2};line-height:1.7;margin-bottom:16px;}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
.projects-s{background:${t.bg};}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-top:28px;width:100%;}
.contact-s{background:${t.bg2};}
.contact-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;width:100%;}
.contact-info{display:flex;flex-direction:column;gap:14px;margin:20px 0 28px;}
.contact-img{width:100%;border-radius:16px;aspect-ratio:4/3;object-fit:cover;}
.contact-img-ph{width:100%;border-radius:16px;aspect-ratio:4/3;background:${t.bg};display:flex;align-items:center;justify-content:center;font-size:48px;}
footer{text-align:center;padding:24px;font-size:12px;color:${t.text3};border-top:1px solid rgba(255,255,255,.06);background:${t.bg};}
@media(max-width:768px){
  .home-s{flex-direction:column;text-align:center;}
  .about-inner,.contact-inner{grid-template-columns:1fr;}
  .nav-links{display:none;}
}
</style>
</head>
<body>
<nav>
  <div class="logo">${d.home.name.split(" ")[0]}<span>.dev</span></div>
  <div class="nav-links"><a href="#home">Home</a><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
</nav>
<section class="home-s" id="home">
  <div style="flex:1;min-width:0;position:relative;z-index:2">
    <div class="badge"><div class="badge-dot"></div>${d.home.badge}</div>
    <h1>${d.home.name}</h1>
    <p class="tagline">${d.home.tagline}</p>
    <p class="bio">${d.home.bio}</p>
    <div class="btn-row">
      <a href="#projects" class="btn btn-solid">${d.home.cta}</a>
      <a href="#contact" class="btn btn-outline">${d.home.cta2}</a>
    </div>
  </div>
  ${d.home.img ? `<img src="${d.home.img}" class="avatar" alt="${d.home.name}"/>` : `<div class="avatar-ph">👤</div>`}
</section>
<section class="about-s" id="about">
  <div class="about-inner">
    <div>
      <h2 class="sec-title">${d.about.headline}</h2>
      <p class="sec-sub">${d.about.sub}</p>
      ${d.about.img ? `<img src="${d.about.img}" class="about-img" alt=""/>` : `<div class="about-img-ph">🖼️</div>`}
      <p class="story">${d.about.story}</p>
      <p class="story">${d.about.story2}</p>
      <div class="tags">${tags}</div>
    </div>
    <div style="padding-top:20px">${skills}</div>
  </div>
</section>
<section class="projects-s" id="projects">
  <h2 class="sec-title">${d.projects.headline}</h2>
  <p class="sec-sub">${d.projects.sub}</p>
  <div class="proj-grid">${projects}</div>
</section>
<section class="contact-s" id="contact">
  <div class="contact-inner">
    <div>
      <h2 class="sec-title">${d.contact.headline}</h2>
      <p class="sec-sub">${d.contact.sub}</p>
      <p class="story">${d.contact.intro}</p>
      <div class="contact-info">${info}</div>
      <a href="mailto:${d.contact.email}" class="btn btn-solid">${d.contact.cta}</a>
    </div>
    ${d.contact.img ? `<img src="${d.contact.img}" class="contact-img" alt=""/>` : `<div class="contact-img-ph">✉️</div>`}
  </div>
</section>
<footer>Made with PortfolioMaker &nbsp;·&nbsp; ${new Date().getFullYear()}</footer>
</body>
</html>`;
}

/* ─── SAVE STATUS INDICATOR ───────────────────────────────── */
function SaveStatus({ status }) {
  const map = {
    idle:    { label: "",             color: "transparent" },
    saving:  { label: "⏳ Saving…",   color: "#f59e0b" },
    saved:   { label: "✅ Saved",     color: "#22c55e" },
    error:   { label: "❌ Save failed", color: "#ef4444" },
  };
  const { label, color } = map[status] || map.idle;
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color, transition: "color .3s", minWidth: 90, textAlign: "right" }}>
      {label}
    </div>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────── */
export default function PortfolioMaker() {
  const sessionId = getSessionId();

  const [data, setData]         = useState(DEF);
  const [active, setActive]     = useState(0);
  const [preview, setPreview]   = useState(false);
  const [pvIdx, setPvIdx]       = useState(0);
  const [dlModal, setDlModal]   = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [loading, setLoading]   = useState(true);

  const saveTimer = useRef(null);

  // ── Load resume from backend on mount ─────────────────────
  useEffect(() => {
    fetch(`${API}/resumes/session/${sessionId}`)
      .then(r => r.json())
      .then(resume => {
        if (resume && resume.theme) {
          setData({
            theme:    resume.theme,
            home:     resume.home,
            about:    resume.about,
            projects: resume.projects,
            contact:  resume.contact,
          });
        }
      })
      .catch(() => {/* use default */})
      .finally(() => setLoading(false));
  }, []);

  // ── Auto-save: debounced 1.5 s after every data change ────
  const autoSave = useCallback((newData) => {
    clearTimeout(saveTimer.current);
    setSaveStatus("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API}/resumes/session/${sessionId}`, {
          method:  "PUT",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            theme:    newData.theme,
            home:     newData.home,
            about:    newData.about,
            projects: newData.projects,
            contact:  newData.contact,
            userName: newData.home?.name || "",
          }),
        });
        if (!res.ok) throw new Error("Save failed");
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    }, 1500);
  }, [sessionId]);

  const handleChange = (newData) => {
    setData(newData);
    autoSave(newData);
  };

  const t   = THEMES[data.theme] || THEMES.dark;
  const cur = SECS[active];

  const download = () => {
    setDlModal(false);
    const html = generateHTML(data);
    const blob = new Blob([html], { type: "text/html" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = `${data.home.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.html`;
    a.click();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0a0a0f", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif", gap: 12, fontSize: 15 }}>
        <div style={{ width: 20, height: 20, border: "2px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        Loading your portfolio…
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans',sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: 220, minWidth: 220, background: "#12121a", borderRight: "1px solid #1e1e2e", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 14px 12px", borderBottom: "1px solid #1e1e2e" }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.3px" }}>
            Portfolio<span style={{ color: t.accent2 }}>Maker</span>
          </div>
          <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>Click a section to edit</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px 0" }}>
          {SECS.map((s, i) => (
            <Thumb key={s.key} sk={s.key} data={data} theme={data.theme} active={active === i} onClick={() => setActive(i)} />
          ))}
        </div>
        <div style={{ padding: "10px", borderTop: "1px solid #1e1e2e", display: "flex", flexDirection: "column", gap: 7 }}>
          <button
            onClick={() => { setPreview(true); setPvIdx(0); }}
            style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #2d2d44", borderRadius: 8, color: "#94a3b8", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            👁 Full Preview
          </button>
          <button
            onClick={() => setDlModal(true)}
            style={{ width: "100%", padding: "9px", background: t.accent, border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Sora',sans-serif" }}
          >
            ⬇ Download HTML
          </button>
        </div>
      </div>

      {/* ── MAIN CANVAS ── */}
      <div style={{ flex: 1, overflowY: "auto", background: "#0a0a0f", padding: "24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* TOOLBAR */}
          <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: 12, padding: "10px 14px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#4b5563", textTransform: "uppercase", letterSpacing: "1px", marginRight: 4 }}>Theme</span>
            {Object.entries(THEMES).map(([k, th]) => (
              <button key={k} onClick={() => handleChange({ ...data, theme: k })}
                style={{ padding: "5px 11px", background: data.theme === k ? th.accent : "#1c1c2d", border: `1px solid ${data.theme === k ? th.accent : "#2d2d44"}`, borderRadius: 6, color: data.theme === k ? "#fff" : th.text2, fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all .15s" }}>
                {th.name}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <SaveStatus status={saveStatus} />
          </div>

          {/* SLIDE */}
          <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,.5)" }}>
            <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden", background: t.bg }}>
              <cur.Comp data={data} onChange={handleChange} theme={data.theme} />
            </div>
            <div style={{ padding: "10px 16px", background: "#1a1a26", borderTop: "1px solid #1e1e2e", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: ".5px" }}>
                {cur.label} — Slide {active + 1} / {SECS.length}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={active === 0} onClick={() => setActive(a => a - 1)}
                  style={{ width: 28, height: 28, background: "#1e1e2e", border: "1px solid #2d2d44", borderRadius: 6, color: "#94a3b8", cursor: active === 0 ? "not-allowed" : "pointer", opacity: active === 0 ? .3 : 1, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <button disabled={active === SECS.length - 1} onClick={() => setActive(a => a + 1)}
                  style={{ width: 28, height: 28, background: "#1e1e2e", border: "1px solid #2d2d44", borderRadius: 6, color: "#94a3b8", cursor: active === SECS.length - 1 ? "not-allowed" : "pointer", opacity: active === SECS.length - 1 ? .3 : 1, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
              </div>
            </div>
          </div>

          {/* TIPS */}
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#12121a", border: "1px solid #1e1e2e", borderRadius: 10, display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              ["✏️", "Click any text to edit inline"],
              ["🖼️", "Click image boxes to upload photos"],
              ["📊", "Click skill bars to set percentage"],
              ["🏷️", "Click tags to rename, + to add"],
              ["☁️", "Auto-saves to the cloud every 1.5 s"],
            ].map(([ic, tip], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#4b5563" }}>
                <span>{ic}</span><span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FULL PREVIEW ── */}
      {preview && (
        <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 999, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "rgba(0,0,0,.9)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #222" }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{SECS[pvIdx].label}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {SECS.map((_, i) => (
                <div key={i} onClick={() => setPvIdx(i)} style={{ width: 8, height: 8, borderRadius: "50%", background: pvIdx === i ? t.accent : "#333", cursor: "pointer", transition: "background .15s" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => setPvIdx(i => Math.max(0, i - 1))} style={{ background: "rgba(255,255,255,.1)", border: "1px solid #333", borderRadius: 6, color: "#fff", padding: "5px 14px", cursor: "pointer", fontSize: 12 }}>← Prev</button>
              <button onClick={() => setPvIdx(i => Math.min(SECS.length - 1, i + 1))} style={{ background: "rgba(255,255,255,.1)", border: "1px solid #333", borderRadius: 6, color: "#fff", padding: "5px 14px", cursor: "pointer", fontSize: 12 }}>Next →</button>
              <button onClick={() => setPreview(false)} style={{ background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.4)", borderRadius: 6, color: "#ef4444", padding: "5px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✕ Close</button>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflow: "hidden" }}>
            <div style={{ width: "100%", maxWidth: 960, aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", boxShadow: "0 0 80px rgba(0,0,0,.8)" }}>
              {(() => { const S = SECS[pvIdx].Comp; return <S data={data} onChange={handleChange} theme={data.theme} />; })()}
            </div>
          </div>
        </div>
      )}

      {/* ── DOWNLOAD MODAL ── */}
      {dlModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setDlModal(false)}>
          <div style={{ background: "#17171f", border: "1px solid #2d2d44", borderRadius: 16, padding: 28, maxWidth: 440, width: "90%" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 800, color: "#f1f5f9", marginBottom: 14 }}>Download Your Portfolio</div>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65, marginBottom: 18 }}>
              Exports a <strong style={{ color: "#f1f5f9" }}>standalone HTML file</strong> — open it in any browser, host it on GitHub Pages, Netlify, or share directly. No server or dependencies needed.
            </p>
            <div style={{ background: "#1c1c2d", border: "1px solid #2d2d44", borderRadius: 8, padding: "11px 14px", marginBottom: 20, fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
              ✅ All 4 sections included &nbsp;·&nbsp; ✅ Images embedded &nbsp;·&nbsp; ✅ Fully responsive &nbsp;·&nbsp; ✅ Navigation included
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setDlModal(false)} style={{ padding: "8px 18px", background: "transparent", border: "1px solid #2d2d44", borderRadius: 8, color: "#94a3b8", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={download} style={{ padding: "8px 20px", background: t.accent, border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>⬇ Download HTML</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}