import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Download, Plus, Trash2,
  User, Briefcase, Code, Mail, Star, Check, Palette,
  GraduationCap, Phone, MapPin, Globe,
  Eye, EyeOff, Layers, Zap, Feather, Box
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   GOOGLE FONTS — add to index.html:
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet">
═══════════════════════════════════════════════════════ */

/* ── Default Data ─────────────────────────────────────── */
const DEFAULT_DATA = {
  name: "Alex Morgan",
  title: "Senior Product Designer",
  tagline: "I design digital experiences that people love to use.",
  email: "alex@morgan.design",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  website: "morgan.design",
  github: "alexmorgan",
  linkedin: "alexmorgan",
  about: "I'm a product designer with 5+ years of experience crafting intuitive interfaces for startups and Fortune 500s. I believe great design solves real problems beautifully.",
  skills: ["Figma", "React", "UX Research", "Prototyping", "Tailwind CSS", "Motion Design"],
  experience: [
    { company: "Stripe", role: "Senior Designer", period: "2022 – Present", desc: "Led redesign of core payment flows, improving conversion by 23%." },
    { company: "Razorpay", role: "Product Designer", period: "2020 – 2022", desc: "Designed merchant dashboard used by 500k+ businesses." },
  ],
  education: [
    { school: "NID Ahmedabad", degree: "B.Des Interaction Design", year: "2020" },
  ],
  projects: [
    { title: "FinanceOS", desc: "A personal finance dashboard with AI insights.", tags: ["React", "D3.js", "OpenAI"], link: "#" },
    { title: "Bloom Health", desc: "Mental wellness app for Gen-Z. 50k+ downloads.", tags: ["Figma", "Flutter", "Firebase"], link: "#" },
    { title: "Typeset", desc: "Browser extension for typography nerds.", tags: ["Chrome API", "CSS", "JS"], link: "#" },
  ],
  achievements: ["Forbes 30 Under 30 nominee 2024", "Google UX Design Certified", "Dribbble Top Shot × 3"],
  accentColor: "#2E9E6E",
};

/* ── 4 Templates ──────────────────────────────────────── */
const TEMPLATES = [
  {
    id: "executive",
    name: "Executive",
    desc: "Clean, bold. For senior roles & leadership.",
    icon: <Box size={20} />,
    preview: { bg: "#0A0F0D", accent: "#2E9E6E", text: "#FFFFFF" },
  },
  {
    id: "editorial",
    name: "Editorial",
    desc: "Magazine-style. For creatives & designers.",
    icon: <Feather size={20} />,
    preview: { bg: "#FAFAF7", accent: "#E85D3A", text: "#1A1A1A" },
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Pure white space. For developers & engineers.",
    icon: <Layers size={20} />,
    preview: { bg: "#FFFFFF", accent: "#3B5BDB", text: "#111111" },
  },
  {
    id: "brutalist",
    name: "Brutalist",
    desc: "Bold & raw. Unforgettable first impressions.",
    icon: <Zap size={20} />,
    preview: { bg: "#F5F0E8", accent: "#D4A017", text: "#0D0D0D" },
  },
];

/* ── Form Steps ───────────────────────────────────────── */
const STEPS = [
  { id: "basic", label: "Basics", icon: <User size={16} /> },
  { id: "skills", label: "Skills", icon: <Star size={16} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
  { id: "projects", label: "Projects", icon: <Code size={16} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={16} /> },
];

/* ════════════════════════════════════════════════════════
   TEMPLATE RENDERERS
════════════════════════════════════════════════════════ */

/* ── Template 1: Executive (Dark) ──────────────────────── */
function ExecutiveTemplate({ d, accent }) {
  const a = accent || "#2E9E6E";
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#0A0F0D", color: "#fff", minHeight: "100%" }}>
      {/* Header */}
      <div style={{ padding: "56px 56px 40px", borderBottom: `1px solid #ffffff12` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ width: 40, height: 3, background: a, marginBottom: 20 }} />
            <h1 style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, margin: 0 }}>{d.name}</h1>
            <p style={{ fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.5, marginTop: 10 }}>{d.title}</p>
          </div>
          <div style={{ textAlign: "right", fontSize: 12, opacity: 0.5, lineHeight: 2.2 }}>
            <div>{d.email}</div>
            <div>{d.phone}</div>
            <div>{d.location}</div>
            {d.website && <div>{d.website}</div>}
          </div>
        </div>
        <p style={{ fontSize: 18, opacity: 0.65, marginTop: 28, maxWidth: 500, lineHeight: 1.6 }}>{d.tagline}</p>
      </div>

      {/* Body: two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 0 }}>
        {/* LEFT */}
        <div style={{ padding: "40px 56px", borderRight: `1px solid #ffffff12` }}>
          {/* About */}
          <Section label="About" accent={a}>
            <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7 }}>{d.about}</p>
          </Section>

          {/* Experience */}
          {d.experience.length > 0 && (
            <Section label="Experience" accent={a}>
              {d.experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{e.company}</span>
                    <span style={{ fontSize: 11, opacity: 0.4 }}>{e.period}</span>
                  </div>
                  <div style={{ fontSize: 12, color: a, marginTop: 2, marginBottom: 6 }}>{e.role}</div>
                  <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.7 }}>{e.desc}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {d.projects.length > 0 && (
            <Section label="Selected Work" accent={a}>
              {d.projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: `2px solid ${a}30` }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</div>
                  <p style={{ fontSize: 13, opacity: 0.6, margin: "4px 0 8px", lineHeight: 1.6 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map((t, j) => <span key={j} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, border: `1px solid ${a}50`, color: a }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ padding: "40px 40px", background: "#060D08" }}>
          <Section label="Skills" accent={a}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.skills.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: a, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, opacity: 0.75 }}>{s}</span>
                </div>
              ))}
            </div>
          </Section>

          {d.education.length > 0 && (
            <Section label="Education" accent={a}>
              {d.education.map((e, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{e.school}</div>
                  <div style={{ fontSize: 12, opacity: 0.5, marginTop: 2 }}>{e.degree}</div>
                  <div style={{ fontSize: 11, color: a, marginTop: 2 }}>{e.year}</div>
                </div>
              ))}
            </Section>
          )}

          {d.achievements.length > 0 && (
            <Section label="Achievements" accent={a}>
              {d.achievements.map((ach, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: a, fontSize: 10, marginTop: 3, flexShrink: 0 }}>✦</span>
                  <span style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5 }}>{ach}</span>
                </div>
              ))}
            </Section>
          )}

          {(d.github || d.linkedin) && (
            <Section label="Links" accent={a}>
              {d.github && <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>⟡ github.com/{d.github}</div>}
              {d.linkedin && <div style={{ fontSize: 12, opacity: 0.6 }}>⟡ linkedin.com/in/{d.linkedin}</div>}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Template 2: Editorial ──────────────────────────────── */
function EditorialTemplate({ d, accent }) {
  const a = accent || "#E85D3A";
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FAFAF7", color: "#1A1A1A", minHeight: "100%" }}>
      {/* Big Hero */}
      <div style={{ padding: "64px 64px 48px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: a, opacity: 0.06 }} />
        <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: a, fontFamily: "'Montserrat',sans-serif", marginBottom: 16 }}>Portfolio — {new Date().getFullYear()}</div>
        <h1 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, margin: 0, letterSpacing: "-3px" }}>{d.name}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
          <div style={{ height: 2, width: 48, background: a }} />
          <p style={{ fontSize: 20, fontStyle: "italic", opacity: 0.7, margin: 0 }}>{d.title}</p>
        </div>
        <p style={{ fontSize: 22, lineHeight: 1.5, maxWidth: 520, marginTop: 24, fontStyle: "italic", opacity: 0.75 }}>{d.tagline}</p>

        <div style={{ display: "flex", gap: 32, marginTop: 32, fontSize: 13, fontFamily: "'Montserrat',sans-serif", opacity: 0.5 }}>
          {[d.email, d.location, d.phone].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
        </div>
      </div>

      {/* Rule */}
      <div style={{ margin: "0 64px", height: 1, background: "#1A1A1A15" }} />

      {/* 3-col body */}
      <div style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr 280px", gap: 48 }}>
        {/* COL 1 */}
        <div>
          <EditSection label="About" accent={a}>
            <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.75 }}>{d.about}</p>
          </EditSection>
          {d.education.length > 0 && (
            <EditSection label="Education" accent={a}>
              {d.education.map((e, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{e.school}</div>
                  <div style={{ fontSize: 14, fontStyle: "italic", opacity: 0.6 }}>{e.degree} · {e.year}</div>
                </div>
              ))}
            </EditSection>
          )}
        </div>

        {/* COL 2 */}
        <div>
          {d.experience.length > 0 && (
            <EditSection label="Experience" accent={a}>
              {d.experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 28 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{e.role}</div>
                  <div style={{ fontSize: 13, color: a, fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>{e.company} · {e.period}</div>
                  <p style={{ fontSize: 14, opacity: 0.65, lineHeight: 1.7 }}>{e.desc}</p>
                </div>
              ))}
            </EditSection>
          )}

          {d.projects.length > 0 && (
            <EditSection label="Projects" accent={a}>
              {d.projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 22 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 13, fontFamily: "'Montserrat',sans-serif", color: a }}>0{i+1}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{p.title}</span>
                  </div>
                  <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.6, marginTop: 4 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                    {p.tags.map((t, j) => <span key={j} style={{ fontSize: 10, fontFamily: "'Montserrat',sans-serif", opacity: 0.5, borderBottom: `1px solid #1A1A1A30` }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </EditSection>
          )}
        </div>

        {/* COL 3 SIDEBAR */}
        <div style={{ borderLeft: `1px solid #1A1A1A12`, paddingLeft: 32 }}>
          <EditSection label="Skills" accent={a}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.skills.map((s, i) => (
                <span key={i} style={{ fontSize: 12, fontFamily: "'Montserrat',sans-serif", padding: "4px 10px", border: `1px solid ${a}`, borderRadius: 2, color: a }}>{s}</span>
              ))}
            </div>
          </EditSection>

          {d.achievements.length > 0 && (
            <EditSection label="Recognition" accent={a}>
              {d.achievements.map((ach, i) => (
                <div key={i} style={{ fontSize: 13, opacity: 0.7, marginBottom: 10, paddingLeft: 12, borderLeft: `2px solid ${a}` }}>{ach}</div>
              ))}
            </EditSection>
          )}

          <EditSection label="Contact" accent={a}>
            <div style={{ fontSize: 12, fontFamily: "'Montserrat',sans-serif", lineHeight: 2.2, opacity: 0.6 }}>
              {d.email && <div>{d.email}</div>}
              {d.phone && <div>{d.phone}</div>}
              {d.github && <div>github/{d.github}</div>}
              {d.linkedin && <div>linkedin/{d.linkedin}</div>}
            </div>
          </EditSection>
        </div>
      </div>
    </div>
  );
}

/* ── Template 3: Minimal ────────────────────────────────── */
function MinimalTemplate({ d, accent }) {
  const a = accent || "#3B5BDB";
  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: "#FFFFFF", color: "#111", minHeight: "100%", padding: "64px" }}>
      {/* Top: name left, contact right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
        <div>
          <h1 style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-1.5px", margin: 0, lineHeight: 1 }}>{d.name}</h1>
          <p style={{ fontSize: 13, opacity: 0.45, marginTop: 6, letterSpacing: "0.05em" }}>{d.title}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, opacity: 0.4, lineHeight: 2 }}>
          {[d.email, d.phone, d.location, d.website].filter(Boolean).map((v, i) => <div key={i}>{v}</div>)}
        </div>
      </div>

      <div style={{ height: 1, background: "#11111110", marginBottom: 40 }} />

      {/* Tagline */}
      <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 540, marginBottom: 48, opacity: 0.65, fontFamily: "Georgia, serif", fontStyle: "italic" }}>{d.tagline}</p>

      {/* About */}
      <MinRow label="// about" accent={a}>
        <p style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.65 }}>{d.about}</p>
      </MinRow>

      {/* Skills */}
      <MinRow label="// skills" accent={a}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
          {d.skills.map((s, i) => <span key={i} style={{ fontSize: 12, opacity: 0.6 }}>→ {s}</span>)}
        </div>
      </MinRow>

      {/* Experience */}
      {d.experience.length > 0 && (
        <MinRow label="// experience" accent={a}>
          {d.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 500, fontSize: 13 }}>{e.company} · {e.role}</span>
                <span style={{ fontSize: 11, opacity: 0.35 }}>{e.period}</span>
              </div>
              <p style={{ fontSize: 12, opacity: 0.55, marginTop: 4, lineHeight: 1.7 }}>{e.desc}</p>
            </div>
          ))}
        </MinRow>
      )}

      {/* Projects */}
      {d.projects.length > 0 && (
        <MinRow label="// projects" accent={a}>
          {d.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <span style={{ fontWeight: 500, fontSize: 13 }}>{p.title}</span>
              <p style={{ fontSize: 12, opacity: 0.55, marginTop: 3, lineHeight: 1.7 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
                {p.tags.map((t, j) => <span key={j} style={{ fontSize: 10, color: a, opacity: 0.8 }}>[{t}]</span>)}
              </div>
            </div>
          ))}
        </MinRow>
      )}

      {/* Education */}
      {d.education.length > 0 && (
        <MinRow label="// education" accent={a}>
          {d.education.map((e, i) => (
            <div key={i} style={{ fontSize: 13, marginBottom: 8 }}>
              <span style={{ opacity: 0.65 }}>{e.school}</span>
              <span style={{ opacity: 0.35 }}> · {e.degree} · {e.year}</span>
            </div>
          ))}
        </MinRow>
      )}

      {/* Footer */}
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #11111110", display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.35 }}>
        <span>{d.name}</span>
        {(d.github || d.linkedin) && (
          <span>{d.github && `gh/${d.github}`}{d.github && d.linkedin && " · "}{d.linkedin && `li/${d.linkedin}`}</span>
        )}
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

/* ── Template 4: Brutalist ──────────────────────────────── */
function BrutalistTemplate({ d, accent }) {
  const a = accent || "#D4A017";
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#F5F0E8", color: "#0D0D0D", minHeight: "100%" }}>
      {/* Massive header */}
      <div style={{ padding: "56px 56px 40px", borderBottom: "4px solid #0D0D0D" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 68, fontWeight: 900, letterSpacing: "-3px", lineHeight: 1, margin: 0, textTransform: "uppercase" }}>{d.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
              <div style={{ height: 4, width: 32, background: a }} />
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>{d.title}</span>
            </div>
          </div>
          <div style={{ background: a, padding: "16px 20px", fontWeight: 700, fontSize: 12, lineHeight: 2.2 }}>
            {[d.email, d.phone, d.location].filter(Boolean).map((v, i) => <div key={i}>{v}</div>)}
          </div>
        </div>
        <p style={{ fontSize: 20, fontWeight: 700, marginTop: 28, maxWidth: 600, lineHeight: 1.4 }}>{d.tagline}</p>
      </div>

      {/* Grid body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "4px solid #0D0D0D" }}>
        {/* About */}
        <BrutBox label="About" accent={a} border="right">
          <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.8 }}>{d.about}</p>
        </BrutBox>

        {/* Skills */}
        <BrutBox label="Skills" accent={a}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {d.skills.map((s, i) => (
              <span key={i} style={{ padding: "4px 12px", background: "#0D0D0D", color: "#F5F0E8", fontSize: 12, fontWeight: 700 }}>{s}</span>
            ))}
          </div>
        </BrutBox>
      </div>

      {/* Experience */}
      {d.experience.length > 0 && (
        <div style={{ borderBottom: "4px solid #0D0D0D" }}>
          <BrutBox label="Experience" accent={a}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {d.experience.map((e, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 800, fontSize: 16, textTransform: "uppercase" }}>{e.company}</div>
                  <div style={{ fontWeight: 600, color: a, fontSize: 13, margin: "4px 0 8px" }}>{e.role} · {e.period}</div>
                  <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.7 }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </BrutBox>
        </div>
      )}

      {/* Projects */}
      {d.projects.length > 0 && (
        <div style={{ borderBottom: "4px solid #0D0D0D" }}>
          <BrutBox label="Projects" accent={a}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              {d.projects.map((p, i) => (
                <div key={i} style={{ border: "2px solid #0D0D0D", padding: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, textTransform: "uppercase", marginBottom: 8 }}>{p.title}</div>
                  <p style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>
                  {p.tags.map((t, j) => <span key={j} style={{ display: "inline-block", fontSize: 10, background: a, padding: "1px 6px", marginRight: 4, marginBottom: 4, fontWeight: 700 }}>{t}</span>)}
                </div>
              ))}
            </div>
          </BrutBox>
        </div>
      )}

      {/* Education + Achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {d.education.length > 0 && (
          <BrutBox label="Education" accent={a} border="right">
            {d.education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{e.school}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>{e.degree} · {e.year}</div>
              </div>
            ))}
          </BrutBox>
        )}
        {d.achievements.length > 0 && (
          <BrutBox label="Achievements" accent={a}>
            {d.achievements.map((ach, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: a, fontWeight: 900 }}>★</span>
                <span style={{ fontSize: 13, opacity: 0.75 }}>{ach}</span>
              </div>
            ))}
          </BrutBox>
        )}
      </div>
    </div>
  );
}

/* ── Shared sub-components ───────────────────────────────── */
function Section({ label, accent, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", color: accent }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: `${accent}20` }} />
      </div>
      {children}
    </div>
  );
}
function EditSection({ label, accent, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 10, fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 14, fontWeight: 700 }}>{label}</div>
      {children}
    </div>
  );
}
function MinRow({ label, accent, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, marginBottom: 32 }}>
      <div style={{ fontSize: 11, color: accent, fontWeight: 500, paddingTop: 2, opacity: 0.8 }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}
function BrutBox({ label, accent, border, children }) {
  return (
    <div style={{ padding: "32px 40px", borderRight: border === "right" ? "4px solid #0D0D0D" : "none" }}>
      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.3em", textTransform: "uppercase", background: "#0D0D0D", color: accent, display: "inline-block", padding: "2px 10px", marginBottom: 20 }}>{label}</div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   FORM FIELDS
════════════════════════════════════════════════════════ */
const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-300";
const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5";

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input type={type} className={inputCls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} />
    </div>
  );
}
function TextAreaField({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <textarea className={inputCls + " resize-none"} rows={rows} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   STEP FORMS
════════════════════════════════════════════════════════ */
function StepBasics({ data, setData }) {
  const set = (k) => (v) => setData(d => ({ ...d, [k]: v }));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Full Name" value={data.name} onChange={set("name")} />
        <Field label="Job Title" value={data.title} onChange={set("title")} />
      </div>
      <TextAreaField label="Tagline / Headline" value={data.tagline} onChange={set("tagline")} rows={2} />
      <TextAreaField label="About Me" value={data.about} onChange={set("about")} rows={4} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Email" value={data.email} onChange={set("email")} type="email" />
        <Field label="Phone" value={data.phone} onChange={set("phone")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Location" value={data.location} onChange={set("location")} />
        <Field label="Website" value={data.website} onChange={set("website")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="GitHub Username" value={data.github} onChange={set("github")} />
        <Field label="LinkedIn Username" value={data.linkedin} onChange={set("linkedin")} />
      </div>
      <div>
        <label className={labelCls}>Accent Color</label>
        <div className="flex items-center gap-3">
          <input type="color" value={data.accentColor} onChange={e => set("accentColor")(e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-1" />
          <span className="text-xs text-slate-400">{data.accentColor} — used as highlight color in your template</span>
        </div>
      </div>
    </div>
  );
}

function StepSkills({ data, setData }) {
  const [newSkill, setNewSkill] = useState("");
  const add = () => {
    if (newSkill.trim()) {
      setData(d => ({ ...d, skills: [...d.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };
  const remove = (i) => setData(d => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));
  return (
    <div className="space-y-4">
      <div>
        <label className={labelCls}>Skills</label>
        <div className="flex flex-wrap gap-2 mb-3 p-3 bg-slate-50 rounded-lg min-h-[60px]">
          {data.skills.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium">
              {s}
              <button onClick={() => remove(i)} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={11} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input className={inputCls} value={newSkill} onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()} placeholder="Type a skill and press Enter" />
          <button onClick={add} className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors">
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div>
        <label className={labelCls}>Achievements</label>
        {data.achievements.map((ach, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={inputCls} value={ach} onChange={e => {
              const a = [...data.achievements]; a[i] = e.target.value;
              setData(d => ({ ...d, achievements: a }));
            }} />
            <button onClick={() => setData(d => ({ ...d, achievements: d.achievements.filter((_, idx) => idx !== i) }))}
              className="px-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => setData(d => ({ ...d, achievements: [...d.achievements, ""] }))}
          className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1 hover:text-emerald-700">
          <Plus size={13} /> Add Achievement
        </button>
      </div>
    </div>
  );
}

function StepExperience({ data, setData }) {
  const update = (i, k, v) => {
    const exp = [...data.experience]; exp[i] = { ...exp[i], [k]: v };
    setData(d => ({ ...d, experience: exp }));
  };
  const add = () => setData(d => ({ ...d, experience: [...d.experience, { company: "", role: "", period: "", desc: "" }] }));
  const remove = (i) => setData(d => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }));
  return (
    <div className="space-y-5">
      {data.experience.map((e, i) => (
        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience {i + 1}</span>
            <button onClick={() => remove(i)} className="text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company" value={e.company} onChange={v => update(i, "company", v)} />
            <Field label="Role / Title" value={e.role} onChange={v => update(i, "role", v)} />
          </div>
          <Field label="Period (e.g. 2021 – Present)" value={e.period} onChange={v => update(i, "period", v)} />
          <TextAreaField label="Description" value={e.desc} onChange={v => update(i, "desc", v)} rows={2} />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 font-semibold hover:border-emerald-300 hover:text-emerald-500 transition-colors flex items-center justify-center gap-2">
        <Plus size={16} /> Add Experience
      </button>
    </div>
  );
}

function StepProjects({ data, setData }) {
  const update = (i, k, v) => {
    const p = [...data.projects]; p[i] = { ...p[i], [k]: v };
    setData(d => ({ ...d, projects: p }));
  };
  const updateTag = (pi, ti, v) => {
    const p = [...data.projects]; p[pi].tags[ti] = v;
    setData(d => ({ ...d, projects: p }));
  };
  const addTag = (pi) => {
    const p = [...data.projects]; p[pi].tags = [...p[pi].tags, ""];
    setData(d => ({ ...d, projects: p }));
  };
  const removeTag = (pi, ti) => {
    const p = [...data.projects]; p[pi].tags = p[pi].tags.filter((_, i) => i !== ti);
    setData(d => ({ ...d, projects: p }));
  };
  const add = () => setData(d => ({ ...d, projects: [...d.projects, { title: "", desc: "", tags: [], link: "" }] }));
  const remove = (i) => setData(d => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));
  return (
    <div className="space-y-5">
      {data.projects.map((p, i) => (
        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project {i + 1}</span>
            <button onClick={() => remove(i)} className="text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Project Title" value={p.title} onChange={v => update(i, "title", v)} />
            <Field label="Live Link" value={p.link} onChange={v => update(i, "link", v)} />
          </div>
          <TextAreaField label="Description" value={p.desc} onChange={v => update(i, "desc", v)} rows={2} />
          <div>
            <label className={labelCls}>Tech Tags</label>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t, j) => (
                <div key={j} className="flex items-center gap-1">
                  <input className="text-xs border border-slate-200 rounded px-2 py-1 w-24 focus:outline-none focus:border-emerald-400" value={t} onChange={e => updateTag(i, j, e.target.value)} />
                  <button onClick={() => removeTag(i, j)} className="text-slate-300 hover:text-red-400"><Trash2 size={10} /></button>
                </div>
              ))}
              <button onClick={() => addTag(i)} className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-semibold"><Plus size={12} /> Tag</button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={add} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 font-semibold hover:border-emerald-300 hover:text-emerald-500 transition-colors flex items-center justify-center gap-2">
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
}

function StepEducation({ data, setData }) {
  const update = (i, k, v) => {
    const e = [...data.education]; e[i] = { ...e[i], [k]: v };
    setData(d => ({ ...d, education: e }));
  };
  const add = () => setData(d => ({ ...d, education: [...d.education, { school: "", degree: "", year: "" }] }));
  const remove = (i) => setData(d => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));
  return (
    <div className="space-y-5">
      {data.education.map((e, i) => (
        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education {i + 1}</span>
            <button onClick={() => remove(i)} className="text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
          <Field label="School / University" value={e.school} onChange={v => update(i, "school", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Degree / Program" value={e.degree} onChange={v => update(i, "degree", v)} />
            <Field label="Year" value={e.year} onChange={v => update(i, "year", v)} />
          </div>
        </div>
      ))}
      <button onClick={add} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 font-semibold hover:border-emerald-300 hover:text-emerald-500 transition-colors flex items-center justify-center gap-2">
        <Plus size={16} /> Add Education
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TEMPLATE PICKER SCREEN
════════════════════════════════════════════════════════ */
function TemplatePicker({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "linear-gradient(135deg, #0A0F0D 0%, #0d2720 100%)", fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          style={{ background: "#2E9E6E20", color: "#2E9E6E", border: "1px solid #2E9E6E40" }}>
          Portfolio Builder
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4" style={{ letterSpacing: "-2px" }}>
          Choose Your<br /><span style={{ background: "linear-gradient(90deg,#2E9E6E,#F5A623)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Template</span>
        </h1>
        <p className="text-base" style={{ color: "#7ab8a8" }}>Pick a style that represents you. You can customize everything next.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl w-full">
        {TEMPLATES.map((t) => (
          <motion.div key={t.id}
            whileHover={{ y: -6, scale: 1.02 }}
            onHoverStart={() => setHovered(t.id)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => onSelect(t.id)}
            className="cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300"
            style={{ border: hovered === t.id ? `2px solid ${t.preview.accent}` : "2px solid #ffffff10", background: "#111a16" }}>
            {/* Preview swatch */}
            <div className="h-36 relative overflow-hidden" style={{ background: t.preview.bg }}>
              {/* Mini layout mockup */}
              <div style={{ padding: 16 }}>
                <div style={{ width: 40, height: 4, background: t.preview.accent, borderRadius: 2, marginBottom: 8 }} />
                <div style={{ width: "70%", height: 10, background: t.preview.text, opacity: 0.6, borderRadius: 2, marginBottom: 6 }} />
                <div style={{ width: "45%", height: 7, background: t.preview.text, opacity: 0.3, borderRadius: 2, marginBottom: 14 }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[1,2,3,4].map(n => <div key={n} style={{ height: 5, background: t.preview.text, opacity: 0.15, borderRadius: 2 }} />)}
                </div>
              </div>
              {hovered === t.id && (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `${t.preview.accent}22`, backdropFilter: "blur(2px)" }}>
                  <span className="text-white text-sm font-bold px-4 py-2 rounded-full" style={{ background: t.preview.accent }}>
                    Use This Template
                  </span>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span style={{ color: t.preview.accent }}>{t.icon}</span>
                <span className="font-bold text-white text-sm">{t.name}</span>
              </div>
              <p className="text-xs" style={{ color: "#7ab8a8" }}>{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN EDITOR
════════════════════════════════════════════════════════ */
function Editor({ templateId, onBack }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ...DEFAULT_DATA });
  const [showPreview, setShowPreview] = useState(true);
  const printRef = useRef(null);

  const template = TEMPLATES.find(t => t.id === templateId);

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html><html><head>
      <title>${data.name} — Portfolio</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background: white; }
        @page { margin: 0; size: A4; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      </style>
      </head><body>${printContent}</body></html>
    `);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 600);
  };

  const renderTemplate = () => {
    const props = { d: data, accent: data.accentColor };
    switch (templateId) {
      case "executive": return <ExecutiveTemplate {...props} />;
      case "editorial": return <EditorialTemplate {...props} />;
      case "minimal": return <MinimalTemplate {...props} />;
      case "brutalist": return <BrutalistTemplate {...props} />;
      default: return <ExecutiveTemplate {...props} />;
    }
  };

  const stepComponents = [
    <StepBasics data={data} setData={setData} />,
    <StepSkills data={data} setData={setData} />,
    <StepExperience data={data} setData={setData} />,
    <StepProjects data={data} setData={setData} />,
    <StepEducation data={data} setData={setData} />,
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: "#F1F4F2", fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── TOP BAR ── */}
      <nav className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-5 sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ChevronLeft size={16} /> Templates
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span style={{ color: template?.preview.accent }}>{template?.icon}</span>
            <span className="text-sm font-bold text-slate-700">{template?.name} Template</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPreview(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 shadow-md"
            style={{ background: "linear-gradient(135deg, #2E9E6E, #1d7a54)" }}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ── SIDEBAR FORM ── */}
        <aside className="w-[340px] flex-shrink-0 bg-white border-r border-slate-100 flex flex-col overflow-hidden print:hidden shadow-sm">
          {/* Step tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button key={s.id} onClick={() => setStep(i)}
                className="flex-1 flex flex-col items-center gap-1 py-3 px-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border-b-2 min-w-0"
                style={{
                  color: step === i ? "#2E9E6E" : "#94a3b8",
                  borderBottomColor: step === i ? "#2E9E6E" : "transparent",
                  background: step === i ? "#2E9E6E08" : "transparent",
                }}>
                {s.icon}
                <span className="truncate">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1 overflow-y-auto p-5">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                {stepComponents[step]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="p-4 border-t border-slate-100 flex justify-between">
            <button disabled={step === 0} onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors">
              <ChevronLeft size={15} /> Prev
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#2E9E6E" }}>
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button onClick={handlePrint}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2E9E6E, #1d7a54)" }}>
                <Download size={14} /> Export PDF
              </button>
            )}
          </div>
        </aside>

        {/* ── PREVIEW CANVAS ── */}
        <AnimatePresence>
          {showPreview && (
            <motion.main
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto p-6 md:p-10 print:p-0 print:bg-white"
              style={{ background: "#E8EDE9" }}>
              <div className="mb-4 flex items-center gap-2 print:hidden">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-medium">Live Preview — updates as you type</span>
              </div>
              <div
                ref={printRef}
                className="w-full max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none print:max-w-none"
                style={{ minHeight: 800 }}>
                {renderTemplate()}
              </div>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ROOT
════════════════════════════════════════════════════════ */
export default function PortfolioMaker() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <AnimatePresence mode="wait">
      {!selectedTemplate ? (
        <motion.div key="picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
          <TemplatePicker onSelect={setSelectedTemplate} />
        </motion.div>
      ) : (
        <motion.div key="editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Editor templateId={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}