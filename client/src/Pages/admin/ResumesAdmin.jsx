import { useState, useEffect } from "react";
import {  Trash2,Box,Feather,Layers,Zap,Loader2,Eye /* whatever icons that panel used */ } from "lucide-react";
import {  del} from "./shared/adminApi";
import {Badge, ActionBtn } from "./shared/AdminUI";
import { API } from "./shared/adminApi";




const TEMPLATE_META = {
  executive: { label: "Executive", color: "slate", icon: <Box size={13} /> },
  editorial: { label: "Editorial", color: "red", icon: <Feather size={13} /> },
  minimal: { label: "Minimal", color: "blue", icon: <Layers size={13} /> },
  brutalist: { label: "Brutalist", color: "amber", icon: <Zap size={13} /> },
};

function ResumeDetailModal({ resume, onClose }) {
  const t = TEMPLATE_META[resume.templateId] || TEMPLATE_META.executive;
  const row = (label, value) =>
    value ? (
      <div className="flex gap-2 text-sm">
        <span className="w-28 flex-shrink-0 text-slate-400 font-medium">{label}</span>
        <span className="text-slate-700 break-all">{value}</span>
      </div>
    ) : null;

  return (
    <Modal title={`Resume — ${resume.name || "Unnamed"}`} onClose={onClose} wide>
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

      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact</p>
        {row("Email", resume.email)}
        {row("Phone", resume.phone)}
        {row("Location", resume.location)}
        {row("Website", resume.website)}
        {row("GitHub", resume.github && `github.com/${resume.github}`)}
        {row("LinkedIn", resume.linkedin && `linkedin.com/in/${resume.linkedin}`)}
      </div>

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

      {resume.skills?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

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

      {resume.projects?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Projects</p>
          {resume.projects.map((p, i) => (
            <div key={i} className="mb-3 pl-3 border-l-2 border-slate-200">
              <p className="font-semibold text-slate-700 text-sm">{p.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.tags?.map((t, j) => (
                  <span key={j} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

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

      {resume.achievements?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Achievements</p>
          {resume.achievements.map((a, i) => (
            <p key={i} className="text-sm text-slate-600 flex gap-2">
              <span className="text-amber-400">✦</span>
              {a}
            </p>
          ))}
        </div>
      )}

      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-400">
        <span>Session: <span className="font-mono">{resume.sessionId}</span></span>
        <span>Last edited: {new Date(resume.lastEditedAt).toLocaleString("en-IN")}</span>
        <span>Created: {new Date(resume.createdAt).toLocaleString("en-IN")}</span>
      </div>
    </Modal>
  );
}



function ResumesAdmin() {
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState({ total: 0, recent: 0, byTemplate: [] });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTpl, setFilterTpl] = useState("all");

  const loadStats = () =>
    fetch(`${API}/resumes/stats`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});

  const loadResumes = (p = 1) => {
    setLoading(true);
    fetch(`${API}/resumes?page=${p}&limit=20`)
      .then((r) => r.json())
      .then((d) => {
        setResumes(Array.isArray(d.resumes) ? d.resumes : []);
        setPages(d.pages || 1);
        setPage(d.page || 1);
      })
      .catch(() => setResumes([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
    loadResumes(1);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume permanently?")) return;
    await del(`/resumes/${id}`);
    loadStats();
    loadResumes(page);
  };

  const displayed = resumes.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (r.name || "").toLowerCase().includes(q) ||
      (r.email || "").toLowerCase().includes(q) ||
      (r.title || "").toLowerCase().includes(q);
    const matchTpl = filterTpl === "all" || r.templateId === filterTpl;
    return matchSearch && matchTpl;
  });

  const tplCount = (id) =>
    (stats.byTemplate || []).find((b) => b._id === id)?.count || 0;

  return (
    <>
      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Resumes", value: stats.total, color: "indigo" },
          { label: "Last 7 Days", value: stats.recent, color: "green" },
          { label: "Executive", value: tplCount("executive"), color: "slate" },
          { label: "Editorial", value: tplCount("editorial"), color: "red" },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
          >
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
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 bg-slate-50"
              value={filterTpl}
              onChange={(e) => setFilterTpl(e.target.value)}
            >
              <option value="all">All Templates</option>
              {Object.entries(TEMPLATE_META).map(([id, m]) => (
                <option key={id} value={id}>
                  {m.label}
                </option>
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
                {displayed.map((r) => {
                  const tm =
                    TEMPLATE_META[r.templateId] || TEMPLATE_META.executive;
                  return (
                    <tr
                      key={r._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                            style={{
                              background: `${r.accentColor || "#2E9E6E"}22`,
                              color: r.accentColor || "#2E9E6E",
                            }}
                          >
                            {(r.name || "?").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-700">
                              {r.name || (
                                <span className="text-slate-300 italic">
                                  Unnamed
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-slate-400">
                              {r.email || r.sessionId?.slice(0, 16) + "…"}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Job title */}
                      <td className="px-5 py-4 text-slate-500 text-xs max-w-[160px]">
                        <p className="truncate">{r.title || "—"}</p>
                        <p className="text-slate-300 truncate">
                          {r.location || ""}
                        </p>
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
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium"
                            >
                              {s}
                            </span>
                          ))}
                          {(r.skills || []).length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded text-[10px]">
                              +{r.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Last edited */}
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {new Date(r.lastEditedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        <span className="text-slate-300">
                          {new Date(r.lastEditedAt).toLocaleTimeString(
                            "en-IN",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <ActionBtn
                            icon={<Eye size={15} />}
                            onClick={() => setViewing(r)}
                          />
                          <ActionBtn
                            icon={<Trash2 size={15} />}
                            danger
                            onClick={() => handleDelete(r._id)}
                          />
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
                <p className="text-xs text-slate-400">
                  Page {page} of {pages}
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => loadResumes(page - 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <button
                    disabled={page >= pages}
                    onClick={() => loadResumes(page + 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Detail modal ── */}
      {viewing && (
        <ResumeDetailModal resume={viewing} onClose={() => setViewing(null)} />
      )}
    </>
  );
}


export default ResumesAdmin;