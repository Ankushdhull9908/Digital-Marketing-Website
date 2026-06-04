import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, FileText, BarChart3, LogOut, Plus, HelpCircle,
  Users, Package, Mail, Edit3, Trash2, Eye, X, Check, Star, Quote, Briefcase,
  ChevronDown, ChevronUp, Image,
  Monitor, ImagePlay, FolderKanban, Video, Upload, Loader2,
  // ── new for Resumes panel ──
  FileUser, Layers, Box, Feather, Zap, ExternalLink,
} from "lucide-react";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://digital-marketing-temp.onrender.com/api";

const get   = (url)       => fetch(API + url).then(r => r.json());
const post  = (url, body) => fetch(API + url, { method:"POST",   headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());
const put   = (url, body) => fetch(API + url, { method:"PUT",    headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());
const del   = (url)       => fetch(API + url, { method:"DELETE" }).then(r => r.json());
const patch = (url, body) => fetch(API + url, { method:"PATCH",  headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());

// ─────────────────────────────────────────────────────────────────────────────
// ██  IMAGE UPLOAD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function ImageUpload({ value, onChange, label: labelText = "Image", accept = "image/*", folder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const inputRef                  = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const dataUri = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res  = await fetch(`${API}/upload`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataUri, folder: folder || "webtech" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop     = (e) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleFile(file); };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="space-y-2">
      {labelText && <label className="block text-xs font-semibold text-slate-500 mb-1">{labelText}</label>}
      <div
        className={`relative rounded-xl border-2 border-dashed transition-colors cursor-pointer
          ${uploading ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 bg-slate-50"}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop} onDragOver={handleDragOver}>
        {value ? (
          <div className="relative w-full h-36 group">
            <img src={value} alt="preview" className="w-full h-36 object-cover rounded-xl" onError={e => { e.target.style.opacity = 0.3; }} />
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <span className="hidden group-hover:flex items-center gap-1.5 bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow">
                <Upload size={13} /> Replace
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            {uploading ? (
              <><Loader2 size={28} className="text-indigo-400 animate-spin mb-2" /><p className="text-xs text-indigo-500 font-medium">Uploading…</p></>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-2"><Upload size={18} className="text-indigo-500" /></div>
                <p className="text-sm font-semibold text-slate-600">Click or drag & drop</p>
                <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, WebP up to 10 MB</p>
              </>
            )}
          </div>
        )}
        {uploading && value && (
          <div className="absolute inset-0 rounded-xl bg-white/70 flex items-center justify-center">
            <Loader2 size={28} className="text-indigo-500 animate-spin" />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><X size={11}/> {error}</p>}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
}

// ── shared badge ───────────────────────────────────────────────────────────────
function Badge({ text, color }) {
  const map = {
    green:  "bg-green-100 text-green-700",
    amber:  "bg-amber-100 text-amber-700",
    blue:   "bg-blue-100 text-blue-700",
    red:    "bg-red-100 text-red-700",
    slate:  "bg-slate-100 text-slate-600",
    purple: "bg-purple-100 text-purple-700",
    teal:   "bg-teal-100 text-teal-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${map[color] || map.slate}`}>{text}</span>
  );
}

// ── modal ──────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, onSave, children, wide }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`bg-white rounded-2xl w-full ${wide ? "max-w-3xl" : "max-w-lg"} shadow-2xl border border-slate-100 mx-4`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"><X size={18} className="text-slate-500" /></button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto">{children}</div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">Cancel</button>
          {onSave && <button onClick={onSave} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 flex items-center gap-1.5"><Check size={15} /> Save</button>}
        </div>
      </div>
    </div>
  );
}

const inp   = "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 bg-slate-50";
const label = "block text-xs font-semibold text-slate-500 mb-1";

function ActionBtn({ icon, onClick, danger }) {
  return (
    <button onClick={onClick}
      className={`p-2 rounded-lg border transition-colors ${danger
        ? "border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        : "border-slate-200 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"}`}>
      {icon}
    </button>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={12} className={s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████  RESUMES PANEL  (new)
// ─────────────────────────────────────────────────────────────────────────────

const TEMPLATE_META = {
  executive: { label: "Executive", color: "slate",  icon: <Box size={13} /> },
  editorial: { label: "Editorial", color: "red",    icon: <Feather size={13} /> },
  minimal:   { label: "Minimal",   color: "blue",   icon: <Layers size={13} /> },
  brutalist: { label: "Brutalist", color: "amber",  icon: <Zap size={13} /> },
};

function ResumeDetailModal({ resume, onClose }) {
  const t = TEMPLATE_META[resume.templateId] || TEMPLATE_META.executive;
  const row = (label, value) => value ? (
    <div className="flex gap-2 text-sm">
      <span className="w-28 flex-shrink-0 text-slate-400 font-medium">{label}</span>
      <span className="text-slate-700 break-all">{value}</span>
    </div>
  ) : null;

  return (
    <Modal title={`Resume — ${resume.name || "Unnamed"}`} onClose={onClose} wide>
      {/* Header row */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-lg">
          {(resume.name || "?").charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-base">{resume.name || "—"}</p>
          <p className="text-xs text-slate-400">{resume.title || "No title"}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {t.icon}
          <Badge text={t.label} color={t.color} />
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact</p>
        {row("Email",    resume.email)}
        {row("Phone",    resume.phone)}
        {row("Location", resume.location)}
        {row("Website",  resume.website)}
        {row("GitHub",   resume.github   && `github.com/${resume.github}`)}
        {row("LinkedIn", resume.linkedin && `linkedin.com/in/${resume.linkedin}`)}
      </div>

      {/* Tagline & About */}
      {resume.tagline && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Tagline</p>
          <p className="text-sm text-slate-600 italic">{resume.tagline}</p>
        </div>
      )}
      {resume.about && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">About</p>
          <p className="text-sm text-slate-600 leading-relaxed">{resume.about}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Experience</p>
          {resume.experience.map((e, i) => (
            <div key={i} className="mb-3 pl-3 border-l-2 border-slate-200">
              <p className="font-semibold text-slate-700 text-sm">{e.role} @ {e.company}</p>
              <p className="text-xs text-slate-400">{e.period}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Projects</p>
          {resume.projects.map((p, i) => (
            <div key={i} className="mb-3 pl-3 border-l-2 border-slate-200">
              <p className="font-semibold text-slate-700 text-sm">{p.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.tags?.map((t, j) => <span key={j} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-semibold">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Education</p>
          {resume.education.map((e, i) => (
            <div key={i} className="mb-2 pl-3 border-l-2 border-slate-200">
              <p className="font-semibold text-slate-700 text-sm">{e.school}</p>
              <p className="text-xs text-slate-400">{e.degree} · {e.year}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resume.achievements?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Achievements</p>
          {resume.achievements.map((a, i) => (
            <p key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-amber-400">✦</span>{a}</p>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-400">
        <span>Session: <span className="font-mono">{resume.sessionId}</span></span>
        <span>Last edited: {new Date(resume.lastEditedAt).toLocaleString("en-IN")}</span>
        <span>Created: {new Date(resume.createdAt).toLocaleString("en-IN")}</span>
      </div>
    </Modal>
  );
}

function ResumesPanel() {
  const [resumes,  setResumes]  = useState([]);
  const [stats,    setStats]    = useState({ total: 0, recent: 0, byTemplate: [] });
  const [loading,  setLoading]  = useState(true);
  const [page,     setPage]     = useState(1);
  const [pages,    setPages]    = useState(1);
  const [viewing,  setViewing]  = useState(null);
  const [search,   setSearch]   = useState("");
  const [filterTpl,setFilterTpl]= useState("all");

  const loadStats = () =>
    fetch(`${API}/resumes/stats`).then(r => r.json()).then(setStats).catch(() => {});

  const loadResumes = (p = 1) => {
    setLoading(true);
    fetch(`${API}/resumes?page=${p}&limit=20`)
      .then(r => r.json())
      .then(d => {
        setResumes(Array.isArray(d.resumes) ? d.resumes : []);
        setPages(d.pages || 1);
        setPage(d.page  || 1);
      })
      .catch(() => setResumes([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadStats(); loadResumes(1); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume permanently?")) return;
    await del(`/resumes/${id}`);
    loadStats();
    loadResumes(page);
  };

  const displayed = resumes.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || (r.name||"").toLowerCase().includes(q) || (r.email||"").toLowerCase().includes(q) || (r.title||"").toLowerCase().includes(q);
    const matchTpl    = filterTpl === "all" || r.templateId === filterTpl;
    return matchSearch && matchTpl;
  });

  const tplCount = (id) => (stats.byTemplate || []).find(b => b._id === id)?.count || 0;

  return (
    <>
      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Resumes",   value: stats.total,  color: "indigo" },
          { label: "Last 7 Days",     value: stats.recent, color: "green"  },
          { label: "Executive",       value: tplCount("executive"), color: "slate" },
          { label: "Editorial",       value: tplCount("editorial"), color: "red"   },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">{c.label}</p>
            <p className="text-3xl font-bold text-slate-800">{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
          <h3 className="font-bold text-slate-800">All User Resumes</h3>
          <div className="flex gap-3 flex-wrap">
            <input
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 bg-slate-50 w-52"
              placeholder="Search name, email, title…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 bg-slate-50"
              value={filterTpl}
              onChange={e => setFilterTpl(e.target.value)}>
              <option value="all">All Templates</option>
              {Object.entries(TEMPLATE_META).map(([id, m]) => (
                <option key={id} value={id}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400 text-sm gap-2">
            <Loader2 size={20} className="animate-spin" /> Loading resumes…
          </div>
        ) : displayed.length === 0 ? (
          <div className="py-16 text-center">
            <FileUser size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No resumes found.</p>
          </div>
        ) : (
          <>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Job Title</th>
                  <th className="px-5 py-3">Template</th>
                  <th className="px-5 py-3">Skills</th>
                  <th className="px-5 py-3">Last Edited</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayed.map(r => {
                  const tm = TEMPLATE_META[r.templateId] || TEMPLATE_META.executive;
                  return (
                    <tr key={r._id} className="hover:bg-slate-50 transition-colors">
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                            style={{ background: `${r.accentColor || "#2E9E6E"}22`, color: r.accentColor || "#2E9E6E" }}>
                            {(r.name || "?").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-700">{r.name || <span className="text-slate-300 italic">Unnamed</span>}</p>
                            <p className="text-xs text-slate-400">{r.email || r.sessionId?.slice(0, 16) + "…"}</p>
                          </div>
                        </div>
                      </td>
                      {/* Job title */}
                      <td className="px-5 py-4 text-slate-500 text-xs max-w-[160px]">
                        <p className="truncate">{r.title || "—"}</p>
                        <p className="text-slate-300 truncate">{r.location || ""}</p>
                      </td>
                      {/* Template */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">{tm.icon}</span>
                          <Badge text={tm.label} color={tm.color} />
                        </div>
                      </td>
                      {/* Skills preview */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {(r.skills || []).slice(0, 3).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium">{s}</span>
                          ))}
                          {(r.skills || []).length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded text-[10px]">+{r.skills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      {/* Last edited */}
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {new Date(r.lastEditedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        <br />
                        <span className="text-slate-300">{new Date(r.lastEditedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <ActionBtn icon={<Eye size={15} />} onClick={() => setViewing(r)} />
                          <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => handleDelete(r._id)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            {pages > 1 && (
              <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">Page {page} of {pages}</p>
                <div className="flex gap-2">
                  <button disabled={page <= 1} onClick={() => loadResumes(page - 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40">
                    ← Prev
                  </button>
                  <button disabled={page >= pages} onClick={() => loadResumes(page + 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40">
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Detail modal ── */}
      {viewing && <ResumeDetailModal resume={viewing} onClose={() => setViewing(null)} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████  ALL OTHER PANELS (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────

function InfluencerHubPanel() {
  const [subTab, setSubTab]           = useState("campaigns");
  const [campaigns, setCampaigns]     = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [expanded, setExpanded]       = useState(null);
  const [appsMap, setAppsMap]         = useState({});
  const [appsLoading, setAppsLoading] = useState({});

  const IAPI = API.replace("/api", "/api/influencer");

  useEffect(() => {
    fetch(`${IAPI}/campaigns/all`).then(r=>r.json()).then(d => setCampaigns(Array.isArray(d)?d:[]));
    fetch(`${IAPI}/influencers`).then(r=>r.json()).then(d => setInfluencers(Array.isArray(d)?d:[]));
  }, []);

  const toggleCampaign = async (id) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    if (appsMap[id]) return;
    setAppsLoading(p => ({...p, [id]: true}));
    const data = await fetch(`${IAPI}/campaigns/${id}/applications`).then(r=>r.json());
    setAppsMap(p => ({...p, [id]: Array.isArray(data) ? data : []}));
    setAppsLoading(p => ({...p, [id]: false}));
  };

  const updateStatus = async (campaignId, appId, status) => {
    await fetch(`${IAPI}/applications/${appId}/status`, {
      method: "PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({status})
    });
    setAppsMap(p => ({ ...p, [campaignId]: p[campaignId].map(a => a._id === appId ? {...a, status} : a) }));
  };

  const deleteCampaign   = async (id) => { if (!window.confirm("Delete this campaign?")) return; await fetch(`${IAPI}/campaigns/${id}`, {method:"DELETE"}); setCampaigns(p => p.filter(c => c._id !== id)); };
  const deleteInfluencer = async (id) => { if (!window.confirm("Delete this influencer profile?")) return; await fetch(`${IAPI}/influencers/${id}`, {method:"DELETE"}); setInfluencers(p => p.filter(i => i._id !== id)); };
  const toggleCampaignActive = async (c) => { await fetch(`${IAPI}/campaigns/${c._id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({isActive: !c.isActive}) }); setCampaigns(p => p.map(x => x._id === c._id ? {...x, isActive: !x.isActive} : x)); };

  const STATUS_OPTIONS = ["pending","reviewed","shortlisted","rejected"];
  const formatN = n => { if (!n) return "—"; if (n >= 10000000) return (n/10000000).toFixed(1)+"Cr"; if (n >= 100000) return (n/100000).toFixed(1)+"L"; if (n >= 1000) return (n/1000).toFixed(0)+"K"; return n; };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 bg-white rounded-2xl border border-slate-200 p-1.5 w-fit shadow-sm">
        {[["campaigns","🏢 Brand Campaigns"],["influencers","🎙️ Influencer Profiles"]].map(([id,lbl]) => (
          <button key={id} onClick={() => setSubTab(id)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${subTab===id ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:bg-slate-50"}`}>
            {lbl}
          </button>
        ))}
      </div>

      {subTab === "campaigns" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Brand Campaigns</h3>
            <span className="text-xs text-slate-400">{campaigns.length} total</span>
          </div>
          {campaigns.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">No brand campaigns yet.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr><th className="px-5 py-3">Brand</th><th className="px-5 py-3">Niche</th><th className="px-5 py-3">Budget</th><th className="px-5 py-3">Posted</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {campaigns.map(c => (
                  <React.Fragment key={c._id}>
                    <tr className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer ${expanded===c._id?"bg-indigo-50/30":""}`} onClick={() => toggleCampaign(c._id)}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {expanded===c._id ? <ChevronUp size={14} className="text-indigo-500"/> : <ChevronDown size={14} className="text-slate-400"/>}
                          <div><p className="font-semibold text-slate-700">{c.company}</p><p className="text-xs text-slate-400">{c.email}</p></div>
                        </div>
                      </td>
                      <td className="px-5 py-4">{c.niche ? <Badge text={c.niche} color="blue"/> : "—"}</td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-600">{c.budget ? `₹${c.budget}` : "—"}</td>
                      <td className="px-5 py-4 text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td>
                      <td className="px-5 py-4"><button onClick={e=>{e.stopPropagation();toggleCampaignActive(c);}}><Badge text={c.isActive?"Active":"Hidden"} color={c.isActive?"green":"amber"}/></button></td>
                      <td className="px-5 py-4" onClick={e=>e.stopPropagation()}><div className="flex justify-end"><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => deleteCampaign(c._id)}/></div></td>
                    </tr>
                    {expanded === c._id && (
                      <tr className="border-t border-indigo-100"><td colSpan={6} className="px-0 py-0">
                        <div className="bg-indigo-50/30 px-8 py-4">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Influencer Applications</p>
                          {appsLoading[c._id] ? <p className="text-sm text-slate-400">Loading…</p> :
                            !appsMap[c._id] || appsMap[c._id].length === 0 ? <p className="text-sm text-slate-400">No applications yet.</p> : (
                            <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-slate-100">
                              <thead><tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50"><th className="px-4 py-2 text-left">Influencer</th><th className="px-4 py-2 text-left">Handle</th><th className="px-4 py-2 text-left">Followers</th><th className="px-4 py-2 text-left">Message</th><th className="px-4 py-2 text-left">Status</th></tr></thead>
                              <tbody className="divide-y divide-slate-100">
                                {appsMap[c._id].map(app => (
                                  <tr key={app._id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-semibold text-slate-700">{app.influencer?.name || "—"}</td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">@{app.influencer?.handle || "—"}</td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{formatN(app.influencer?.followers)}</td>
                                    <td className="px-4 py-3 max-w-xs"><p className="text-xs text-slate-500 line-clamp-2">{app.message || "—"}</p></td>
                                    <td className="px-4 py-3">
                                      <select value={app.status} onChange={e => updateStatus(c._id, app._id, e.target.value)} className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none">
                                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td></tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {subTab === "influencers" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Registered Influencers</h3>
            <span className="text-xs text-slate-400">{influencers.length} total</span>
          </div>
          {influencers.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">No influencer profiles yet.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr><th className="px-5 py-3">Influencer</th><th className="px-5 py-3">Platforms</th><th className="px-5 py-3">Followers</th><th className="px-5 py-3">Niches</th><th className="px-5 py-3">Rate/Post</th><th className="px-5 py-3 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {influencers.map(inf => (
                  <tr key={inf._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4"><p className="font-semibold text-slate-700">{inf.name}</p><p className="text-xs text-slate-400">@{inf.handle} · {inf.location || "—"}</p></td>
                    <td className="px-5 py-4 text-xs text-slate-500">{inf.platforms?.join(", ") || "—"}</td>
                    <td className="px-5 py-4 font-semibold text-slate-700">{formatN(inf.followers)}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">{inf.niches?.slice(0,3).join(", ") || "—"}</td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-600">{inf.ratePerPost ? `₹${inf.ratePerPost}` : "—"}</td>
                    <td className="px-5 py-4"><div className="flex justify-end"><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => deleteInfluencer(inf._id)}/></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function TestimonialsPanel() {
  const [items, setItems]   = useState([]);
  const [modal, setModal]   = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm]     = useState({ name:"", role:"", company:"", text:"", avatarUrl:"", rating:5, order:0, isActive:true });

  const load = () => get("/testimonials?all=true").then(setItems);
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm({ name:"", role:"", company:"", text:"", avatarUrl:"", rating:5, order:0, isActive:true }); setEditId(null); setModal("add"); };
  const openEdit = t => { setForm({ name:t.name, role:t.role, company:t.company||"", text:t.text, avatarUrl:t.avatarUrl||"", rating:t.rating, order:t.order??0, isActive:t.isActive }); setEditId(t._id); setModal("edit"); };
  const save     = async () => { const body = {...form, rating:Number(form.rating), order:Number(form.order)}; if (editId) await put(`/testimonials/${editId}`, body); else await post("/testimonials", body); setModal(null); load(); };
  const remove   = async id => { await del(`/testimonials/${id}`); load(); };
  const toggle   = async t  => { await put(`/testimonials/${t._id}`, { isActive: !t.isActive }); load(); };

  const f      = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const fCheck = k => e => setForm(p => ({ ...p, [k]: e.target.checked }));
  const initials = name => name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Client Testimonials</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"><Plus size={15}/> Add Testimonial</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr><th className="px-5 py-3">Client</th><th className="px-5 py-3">Quote</th><th className="px-5 py-3">Rating</th><th className="px-5 py-3">Order</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">No testimonials yet.</td></tr>}
            {items.map(t => (
              <tr key={t._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {t.avatarUrl ? <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover"/> : <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{initials(t.name||"?")}</div>}
                    <div><p className="font-semibold text-slate-700">{t.name}</p><p className="text-xs text-slate-400">{t.role}{t.company ? `, ${t.company}` : ""}</p></div>
                  </div>
                </td>
                <td className="px-5 py-4 max-w-xs"><p className="text-xs text-slate-500 line-clamp-2">{t.text}</p></td>
                <td className="px-5 py-4"><StarRating rating={t.rating}/></td>
                <td className="px-5 py-4 text-slate-500 text-xs font-mono">{t.order??0}</td>
                <td className="px-5 py-4"><button onClick={() => toggle(t)}><Badge text={t.isActive?"Active":"Hidden"} color={t.isActive?"green":"amber"}/></button></td>
                <td className="px-5 py-4"><div className="flex justify-end gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(t)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(t._id)}/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal==="edit"?"Edit Testimonial":"Add Testimonial"} onClose={() => setModal(null)} onSave={save}>
          <div><label className={label}>Client Name *</label><input className={inp} value={form.name} onChange={f("name")} placeholder="John Smith"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Role *</label><input className={inp} value={form.role} onChange={f("role")} placeholder="Marketing Director"/></div>
            <div><label className={label}>Company</label><input className={inp} value={form.company} onChange={f("company")} placeholder="Acme Corp"/></div>
          </div>
          <div><label className={label}>Testimonial Text *</label><textarea className={inp} rows={4} value={form.text} onChange={f("text")}/></div>
          <ImageUpload label="Avatar Photo" value={form.avatarUrl} onChange={url => setForm(p => ({ ...p, avatarUrl: url }))} folder="webtech/testimonials" />
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Rating</label><select className={inp} value={form.rating} onChange={f("rating")}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}</select></div>
            <div><label className={label}>Display Order</label><input type="number" className={inp} value={form.order} onChange={f("order")} min={0}/></div>
          </div>
          <div className="flex items-center gap-3"><input id="t-active" type="checkbox" checked={form.isActive} onChange={fCheck("isActive")} className="w-4 h-4 accent-indigo-600"/><label htmlFor="t-active" className="text-sm text-slate-600 cursor-pointer">Show on website</label></div>
        </Modal>
      )}
    </>
  );
}

function FAQPanel() {
  const [faqs, setFaqs]     = useState([]);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState({ question:"", answer:"", category:"general" });
  const [editId, setEditId] = useState(null);

  const load     = () => get("/faqs?all=true").then(setFaqs);
  useEffect(() => { load(); }, []);
  const openAdd  = () => { setForm({ question:"", answer:"", category:"general" }); setEditId(null); setModal("add"); };
  const openEdit = f  => { setForm({ question:f.question, answer:f.answer, category:f.category, isActive:f.isActive }); setEditId(f._id); setModal("edit"); };
  const save     = async () => { if (editId) await put(`/faqs/${editId}`, form); else await post("/faqs", form); setModal(null); load(); };
  const remove   = async id => { await del(`/faqs/${id}`); load(); };
  const toggle   = async f  => { await put(`/faqs/${f._id}`, { isActive: !f.isActive }); load(); };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">All FAQs</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"><Plus size={15}/> Add FAQ</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr><th className="px-5 py-3">Question</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {faqs.map(f => (
              <tr key={f._id} className="hover:bg-slate-50">
                <td className="px-5 py-4 max-w-xs"><p className="font-semibold text-slate-700 truncate">{f.question}</p><p className="text-xs text-slate-400 truncate mt-0.5">{f.answer}</p></td>
                <td className="px-5 py-4"><Badge text={f.category} color="blue"/></td>
                <td className="px-5 py-4"><button onClick={() => toggle(f)}><Badge text={f.isActive?"Active":"Hidden"} color={f.isActive?"green":"amber"}/></button></td>
                <td className="px-5 py-4"><div className="flex justify-end gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(f)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(f._id)}/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal==="edit"?"Edit FAQ":"Add FAQ"} onClose={() => setModal(null)} onSave={save}>
          <div><label className={label}>Question</label><input className={inp} value={form.question} onChange={e=>setForm({...form,question:e.target.value})} placeholder="What is…"/></div>
          <div><label className={label}>Answer</label><textarea className={inp} rows={3} value={form.answer} onChange={e=>setForm({...form,answer:e.target.value})}/></div>
          <div><label className={label}>Category</label>
            <select className={inp} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              <option value="general">General</option><option value="seo">SEO</option><option value="pricing">Pricing</option><option value="web">Web</option>
            </select>
          </div>
        </Modal>
      )}
    </>
  );
}

function ClientsPanel() {
  const [clients, setClients] = useState([]);
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState({ name:"", logoUrl:"", websiteUrl:"" });
  const [editId, setEditId]   = useState(null);

  const load     = () => get("/clients").then(setClients);
  useEffect(() => { load(); }, []);
  const openAdd  = () => { setForm({ name:"", logoUrl:"", websiteUrl:"" }); setEditId(null); setModal("add"); };
  const openEdit = c  => { setForm({ name:c.name, logoUrl:c.logoUrl, websiteUrl:c.websiteUrl||"" }); setEditId(c._id); setModal("edit"); };
  const save     = async () => { if (editId) await put(`/clients/${editId}`, form); else await post("/clients", form); setModal(null); load(); };
  const remove   = async id => { await del(`/clients/${id}`); load(); };
  const toggle   = async c  => { await put(`/clients/${c._id}`, { isActive: !c.isActive }); load(); };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Client Logos</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"><Plus size={15}/> Add Client</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr><th className="px-5 py-3">Client</th><th className="px-5 py-3">Website</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map(c => (
              <tr key={c._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {c.logoUrl ? <img src={c.logoUrl} alt={c.name} className="w-10 h-10 rounded-xl object-contain bg-slate-100 p-1"/> : <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{c.name.slice(0,2).toUpperCase()}</div>}
                    <span className="font-semibold text-slate-700">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-slate-400">{c.websiteUrl||"—"}</td>
                <td className="px-5 py-4"><button onClick={() => toggle(c)}><Badge text={c.isActive?"Active":"Hidden"} color={c.isActive?"green":"amber"}/></button></td>
                <td className="px-5 py-4"><div className="flex justify-end gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(c)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(c._id)}/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal==="edit"?"Edit Client":"Add Client"} onClose={() => setModal(null)} onSave={save}>
          <div><label className={label}>Client Name</label><input className={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Company Name"/></div>
          <ImageUpload label="Client Logo" value={form.logoUrl} onChange={url => setForm(p => ({ ...p, logoUrl: url }))} folder="webtech/clients" />
          <div><label className={label}>Website URL</label><input className={inp} value={form.websiteUrl} onChange={e=>setForm({...form,websiteUrl:e.target.value})} placeholder="https://…"/></div>
        </Modal>
      )}
    </>
  );
}

export function MyApplicationsPanel() {
  const [apps, setApps]       = useState([]);
  const [loading, setLoading] = useState(true);
  const STATUS_COLOR = { pending:"amber", reviewed:"blue", shortlisted:"green", rejected:"red" };
  useEffect(() => { get("/jobs/user/my-applications").then(d => { setApps(Array.isArray(d)?d:[]); setLoading(false); }); }, []);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">My Job Applications</h3>
        <span className="text-xs text-slate-400">{apps.length} total</span>
      </div>
      {loading ? <div className="p-10 text-center text-slate-400 text-sm">Loading…</div> : apps.length === 0 ? (
        <div className="p-10 text-center text-slate-400 text-sm">No applications yet. <a href="/jobs" className="text-indigo-600 font-semibold hover:underline">Browse Jobs</a></div>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr><th className="px-5 py-3">Job</th><th className="px-5 py-3">Company</th><th className="px-5 py-3">Applied On</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Resume</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apps.map(app => (
              <tr key={app._id} className="hover:bg-slate-50">
                <td className="px-5 py-4"><p className="font-semibold text-slate-700">{app.job?.title??"Job Removed"}</p><p className="text-xs text-slate-400">{app.job?.location??""}{app.job?.category?` · ${app.job.category}`:""}</p></td>
                <td className="px-5 py-4 text-slate-500">{app.job?.company??"—"}</td>
                <td className="px-5 py-4 text-slate-500 text-xs">{new Date(app.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td>
                <td className="px-5 py-4"><Badge text={app.status} color={STATUS_COLOR[app.status]??"slate"}/></td>
                <td className="px-5 py-4">{app.resumeUrl ? <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-600 text-xs font-semibold hover:underline">View ↗</a> : <span className="text-slate-300 text-xs">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function RecruiterJobsPanel() {
  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [expanded, setExpanded]       = useState(null);
  const [appsMap, setAppsMap]         = useState({});
  const [appsLoading, setAppsLoading] = useState({});
  const [modal, setModal]             = useState(null);
  const [editId, setEditId]           = useState(null);
  const [form, setForm]               = useState({ title:"", company:"", location:"", category:"Frontend", description:"", salary:"", isActive:true });

  const STATUS_OPTIONS = ["pending","reviewed","shortlisted","rejected"];
  const STATUS_COLOR   = { pending:"amber", reviewed:"blue", shortlisted:"green", rejected:"red" };
  const loadJobs = () => get("/jobs/mine").then(d => { setJobs(Array.isArray(d)?d:[]); setLoading(false); });
  useEffect(() => { loadJobs(); }, []);

  const toggleExpand = async jobId => {
    if (expanded===jobId) { setExpanded(null); return; }
    setExpanded(jobId);
    if (appsMap[jobId]) return;
    setAppsLoading(p=>({...p,[jobId]:true}));
    const apps = await get(`/jobs/${jobId}/applications`);
    setAppsMap(p=>({...p,[jobId]:Array.isArray(apps)?apps:[]}));
    setAppsLoading(p=>({...p,[jobId]:false}));
  };

  const updateAppStatus = async (jobId, appId, status) => { await patch(`/jobs/applications/${appId}/status`, { status }); setAppsMap(p=>({...p,[jobId]:p[jobId].map(a=>a._id===appId?{...a,status}:a)})); };
  const openAdd = () => { setForm({ title:"", company:"", location:"", category:"Frontend", description:"", salary:"", isActive:true }); setEditId(null); setModal("add"); };
  const openEdit = job => { setForm({ title:job.title, company:job.company, location:job.location||"", category:job.category, description:job.description||"", salary:job.salary||"", isActive:job.isActive }); setEditId(job._id); setModal("edit"); };
  const saveJob = async () => { if (editId) await put(`/jobs/${editId}`, form); else await post("/jobs", form); setModal(null); loadJobs(); };
  const deleteJob = async id => { if (!window.confirm("Delete this job?")) return; await del(`/jobs/${id}`); loadJobs(); };
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">My Posted Jobs</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"><Plus size={15}/> Post New Job</button>
        </div>
        {loading ? <div className="p-10 text-center text-slate-400 text-sm">Loading…</div> : jobs.length===0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">No jobs posted yet.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr><th className="px-5 py-3">Job</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Posted</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <React.Fragment key={job._id}>
                  <tr className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer ${expanded===job._id?"bg-indigo-50/40":""}`} onClick={() => toggleExpand(job._id)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {expanded===job._id ? <ChevronUp size={14} className="text-indigo-500"/> : <ChevronDown size={14} className="text-slate-400"/>}
                        <div><p className="font-semibold text-slate-700">{job.title}</p><p className="text-xs text-slate-400">{job.company} · {job.location}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><Badge text={job.category} color="blue"/></td>
                    <td className="px-5 py-4 text-xs text-slate-500">{new Date(job.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td>
                    <td className="px-5 py-4"><Badge text={job.isActive?"Active":"Closed"} color={job.isActive?"green":"amber"}/></td>
                    <td className="px-5 py-4" onClick={e=>e.stopPropagation()}>
                      <div className="flex justify-end gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(job)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => deleteJob(job._id)}/></div>
                    </td>
                  </tr>
                  {expanded===job._id && (
                    <tr className="border-t border-indigo-100"><td colSpan={5} className="px-0 py-0">
                      <div className="bg-indigo-50/30 px-8 py-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Applications</p>
                        {appsLoading[job._id] ? <p className="text-sm text-slate-400">Loading…</p> : !appsMap[job._id]||appsMap[job._id].length===0 ? <p className="text-sm text-slate-400">No applications yet.</p> : (
                          <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-slate-100">
                            <thead><tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50"><th className="px-4 py-2 text-left">Applicant</th><th className="px-4 py-2 text-left">Email</th><th className="px-4 py-2 text-left">Applied</th><th className="px-4 py-2 text-left">Resume</th><th className="px-4 py-2 text-left">Status</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                              {appsMap[job._id].map(app => (
                                <tr key={app._id} className="hover:bg-slate-50">
                                  <td className="px-4 py-3 font-semibold text-slate-700">{app.applicantName||app.applicant?.name||"—"}</td>
                                  <td className="px-4 py-3 text-slate-500 text-xs">{app.applicantEmail||app.applicant?.email||"—"}</td>
                                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(app.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</td>
                                  <td className="px-4 py-3">{app.resumeUrl?<a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-600 text-xs font-semibold hover:underline">View ↗</a>:<span className="text-slate-300 text-xs">—</span>}</td>
                                  <td className="px-4 py-3">
                                    <select value={app.status} onChange={e=>updateAppStatus(job._id,app._id,e.target.value)} className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none">
                                      {STATUS_OPTIONS.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                                    </select>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </td></tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modal && (
        <Modal title={modal==="edit"?"Edit Job":"Post a New Job"} onClose={() => setModal(null)} onSave={saveJob}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Job Title *</label><input className={inp} value={form.title} onChange={f("title")}/></div>
            <div><label className={label}>Category</label><select className={inp} value={form.category} onChange={f("category")}>{["Frontend","Backend","Fullstack","Design","Marketing"].map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div><label className={label}>Company *</label><input className={inp} value={form.company} onChange={f("company")}/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Location</label><input className={inp} value={form.location} onChange={f("location")}/></div>
            <div><label className={label}>Salary</label><input className={inp} value={form.salary} onChange={f("salary")}/></div>
          </div>
          <div><label className={label}>Description</label><textarea className={inp} rows={4} value={form.description} onChange={f("description")}/></div>
          <div className="flex items-center gap-3">
            <input id="job-active" type="checkbox" className="w-4 h-4 accent-indigo-600" checked={form.isActive} onChange={e=>setForm(p=>({...p,isActive:e.target.checked}))}/>
            <label htmlFor="job-active" className="text-sm text-slate-600 cursor-pointer">Active (visible on job board)</label>
          </div>
        </Modal>
      )}
    </>
  );
}

function PackagesPanel() {
  const [pkgs, setPkgs]     = useState([]);
  const [modal, setModal]   = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm]     = useState({
    title: "", description: "", suffix: "", featured: false, badge: "",
    isActive: true, order: 0,
    prices: { Monthly: "", Quarterly: "", HalfYearly: "", Yearly: "" },
    features: "",
  });

  const load = () => get("/packages?all=true").then(setPkgs);
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({
      title: "", description: "", suffix: "", featured: false, badge: "",
      isActive: true, order: 0,
      prices: { Monthly: "", Quarterly: "", HalfYearly: "", Yearly: "" },
      features: "",
    });
    setEditId(null);
    setModal("add");
  };

  const openEdit = (p) => {
    setForm({
      title:       p.title,
      description: p.description || "",
      suffix:      p.suffix || "",
      featured:    p.featured || false,
      badge:       p.badge || "",
      isActive:    p.isActive,
      order:       p.order ?? 0,
      prices: {
        Monthly:    p.prices?.Monthly    ?? p.price ?? "",
        Quarterly:  p.prices?.Quarterly  ?? "",
        HalfYearly: p.prices?.HalfYearly ?? "",
        Yearly:     p.prices?.Yearly     ?? "",
      },
      features: (p.features || []).join(", "),
    });
    setEditId(p._id);
    setModal("edit");
  };

  const save = async () => {
    const body = {
      ...form,
      // Keep top-level price as Monthly for backward compat
      price: Number(form.prices.Monthly) || 0,
      prices: {
        Monthly:    Number(form.prices.Monthly)    || 0,
        Quarterly:  Number(form.prices.Quarterly)  || 0,
        HalfYearly: Number(form.prices.HalfYearly) || 0,
        Yearly:     Number(form.prices.Yearly)     || 0,
      },
      features: form.features.split(",").map(s => s.trim()).filter(Boolean),
      featured: Boolean(form.featured),
      order:    Number(form.order),
    };
    if (editId) await put(`/packages/${editId}`, body);
    else        await post("/packages", body);
    setModal(null);
    load();
  };

  const remove = async (id) => { await del(`/packages/${id}`); load(); };
  const toggle = async (p)  => { await put(`/packages/${p._id}`, { isActive: !p.isActive }); load(); };

  const setPrice = (cycle, val) =>
    setForm(prev => ({ ...prev, prices: { ...prev.prices, [cycle]: val } }));

  const CYCLES = ["Monthly", "Quarterly", "HalfYearly", "Yearly"];
  const CYCLE_LABELS = {
    Monthly: "Monthly (1 mo)", Quarterly: "Quarterly (3 mo)",
    HalfYearly: "Half Yearly (6 mo)", Yearly: "Yearly (12 mo)",
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Pricing Packages</h3>
          <button onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700">
            <Plus size={15} /> Add Package
          </button>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Package</th>
              <th className="px-5 py-3">Monthly</th>
              <th className="px-5 py-3">Quarterly</th>
              <th className="px-5 py-3">Half Yearly</th>
              <th className="px-5 py-3">Yearly</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pkgs.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-slate-400 text-sm">
                  No packages yet.
                </td>
              </tr>
            )}
            {pkgs.map(p => (
              <tr key={p._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-700">
                    {p.title}{" "}
                    {p.badge && <Badge text={p.badge} color="red" />}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.description}</p>
                </td>
                <td className="px-5 py-4 font-medium text-slate-700 text-sm">
                  ₹{(p.prices?.Monthly ?? p.price ?? 0).toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4 font-medium text-slate-700 text-sm">
                  ₹{(p.prices?.Quarterly ?? 0).toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4 font-medium text-slate-700 text-sm">
                  ₹{(p.prices?.HalfYearly ?? 0).toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4 font-medium text-slate-700 text-sm">
                  ₹{(p.prices?.Yearly ?? 0).toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4">
                  {p.featured
                    ? <Badge text="Popular" color="amber" />
                    : <span className="text-slate-300 text-xs">—</span>}
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(p)}>
                    <Badge
                      text={p.isActive ? "Active" : "Hidden"}
                      color={p.isActive ? "green" : "amber"}
                    />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn icon={<Edit3 size={15} />} onClick={() => openEdit(p)} />
                    <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(p._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal === "edit" ? "Edit Package" : "Add Package"}
          onClose={() => setModal(null)}
          onSave={save}
          wide
        >
          {/* Basic info */}
          <div>
            <label className={label}>Package Title *</label>
            <input className={inp} value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Standard" />
          </div>
          <div>
            <label className={label}>Description</label>
            <input className={inp} value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Ideal for growing startups." />
          </div>

          {/* Prices grid */}
          <div>
            <label className={label}>Prices (₹) per Billing Cycle</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {CYCLES.map(cycle => (
                <div key={cycle}>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                    {CYCLE_LABELS[cycle]}
                  </label>
                  <input
                    type="number"
                    className={inp}
                    value={form.prices[cycle]}
                    onChange={e => setPrice(cycle, e.target.value)}
                    placeholder="0"
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className={label}>Features (comma-separated)</label>
            <textarea
              className={inp}
              rows={3}
              value={form.features}
              onChange={e => setForm(p => ({ ...p, features: e.target.value }))}
              placeholder="5 Social Media Posts, Basic SEO, Email Support"
            />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Price Suffix (optional)</label>
              <input className={inp} value={form.suffix}
                onChange={e => setForm(p => ({ ...p, suffix: e.target.value }))}
                placeholder="/ month" />
            </div>
            <div>
              <label className={label}>Display Order</label>
              <input type="number" className={inp} value={form.order}
                onChange={e => setForm(p => ({ ...p, order: e.target.value }))}
                min={0} />
            </div>
          </div>

          <div>
            <label className={label}>Extra Badge (optional)</label>
            <input className={inp} value={form.badge}
              onChange={e => setForm(p => ({ ...p, badge: e.target.value }))}
              placeholder="HOT" />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <input id="feat-tog" type="checkbox" className="w-4 h-4 accent-indigo-600"
                checked={form.featured}
                onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
              <label htmlFor="feat-tog" className="text-sm text-slate-600 cursor-pointer">
                Mark as <span className="text-amber-500 font-bold">Popular</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input id="pkg-active" type="checkbox" className="w-4 h-4 accent-indigo-600"
                checked={form.isActive}
                onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} />
              <label htmlFor="pkg-active" className="text-sm text-slate-600 cursor-pointer">
                Active (visible on site)
              </label>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}



function ContactsPanel() {
  const [contacts, setContacts] = useState([]);
  const [viewing, setViewing]   = useState(null);
  const load = () => get("/contact").then(setContacts);
  useEffect(() => { load(); }, []);
  const remove       = async id           => { await del(`/contact/${id}`); load(); };
  const updateStatus = async (id, status) => { await patch(`/contact/${id}/status`, { status }); load(); };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Contact Submissions</h3>
          <span className="text-xs text-slate-400">{contacts.filter(c=>c.status==="new").length} unread</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Service</th><th className="px-5 py-3">Message</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contacts.map(c => (
              <tr key={c._id} className={`hover:bg-slate-50 ${c.status==="new"?"bg-indigo-50/30":""}`}>
                <td className="px-5 py-4"><p className="font-semibold text-slate-700">{c.fullName}</p><p className="text-xs text-slate-400">{c.phone||"—"}</p></td>
                <td className="px-5 py-4 text-slate-500">{c.email}</td>
                <td className="px-5 py-4">{c.subject?<Badge text={c.subject} color="blue"/>:"—"}</td>
                <td className="px-5 py-4 max-w-xs"><p className="text-xs text-slate-500 truncate">{c.message}</p></td>
                <td className="px-5 py-4">
                  <select value={c.status} onChange={e=>updateStatus(c._id,e.target.value)} className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none">
                    <option value="new">New</option><option value="seen">Seen</option><option value="replied">Replied</option>
                  </select>
                </td>
                <td className="px-5 py-4"><div className="flex justify-end gap-1.5"><ActionBtn icon={<Eye size={15}/>} onClick={() => setViewing(c)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(c._id)}/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewing && (
        <Modal title={`Message from ${viewing.fullName}`} onClose={() => setViewing(null)} onSave={() => { updateStatus(viewing._id,"replied"); setViewing(null); }}>
          <div className="text-xs text-slate-500 flex gap-3 flex-wrap"><span>{viewing.email}</span>{viewing.phone&&<span>{viewing.phone}</span>}{viewing.subject&&<Badge text={viewing.subject} color="blue"/>}</div>
          <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">{viewing.message}</div>
          <p className="text-xs text-slate-400 text-center">Save will mark as Replied.</p>
        </Modal>
      )}
    </>
  );
}

function StatCard({ label, value, sub, icon, color }) {
  const colors = { indigo:"text-indigo-600", blue:"text-blue-600", purple:"text-purple-600", green:"text-green-600" };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity ${colors[color]}`}>{icon}</div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold mt-1 text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 mt-2">{sub}</p>
    </div>
  );
}

// HomepagePanel + sub-editors (unchanged) ─────────────────────────────────────
function HomepagePanel() {
  const [activeSection, setActiveSection] = useState("slider");
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]   = useState("");

  const showToast = (msg, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(""), 2500); };
  const reload = () => { setLoading(true); get("/homepage").then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { reload(); }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-400 text-sm">Loading homepage data…</div>;

  const sections = [
    { key: "slider",       label: "Hero Slider",               icon: <ImagePlay size={16} />,    color: "blue"   },
    { key: "ourProjects",  label: "Our Projects",              icon: <FolderKanban size={16} />, color: "teal"   },
    { key: "clientVideos", label: "Client Testimonial Videos", icon: <Video size={16} />,        color: "purple" },
  ];
  const colorMap = { blue:"bg-blue-50 text-blue-700 border-blue-200 ring-blue-500", teal:"bg-teal-50 text-teal-700 border-teal-200 ring-teal-500", purple:"bg-purple-50 text-purple-700 border-purple-200 ring-purple-500" };

  return (
    <div className="space-y-6">
      {toast && <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold ${toast.ok?"bg-green-600 text-white":"bg-red-500 text-white"}`}>{toast.msg}</div>}
      <div className="flex flex-wrap gap-3">
        {sections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activeSection===s.key?`${colorMap[s.color]} ring-2 shadow-md`:"bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>
      {activeSection === "slider"       && <SliderSectionEditor       data={data} reload={reload} showToast={showToast} />}
      {activeSection === "ourProjects"  && <ProjectsSectionEditor     data={data} reload={reload} showToast={showToast} />}
      {activeSection === "clientVideos" && <ClientVideosSectionEditor data={data} reload={reload} showToast={showToast} />}
    </div>
  );
}

function SliderSectionEditor({ data, reload, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({ imageUrl: "", altText: "", order: 0 });
  const openAdd  = () => { setForm({ imageUrl: "", altText: "", order: (data?.slider?.images?.length || 0) }); setModal("add"); };
  const openEdit = img => { setForm({ imageUrl: img.imageUrl, altText: img.altText || "", order: img.order || 0 }); setModal(img); };
  const save = async () => {
    try {
      if (modal === "add") { await post("/homepage/slider/images", form); showToast("Slide added!"); }
      else { await fetch(`${API}/homepage/slider/images/${modal._id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) }); showToast("Slide updated!"); }
      setModal(null); reload();
    } catch { showToast("Error saving", false); }
  };
  const remove = async (id) => { if (!window.confirm("Remove this slide?")) return; await del(`/homepage/slider/images/${id}`); showToast("Slide removed!"); reload(); };
  const toggle = async (imgId, current) => { await fetch(`${API}/homepage/slider/images/${imgId}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ isActive: !current }) }); reload(); };
  const images = data?.slider?.images || [];
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div><h3 className="font-bold text-slate-800">Hero Slider Images</h3><p className="text-xs text-slate-400 mt-0.5">These images cycle in the hero carousel on the homepage.</p></div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"><Plus size={15}/> Add Slide</button>
        </div>
        {images.length === 0 ? <div className="p-10 text-center text-slate-400 text-sm">No slides yet.</div> : (
          <div className="divide-y divide-slate-100">
            {[...images].sort((a,b)=>a.order-b.order).map(img => (
              <div key={img._id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                {img.imageUrl ? <img src={img.imageUrl} alt={img.altText} className="w-24 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0" onError={e=>e.target.style.opacity=0.2}/> : <div className="w-24 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0"><Image size={20} className="text-slate-300"/></div>}
                <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-700 truncate">{img.imageUrl||"No URL"}</p><p className="text-xs text-slate-400 mt-0.5">{img.altText||"No alt text"} · Order #{img.order}</p></div>
                <button onClick={() => toggle(img._id, img.isActive)}><Badge text={img.isActive?"Active":"Hidden"} color={img.isActive?"green":"amber"}/></button>
                <div className="flex gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(img)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(img._id)}/></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal title={modal==="add"?"Add Slide":"Edit Slide"} onClose={() => setModal(null)} onSave={save}>
          <ImageUpload label="Slide Image *" value={form.imageUrl} onChange={url => setForm(p=>({...p,imageUrl:url}))} folder="webtech/slider"/>
          <div><label className={label}>Alt Text</label><input className={inp} value={form.altText} onChange={e=>setForm(p=>({...p,altText:e.target.value}))} placeholder="Describe the image"/></div>
          <div><label className={label}>Display Order</label><input type="number" className={inp} value={form.order} onChange={e=>setForm(p=>({...p,order:Number(e.target.value)}))} min={0}/></div>
        </Modal>
      )}
    </>
  );
}

const INDUSTRY_IDS = ["services","education","restaurants","ecommerce","realestate"];
function ProjectsSectionEditor({ data, reload, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({ title:"", imageUrl:"", industryId:"services", row:"top", order:0, isActive:true });
  const projects = data?.ourProjects?.projects || [];
  const openAdd  = () => { setForm({ title:"", imageUrl:"", industryId:"services", row:"top", order:projects.length, isActive:true }); setModal("add"); };
  const openEdit = p  => { setForm({ title:p.title, imageUrl:p.imageUrl, industryId:p.industryId||"services", row:p.row||"top", order:p.order||0, isActive:p.isActive }); setModal(p); };
  const save = async () => {
    try {
      if (modal==="add") { await post("/homepage/our-projects/projects", form); showToast("Project added!"); }
      else { await put(`/homepage/our-projects/projects/${modal._id}`, form); showToast("Project updated!"); }
      setModal(null); reload();
    } catch { showToast("Error saving", false); }
  };
  const remove = async (id) => { if (!window.confirm("Remove this project?")) return; await del(`/homepage/our-projects/projects/${id}`); showToast("Project removed!"); reload(); };
  const toggle = async (p) => { await put(`/homepage/our-projects/projects/${p._id}`, { isActive: !p.isActive }); reload(); };
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div><h3 className="font-bold text-slate-800">Our Projects Gallery</h3><p className="text-xs text-slate-400 mt-0.5">Top row = 4 images, bottom row = 2 images.</p></div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700"><Plus size={15}/> Add Project</button>
        </div>
        {["top","bottom"].map(row => {
          const rowProjects = [...projects].filter(p=>p.row===row).sort((a,b)=>a.order-b.order);
          return (
            <div key={row}>
              <div className="px-5 py-2 bg-slate-50 border-b border-slate-100"><p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{row==="top"?"Top Row (4 slots)":"Bottom Row (2 slots)"}</p></div>
              {rowProjects.length===0 ? <div className="px-5 py-4 text-sm text-slate-400 italic">No projects in this row yet.</div> : (
                <div className="divide-y divide-slate-100">
                  {rowProjects.map(proj => (
                    <div key={proj._id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                      {proj.imageUrl ? <img src={proj.imageUrl} alt={proj.title} className="w-20 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0" onError={e=>e.target.style.opacity=0.2}/> : <div className="w-20 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0"><Image size={18} className="text-slate-300"/></div>}
                      <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-700">{proj.title}</p><p className="text-xs text-slate-400 mt-0.5">Industry: <span className="font-medium text-slate-600">{proj.industryId}</span> · Order #{proj.order}</p></div>
                      <button onClick={() => toggle(proj)}><Badge text={proj.isActive?"Visible":"Hidden"} color={proj.isActive?"green":"amber"}/></button>
                      <div className="flex gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(proj)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(proj._id)}/></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal title={modal==="add"?"Add Project":"Edit Project"} onClose={() => setModal(null)} onSave={save}>
          <div><label className={label}>Project Title *</label><input className={inp} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))}/></div>
          <ImageUpload label="Project Image *" value={form.imageUrl} onChange={url=>setForm(p=>({...p,imageUrl:url}))} folder="webtech/projects"/>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Industry</label><select className={inp} value={form.industryId} onChange={e=>setForm(p=>({...p,industryId:e.target.value}))}>{INDUSTRY_IDS.map(id=><option key={id} value={id}>{id}</option>)}</select></div>
            <div><label className={label}>Grid Row</label><select className={inp} value={form.row} onChange={e=>setForm(p=>({...p,row:e.target.value}))}><option value="top">Top (up to 4)</option><option value="bottom">Bottom (up to 2)</option></select></div>
          </div>
          <div><label className={label}>Display Order</label><input type="number" className={inp} value={form.order} onChange={e=>setForm(p=>({...p,order:Number(e.target.value)}))} min={0}/></div>
          <div className="flex items-center gap-3"><input id="proj-active" type="checkbox" className="w-4 h-4 accent-teal-600" checked={form.isActive} onChange={e=>setForm(p=>({...p,isActive:e.target.checked}))}/><label htmlFor="proj-active" className="text-sm text-slate-600 cursor-pointer">Visible on homepage</label></div>
        </Modal>
      )}
    </>
  );
}

function ClientVideosSectionEditor({ data, reload, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({ clientName:"", clientRole:"", company:"", videoUrl:"", thumbnail:"", order:0, isActive:true });
  const videos = data?.clientVideos?.videos || [];
  const meta   = data?.clientVideos || {};
  const openAdd  = () => { setForm({ clientName:"", clientRole:"", company:"", videoUrl:"", thumbnail:"", order:videos.length, isActive:true }); setModal("add"); };
  const openEdit = v  => { setForm({ clientName:v.clientName, clientRole:v.clientRole||"", company:v.company||"", videoUrl:v.videoUrl, thumbnail:v.thumbnail||"", order:v.order||0, isActive:v.isActive }); setModal(v); };
  const save = async () => {
    try {
      if (modal==="add") { await post("/homepage/client-videos/videos", form); showToast("Video added!"); }
      else { await put(`/homepage/client-videos/videos/${modal._id}`, form); showToast("Video updated!"); }
      setModal(null); reload();
    } catch { showToast("Error saving", false); }
  };
  const remove   = async (id) => { if (!window.confirm("Remove this video?")) return; await del(`/homepage/client-videos/videos/${id}`); showToast("Video removed!"); reload(); };
  const toggle   = async (v)  => { await fetch(`${API}/homepage/client-videos/videos/${v._id}/toggle`, { method:"PATCH" }); reload(); };
  const saveMeta = async (field, value) => { await put("/homepage/client-videos/meta", { [field]: value }); reload(); };
  return (
    <>
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48"><label className={label}>Section Title</label><input className={inp} defaultValue={meta.sectionTitle||"What Our Clients Say"} onBlur={e=>saveMeta("sectionTitle",e.target.value)}/></div>
        <div className="flex-1 min-w-48"><label className={label}>Subtitle</label><input className={inp} defaultValue={meta.subtitle||""} onBlur={e=>saveMeta("subtitle",e.target.value)} placeholder="Real results from real clients"/></div>
        <div className="flex items-center gap-2 pb-2"><input id="cv-active" type="checkbox" className="w-4 h-4 accent-purple-600" defaultChecked={meta.isActive} onChange={e=>saveMeta("isActive",e.target.checked)}/><label htmlFor="cv-active" className="text-sm font-semibold text-purple-700 cursor-pointer">Section Visible</label></div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div><h3 className="font-bold text-slate-800">Client Testimonial Videos</h3><p className="text-xs text-slate-400 mt-0.5">Upload a thumbnail; paste a YouTube embed URL for the video.</p></div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700"><Plus size={15}/> Add Video</button>
        </div>
        {videos.length===0 ? <div className="p-10 text-center text-slate-400 text-sm">No client videos yet.</div> : (
          <div className="divide-y divide-slate-100">
            {[...videos].sort((a,b)=>a.order-b.order).map(v=>(
              <div key={v._id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                {v.thumbnail ? <img src={v.thumbnail} alt={v.clientName} className="w-24 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0" onError={e=>e.target.style.opacity=0.2}/> : <div className="w-24 h-14 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100"><Video size={20} className="text-purple-300"/></div>}
                <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-700">{v.clientName}</p><p className="text-xs text-slate-400 mt-0.5">{[v.clientRole,v.company].filter(Boolean).join(", ")||"No role/company"}</p><p className="text-xs text-slate-400 truncate mt-0.5">{v.videoUrl}</p></div>
                <button onClick={() => toggle(v)}><Badge text={v.isActive?"Active":"Hidden"} color={v.isActive?"green":"amber"}/></button>
                <div className="flex gap-1.5"><ActionBtn icon={<Edit3 size={15}/>} onClick={() => openEdit(v)}/><ActionBtn icon={<Trash2 size={15}/>} danger onClick={() => remove(v._id)}/></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal title={modal==="add"?"Add Client Video":"Edit Client Video"} onClose={() => setModal(null)} onSave={save}>
          <div><label className={label}>Client Name *</label><input className={inp} value={form.clientName} onChange={e=>setForm(p=>({...p,clientName:e.target.value}))} placeholder="Rahul Sharma"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Role</label><input className={inp} value={form.clientRole} onChange={e=>setForm(p=>({...p,clientRole:e.target.value}))} placeholder="CEO"/></div>
            <div><label className={label}>Company</label><input className={inp} value={form.company} onChange={e=>setForm(p=>({...p,company:e.target.value}))} placeholder="Acme Ltd."/></div>
          </div>
          <div><label className={label}>Video URL *</label><input className={inp} value={form.videoUrl} onChange={e=>setForm(p=>({...p,videoUrl:e.target.value}))} placeholder="https://www.youtube.com/embed/…"/><p className="text-xs text-slate-400 mt-1">Use a YouTube embed URL or direct .mp4 link.</p></div>
          <ImageUpload label="Thumbnail Image (optional)" value={form.thumbnail} onChange={url=>setForm(p=>({...p,thumbnail:url}))} folder="webtech/video-thumbnails"/>
          <div><label className={label}>Display Order</label><input type="number" className={inp} value={form.order} onChange={e=>setForm(p=>({...p,order:Number(e.target.value)}))} min={0}/></div>
          <div className="flex items-center gap-3"><input id="vid-active" type="checkbox" className="w-4 h-4 accent-purple-600" checked={form.isActive} onChange={e=>setForm(p=>({...p,isActive:e.target.checked}))}/><label htmlFor="vid-active" className="text-sm text-slate-600 cursor-pointer">Show on homepage</label></div>
        </Modal>
      )}
    </>
  );
}

function BlogsPanel() {
  const [blogs,   setBlogs]   = useState([]);
  const [modal,   setModal]   = useState(null);  // null | "add" | "edit"
  const [editId,  setEditId]  = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form,    setForm]    = useState({
    title: "", category: "SEO Strategy", author: "Sr. Writer",
    excerpt: "", content: "", image: "", tags: "",
    isActive: true, isFeatured: false, order: 0,
    publishedAt: new Date().toISOString().split("T")[0],
  });

  const CATEGORIES = [
    "SEO Strategy", "PPC / Google Ads", "Digital Marketing",
    "Social Media", "Content Marketing", "Web Design", "General",
  ];

  const load = () => get("/blogs?all=true").then(d => setBlogs(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({
      title: "", category: "SEO Strategy", author: "Sr. Writer",
      excerpt: "", content: "", image: "", tags: "",
      isActive: true, isFeatured: false, order: blogs.length,
      publishedAt: new Date().toISOString().split("T")[0],
    });
    setEditId(null);
    setModal("form");
  };

  const openEdit = (b) => {
    setForm({
      title:       b.title,
      category:    b.category || "General",
      author:      b.author || "Sr. Writer",
      excerpt:     b.excerpt || "",
      content:     b.content || "",
      image:       b.image || "",
      tags:        (b.tags || []).join(", "),
      isActive:    b.isActive,
      isFeatured:  b.isFeatured || false,
      order:       b.order ?? 0,
      publishedAt: b.publishedAt
        ? new Date(b.publishedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setEditId(b._id);
    setModal("form");
  };

  const save = async () => {
    const body = {
      ...form,
      tags:  form.tags.split(",").map(t => t.trim()).filter(Boolean),
      order: Number(form.order),
    };
    if (editId) await put(`/blogs/${editId}`, body);
    else        await post("/blogs", body);
    setModal(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this blog post permanently?")) return;
    await del(`/blogs/${id}`);
    load();
  };

  const toggle = async (b) => {
    await put(`/blogs/${b._id}`, { isActive: !b.isActive });
    load();
  };

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const fCheck = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.checked }));

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">All Blog Posts</h3>
            <p className="text-xs text-slate-400 mt-0.5">{blogs.length} total · {blogs.filter(b => b.isActive).length} published</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> New Post
          </button>
        </div>

        {/* Table */}
        {blogs.length === 0 ? (
          <div className="py-16 text-center">
            <FileText size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No blog posts yet. Create your first one!</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Post</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Published</th>
                <th className="px-5 py-3">Featured</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map(b => (
                <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                  {/* Post */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {b.image ? (
                        <img
                          src={b.image} alt={b.title}
                          className="w-14 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-100"
                          onError={e => { e.target.style.opacity = 0.3; }}
                        />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <FileText size={16} className="text-slate-300" />
                        </div>
                      )}
                      <div className="max-w-[220px]">
                        <p className="font-semibold text-slate-700 truncate">{b.title}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{b.excerpt || "No excerpt"}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-5 py-4">
                    <Badge text={b.category || "General"} color="blue" />
                  </td>
                  {/* Author */}
                  <td className="px-5 py-4 text-slate-500 text-xs">{b.author}</td>
                  {/* Published */}
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {formatDate(b.publishedAt || b.createdAt)}
                  </td>
                  {/* Featured */}
                  <td className="px-5 py-4">
                    {b.isFeatured
                      ? <Badge text="Featured" color="amber" />
                      : <span className="text-slate-300 text-xs">—</span>}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <button onClick={() => toggle(b)}>
                      <Badge
                        text={b.isActive ? "Published" : "Draft"}
                        color={b.isActive ? "green" : "amber"}
                      />
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <ActionBtn icon={<Eye size={15} />}    onClick={() => setViewing(b)} />
                      <ActionBtn icon={<Edit3 size={15} />}  onClick={() => openEdit(b)} />
                      <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(b._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal === "form" && (
        <Modal
          title={editId ? "Edit Blog Post" : "New Blog Post"}
          onClose={() => setModal(null)}
          onSave={save}
          wide
        >
          {/* Title */}
          <div>
            <label className={label}>Title *</label>
            <input className={inp} value={form.title} onChange={f("title")}
              placeholder="e.g. How to Rank #1 on Google in 2026" />
          </div>

          {/* Image upload */}
          <ImageUpload
            label="Cover Image"
            value={form.image}
            onChange={url => setForm(p => ({ ...p, image: url }))}
            folder="webtech/blogs"
          />

          {/* Category + Author */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Category</label>
              <select className={inp} value={form.category} onChange={f("category")}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Author</label>
              <input className={inp} value={form.author} onChange={f("author")}
                placeholder="Sr. Writer" />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className={label}>Excerpt (shown on card)</label>
            <textarea className={inp} rows={2} value={form.excerpt} onChange={f("excerpt")}
              placeholder="Short summary shown below the blog title on the card…" />
          </div>

          {/* Full content */}
          <div>
            <label className={label}>Full Content (for blog detail page)</label>
            <textarea className={inp} rows={6} value={form.content} onChange={f("content")}
              placeholder="Write the full blog article here…" />
          </div>

          {/* Tags */}
          <div>
            <label className={label}>Tags (comma-separated)</label>
            <input className={inp} value={form.tags} onChange={f("tags")}
              placeholder="seo, google, digital marketing" />
          </div>

          {/* Publish date + Order */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Publish Date</label>
              <input type="date" className={inp} value={form.publishedAt} onChange={f("publishedAt")} />
            </div>
            <div>
              <label className={label}>Display Order</label>
              <input type="number" className={inp} value={form.order} onChange={f("order")} min={0} />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <input id="blog-active" type="checkbox" className="w-4 h-4 accent-indigo-600"
                checked={form.isActive} onChange={fCheck("isActive")} />
              <label htmlFor="blog-active" className="text-sm text-slate-600 cursor-pointer">
                Published (visible on site)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input id="blog-featured" type="checkbox" className="w-4 h-4 accent-amber-500"
                checked={form.isFeatured} onChange={fCheck("isFeatured")} />
              <label htmlFor="blog-featured" className="text-sm text-slate-600 cursor-pointer">
                Mark as <span className="text-amber-500 font-bold">Featured</span>
              </label>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Preview Modal ── */}
      {viewing && (
        <Modal
          title="Blog Preview"
          onClose={() => setViewing(null)}
          wide
        >
          {/* Cover image */}
          {viewing.image && (
            <img
              src={viewing.image} alt={viewing.title}
              className="w-full h-52 object-cover rounded-xl border border-slate-100"
              onError={e => { e.target.style.opacity = 0.3; }}
            />
          )}

          {/* Meta row */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge text={viewing.category || "General"} color="blue" />
            {viewing.isFeatured && <Badge text="Featured" color="amber" />}
            <Badge text={viewing.isActive ? "Published" : "Draft"} color={viewing.isActive ? "green" : "amber"} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-800 leading-snug">{viewing.title}</h2>

          {/* Info row */}
          <div className="flex gap-4 text-xs text-slate-400 flex-wrap">
            <span>By <span className="font-semibold text-slate-600">{viewing.author}</span></span>
            <span>{new Date(viewing.publishedAt || viewing.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>

          {/* Excerpt */}
          {viewing.excerpt && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Excerpt</p>
              <p className="text-sm text-slate-600 leading-relaxed">{viewing.excerpt}</p>
            </div>
          )}

          {/* Content */}
          {viewing.content && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Content</p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{viewing.content}</p>
            </div>
          )}

          {/* Tags */}
          {viewing.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {viewing.tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Slug */}
          <p className="text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-2">
            slug: {viewing.slug || "—"}
          </p>
        </Modal>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████  MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard() {
  const navigate  = useNavigate();
  const [tab, setTab] = useState("overview");
  const logout = () => { localStorage.removeItem("token"); navigate("/"); };

  const nav = [
    { id:"overview",     label:"Dashboard",      icon:<LayoutDashboard size={18}/> },
    { id:"homepage",     label:"Homepage",        icon:<Monitor size={18}/>, badge:"NEW", dividerAfter: true },
    { id:"resumes",      label:"Resumes",         icon:<FileUser size={18}/>, badge:"NEW" },
    { id:"faqs",         label:"FAQs",           icon:<HelpCircle size={18}/> },
    { id:"clients",      label:"Clients",        icon:<Users size={18}/> },
    { id:"packages",     label:"Packages",       icon:<Package size={18}/> },
    { id:"testimonials", label:"Testimonials",   icon:<Quote size={18}/> },
    { id:"contacts",     label:"Contacts",       icon:<Mail size={18}/> },
    { id:"jobs",         label:"Jobs",           icon:<Briefcase size={18}/> },
    { id:"influencer",   label:"Influencer Hub", icon:<Users size={18}/> },
    { id:"analytics",    label:"Analytics",      icon:<BarChart3 size={18}/> },
    { id:"blogs", label:"Blogs", icon:<FileText size={18}/> },
  ];

  const tabMeta = {
    overview:     { title:"Overview",              sub:"Welcome back — here's what's happening." },
    homepage:     { title:"Homepage Sections",     sub:"Manage slider images, project gallery, and client testimonial videos." },
    resumes:      { title:"User Resumes",          sub:"View, search, and manage all resumes created by users." },
    faqs:         { title:"FAQs",                 sub:"Manage homepage FAQ section." },
    clients:      { title:"Clients",              sub:"Add and manage client logos on the homepage." },
    packages:     { title:"Packages",             sub:"Control pricing plans shown on the homepage." },
    testimonials: { title:"Testimonials",         sub:"Manage client testimonials shown on the homepage." },
    contacts:     { title:"Contacts",             sub:"View and respond to messages from users." },
    jobs:         { title:"Jobs",                 sub:"Manage job postings and applications." },
    influencer:   { title:"Influencer Hub",       sub:"Manage brand campaigns and influencer profiles." },
    analytics:    { title:"Analytics",            sub:"Site performance overview." },
    blogs: { title:"Blog Posts", sub:"Create and manage blog articles shown on the website." },
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* ── Sidebar ── */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">WebTech</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-0.5 overflow-y-auto">
          {nav.map(n => (
            <React.Fragment key={n.id}>
              <button onClick={() => setTab(n.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${tab===n.id?"bg-indigo-50 text-indigo-700 font-semibold":"text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                {n.icon} {n.label}
                {n.badge && <span className="ml-auto px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-600 text-[10px] font-bold">{n.badge}</span>}
                {n.id==="contacts" && <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">2</span>}
              </button>
              {n.dividerAfter && <div className="my-2 border-t border-slate-100" />}
            </React.Fragment>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 flex justify-between items-center px-8 py-4 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{tabMeta[tab]?.title || tab}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{tabMeta[tab]?.sub || ""}</p>
          </div>
        </header>

        <main className="p-8 overflow-y-auto flex-1">
          {tab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Pages"  value="12"    sub="+2 from last month"  icon={<FileText size={48}/>}  color="indigo"/>
                <StatCard label="Total Views"  value="3,240" sub="+12.5% increase"     icon={<BarChart3 size={48}/>} color="blue"/>
                <StatCard label="Conversions"  value="320"   sub="Avg. 9.8% rate"      icon={<Package size={48}/>}  color="purple"/>
                <StatCard label="New Messages" value="2"     sub="Unread contact forms" icon={<Mail size={48}/>}    color="green"/>
              </div>

              {/* Resume builder CTA */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Resume Builder</p>
                  <h3 className="text-lg font-bold text-slate-800">View All User Resumes</h3>
                  <p className="text-sm text-slate-500 mt-1">Browse, search, and manage resumes created by users on the Resume Maker.</p>
                </div>
                <button onClick={() => setTab("resumes")}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors flex-shrink-0 ml-6">
                  <FileUser size={16} /> View Resumes
                </button>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-100 p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">Homepage Editor</p>
                  <h3 className="text-lg font-bold text-slate-800">Manage Homepage Sections</h3>
                  <p className="text-sm text-slate-500 mt-1">Update slider images, project gallery, and client testimonial videos — all in one place.</p>
                </div>
                <button onClick={() => setTab("homepage")}
                  className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors flex-shrink-0 ml-6">
                  <Monitor size={16} /> Open Editor
                </button>
              </div>
            </>
          )}

          {tab === "resumes"      && <ResumesPanel />}
          {tab === "homepage"     && <HomepagePanel />}
          {tab === "faqs"         && <FAQPanel />}
          {tab === "clients"      && <ClientsPanel />}
          {tab === "packages"     && <PackagesPanel />}
          {tab === "testimonials" && <TestimonialsPanel />}
          {tab === "contacts"     && <ContactsPanel />}
          {tab === "jobs"         && <RecruiterJobsPanel />}
          {tab === "influencer"   && <InfluencerHubPanel />}
          {tab === "blogs" && <BlogsPanel />}
          {tab === "analytics" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
              <BarChart3 size={48} className="text-slate-300 mx-auto mb-4"/>
              <p className="text-slate-500 font-medium">Analytics integration coming soon.</p>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}

export default Dashboard;