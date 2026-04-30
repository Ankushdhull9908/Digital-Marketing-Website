import React, { useState, useEffect, useCallback } from "react";
import "./JobPortal.css";

const API = "http://localhost:5000/api" || "https://digital-marketing-temp.onrender.com/api";

//  || "https://digital-marketing-temp.onrender.com/api"

const CATEGORIES = ["All", "Frontend", "Backend", "Fullstack", "Design", "Marketing"];

// ─── helpers ─────────────────────────────────────────────────────────────────
/*const authHeaders = () => ({
  "Content-Type": "application/json",
  // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});*/

const apiFetch = (url, opts = {}) =>
  fetch(API + url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  }).then((r) => r.json());

const STATUS_COLOR = {
  pending:     { bg: "#FEF3C7", text: "#92400E", label: "Pending" },
  reviewed:    { bg: "#DBEAFE", text: "#1E40AF", label: "Reviewed" },
  shortlisted: { bg: "#D1FAE5", text: "#065F46", label: "Shortlisted" },
  rejected:    { bg: "#FEE2E2", text: "#991B1B", label: "Rejected" },
};

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_COLOR[status] || STATUS_COLOR.pending;
  return (
    <span
      style={{
        background: s.bg, color: s.text,
        padding: "2px 10px", borderRadius: 99, fontSize: 11,
        fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
      }}
    >
      {s.label}
    </span>
  );
}

// ─── ApplyModal ───────────────────────────────────────────────────────────────
function ApplyModal({ job, onClose, onSuccess }) {
  const [form, setForm] = useState({ coverLetter: "", resumeUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch(`/jobs/${job._id}/apply`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (res.error) { setError(res.error); return; }
      onSuccess();
      onClose();
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jp-modal-overlay">
      <div className="jp-modal-box">
        <div className="jp-modal-head">
          <div>
            <h2>Apply for {job.title}</h2>
            <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>{job.company} · {job.location}</p>
          </div>
          <button className="jp-close-x" onClick={onClose}>&times;</button>
        </div>
        <div className="jp-form">
          {error && (
            <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 8 }}>
              {error}
            </div>
          )}
          <div className="jp-input-field">
            <label>Cover Letter</label>
            <textarea
              rows={5}
              value={form.coverLetter}
              onChange={e => setForm(p => ({ ...p, coverLetter: e.target.value }))}
              placeholder="Tell the recruiter why you're a great fit..."
            />
          </div>
          <div className="jp-input-field">
            <label>Resume URL <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span></label>
            <input
              value={form.resumeUrl}
              onChange={e => setForm(p => ({ ...p, resumeUrl: e.target.value }))}
              placeholder="https://drive.google.com/..."
            />
          </div>
          <button className="jp-submit-action" onClick={submit} disabled={loading}>
            {loading ? "Submitting…" : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── JobDetailModal ───────────────────────────────────────────────────────────
function JobDetailModal({ job, appliedIds, onClose, onApply }) {
  const alreadyApplied = appliedIds.has(job._id);

  return (
    <div className="jp-modal-overlay">
      <div className="jp-modal-box" style={{ maxWidth: 560 }}>
        <div className="jp-modal-head">
          <div>
            <span className="jp-cat-badge" style={{ marginBottom: 6, display: "inline-block" }}>{job.category}</span>
            <h2 style={{ margin: 0 }}>{job.title}</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>
              {job.company} · {job.location}
              {job.postedBy?.name && ` · Posted by ${job.postedBy.name}`}
            </p>
          </div>
          <button className="jp-close-x" onClick={onClose}>&times;</button>
        </div>

        <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: 13, color: "#374151" }}>Job Description</p>
            <p style={{ margin: 0, fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{job.description || "No description provided."}</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ background: "#F3F4F6", padding: "4px 12px", borderRadius: 99, fontSize: 12, color: "#374151", fontWeight: 600 }}>
              {job.type || "Full-time"}
            </span>
            {job.salary && (
              <span style={{ background: "#F3F4F6", padding: "4px 12px", borderRadius: 99, fontSize: 12, color: "#374151", fontWeight: 600 }}>
                {job.salary}
              </span>
            )}
          </div>

          {alreadyApplied ? (
            <div style={{ background: "#D1FAE5", color: "#065F46", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
              ✓ You've already applied to this job
            </div>
          ) : (
            <button className="jp-submit-action" onClick={() => { onClose(); onApply(job); }}>
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main JobPortal ───────────────────────────────────────────────────────────
export default function JobPortal() {
  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPostModal, setShowPostModal]   = useState(false);
  const [applyTarget, setApplyTarget]       = useState(null);
  const [detailTarget, setDetailTarget]     = useState(null);
  const [appliedIds, setAppliedIds]         = useState(new Set());
  const [toast, setToast]             = useState("");

  const [form, setForm] = useState({
    title: "", company: "", location: "", category: "Frontend", description: "", salary: "",
  });

  // ── fetch jobs ──
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeCategory !== "All" ? `?category=${activeCategory}` : "";
      const data = await apiFetch(`/jobs${params}`);
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  // ── fetch my applications (to know which jobs I already applied to) ──
  const fetchMyApps = useCallback(async () => {
    if (!localStorage.getItem("token")) return;
    try {
      const data = await apiFetch("/jobs/user/my-applications");
      if (Array.isArray(data)) {
        setAppliedIds(new Set(data.map(a => a.job?._id || a.job)));
      }
    } catch {}
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);
  useEffect(() => { fetchMyApps(); }, [fetchMyApps]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  // ── post a job ──
  const handleSubmit = async () => {
    if (!form.title || !form.company) return;
    const res = await apiFetch("/jobs", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.error) { showToast("Error: " + res.error); return; }
    setForm({ title: "", company: "", location: "", category: "Frontend", description: "", salary: "" });
    setShowPostModal(false);
    fetchJobs();
    showToast("Job posted successfully!");
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="jp-main-wrapper">
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "#1F2937", color: "#fff", padding: "10px 20px",
          borderRadius: 10, zIndex: 9999, fontSize: 14, fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          {toast}
        </div>
      )}

      {/* Fixed Top */}
      <div className="jp-fixed-top">
        <nav className="jp-navbar">
          <div className="jp-nav-content">
            <h1 className="jp-logo">Job<span>Hub</span></h1>
            <button className="jp-add-btn" onClick={() => setShowPostModal(true)}>
              + Post a Job
            </button>
          </div>
        </nav>
        <header className="jp-hero">
          <h1>Find Your Next Role</h1>
          <div className="jp-filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`jp-filter-item ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>
      </div>

      {/* Scrollable Job Grid */}
      <main className="jp-scroll-container">
        <div className="jp-content-inner">
          {loading ? (
            <div className="jp-empty">Loading jobs…</div>
          ) : jobs.length === 0 ? (
            <div className="jp-empty">No jobs found in this category.</div>
          ) : (
            <div className="jp-grid">
              {jobs.map((job) => (
                <div className="jp-card" key={job._id}>
                  <div className="jp-card-top">
                    <span className="jp-cat-badge">{job.category}</span>
                    <span className="jp-type">{job.type || "Full-time"}</span>
                  </div>
                  <h3 className="jp-job-title">{job.title}</h3>
                  <p className="jp-comp-name">{job.company}</p>
                  <p className="jp-loc-text">📍 {job.location}</p>
                  <p className="jp-job-desc">{job.description}</p>

                  {appliedIds.has(job._id) && (
                    <div style={{ marginBottom: 8 }}>
                      <StatusBadge status="pending" />
                      <span style={{ fontSize: 11, color: "#6B7280", marginLeft: 6 }}>Applied</span>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="jp-view-btn" onClick={() => setDetailTarget(job)}>
                      View Details
                    </button>
                    {!appliedIds.has(job._id) && (
                      <button
                        className="jp-view-btn"
                        style={{ background: "#4F46E5", color: "#fff", borderColor: "#4F46E5" }}
                        onClick={() => setApplyTarget(job)}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="jp-modal-overlay">
          <div className="jp-modal-box">
            <div className="jp-modal-head">
              <h2>Post a New Role</h2>
              <button className="jp-close-x" onClick={() => setShowPostModal(false)}>&times;</button>
            </div>
            <div className="jp-form">
              <div className="jp-form-row">
                <div className="jp-input-field">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="jp-input-field">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="jp-input-field">
                <label>Company *</label>
                <input name="company" value={form.company} onChange={handleChange} required />
              </div>
              <div className="jp-form-row">
                <div className="jp-input-field">
                  <label>Location</label>
                  <input name="location" value={form.location} onChange={handleChange} />
                </div>
                <div className="jp-input-field">
                  <label>Salary</label>
                  <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. ₹5–8 LPA" />
                </div>
              </div>
              <div className="jp-input-field">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} />
              </div>
              <button className="jp-submit-action" onClick={handleSubmit}>Publish Job</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {applyTarget && (
        <ApplyModal
          job={applyTarget}
          onClose={() => setApplyTarget(null)}
          onSuccess={() => {
            fetchMyApps();
            showToast("Application submitted!");
          }}
        />
      )}

      {/* Detail Modal */}
      {detailTarget && (
        <JobDetailModal
          job={detailTarget}
          appliedIds={appliedIds}
          onClose={() => setDetailTarget(null)}
          onApply={(job) => setApplyTarget(job)}
        />
      )}
    </div>
  );
}