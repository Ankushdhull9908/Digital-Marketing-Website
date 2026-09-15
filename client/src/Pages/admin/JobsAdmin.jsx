import React, { useState, useEffect } from "react";
import {  Trash2,Plus,ChevronDown,Edit3 /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del, patch } from "./shared/adminApi";
import { Modal, Badge, ActionBtn, inp, label } from "./shared/AdminUI";



function JobsAdmin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [appsMap, setAppsMap] = useState({});
  const [appsLoading, setAppsLoading] = useState({});
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "Frontend",
    description: "",
    salary: "",
    isActive: true,
  });

  const STATUS_OPTIONS = ["pending", "reviewed", "shortlisted", "rejected"];
  const STATUS_COLOR = {
    pending: "amber",
    reviewed: "blue",
    shortlisted: "green",
    rejected: "red",
  };
  const loadJobs = () =>
    get("/jobs/mine").then((d) => {
      setJobs(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  useEffect(() => {
    loadJobs();
  }, []);

  const toggleExpand = async (jobId) => {
    if (expanded === jobId) {
      setExpanded(null);
      return;
    }
    setExpanded(jobId);
    if (appsMap[jobId]) return;
    setAppsLoading((p) => ({ ...p, [jobId]: true }));
    const apps = await get(`/jobs/${jobId}/applications`);
    setAppsMap((p) => ({ ...p, [jobId]: Array.isArray(apps) ? apps : [] }));
    setAppsLoading((p) => ({ ...p, [jobId]: false }));
  };

  const updateAppStatus = async (jobId, appId, status) => {
    await patch(`/jobs/applications/${appId}/status`, { status });
    setAppsMap((p) => ({
      ...p,
      [jobId]: p[jobId].map((a) => (a._id === appId ? { ...a, status } : a)),
    }));
  };
  const openAdd = () => {
    setForm({
      title: "",
      company: "",
      location: "",
      category: "Frontend",
      description: "",
      salary: "",
      isActive: true,
    });
    setEditId(null);
    setModal("add");
  };
  const openEdit = (job) => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location || "",
      category: job.category,
      description: job.description || "",
      salary: job.salary || "",
      isActive: job.isActive,
    });
    setEditId(job._id);
    setModal("edit");
  };
  const saveJob = async () => {
    if (editId) await put(`/jobs/${editId}`, form);
    else await post("/jobs", form);
    setModal(null);
    loadJobs();
  };
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await del(`/jobs/${id}`);
    loadJobs();
  };
  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">My Posted Jobs</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> Post New Job
          </button>
        </div>
        {loading ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            Loading…
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            No jobs posted yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Job</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Posted</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <React.Fragment key={job._id}>
                  <tr
                    className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer ${expanded === job._id ? "bg-indigo-50/40" : ""}`}
                    onClick={() => toggleExpand(job._id)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {expanded === job._id ? (
                          <ChevronUp size={14} className="text-indigo-500" />
                        ) : (
                          <ChevronDown size={14} className="text-slate-400" />
                        )}
                        <div>
                          <p className="font-semibold text-slate-700">
                            {job.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            {job.company} · {job.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge text={job.category} color="blue" />
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {new Date(job.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        text={job.isActive ? "Active" : "Closed"}
                        color={job.isActive ? "green" : "amber"}
                      />
                    </td>
                    <td
                      className="px-5 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-end gap-1.5">
                        <ActionBtn
                          icon={<Edit3 size={15} />}
                          onClick={() => openEdit(job)}
                        />
                        <ActionBtn
                          icon={<Trash2 size={15} />}
                          danger
                          onClick={() => deleteJob(job._id)}
                        />
                      </div>
                    </td>
                  </tr>
                  {expanded === job._id && (
                    <tr className="border-t border-indigo-100">
                      <td colSpan={5} className="px-0 py-0">
                        <div className="bg-indigo-50/30 px-8 py-4">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                            Applications
                          </p>
                          {appsLoading[job._id] ? (
                            <p className="text-sm text-slate-400">Loading…</p>
                          ) : !appsMap[job._id] ||
                            appsMap[job._id].length === 0 ? (
                            <p className="text-sm text-slate-400">
                              No applications yet.
                            </p>
                          ) : (
                            <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-slate-100">
                              <thead>
                                <tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50">
                                  <th className="px-4 py-2 text-left">
                                    Applicant
                                  </th>
                                  <th className="px-4 py-2 text-left">Email</th>
                                  <th className="px-4 py-2 text-left">
                                    Applied
                                  </th>
                                  <th className="px-4 py-2 text-left">
                                    Resume
                                  </th>
                                  <th className="px-4 py-2 text-left">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {appsMap[job._id].map((app) => (
                                  <tr
                                    key={app._id}
                                    className="hover:bg-slate-50"
                                  >
                                    <td className="px-4 py-3 font-semibold text-slate-700">
                                      {app.applicantName ||
                                        app.applicant?.name ||
                                        "—"}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">
                                      {app.applicantEmail ||
                                        app.applicant?.email ||
                                        "—"}
                                    </td>
                                    <td className="px-4 py-3 text-slate-400 text-xs">
                                      {new Date(
                                        app.createdAt,
                                      ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                      })}
                                    </td>
                                    <td className="px-4 py-3">
                                      {app.resumeUrl ? (
                                        <a
                                          href={app.resumeUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-indigo-600 text-xs font-semibold hover:underline"
                                        >
                                          View ↗
                                        </a>
                                      ) : (
                                        <span className="text-slate-300 text-xs">
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3">
                                      <select
                                        value={app.status}
                                        onChange={(e) =>
                                          updateAppStatus(
                                            job._id,
                                            app._id,
                                            e.target.value,
                                          )
                                        }
                                        className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
                                      >
                                        {STATUS_OPTIONS.map((s) => (
                                          <option key={s} value={s}>
                                            {s.charAt(0).toUpperCase() +
                                              s.slice(1)}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modal && (
        <Modal
          title={modal === "edit" ? "Edit Job" : "Post a New Job"}
          onClose={() => setModal(null)}
          onSave={saveJob}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Job Title *</label>
              <input className={inp} value={form.title} onChange={f("title")} />
            </div>
            <div>
              <label className={label}>Category</label>
              <select
                className={inp}
                value={form.category}
                onChange={f("category")}
              >
                {[
                  "Frontend",
                  "Backend",
                  "Fullstack",
                  "Design",
                  "Marketing",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={label}>Company *</label>
            <input
              className={inp}
              value={form.company}
              onChange={f("company")}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Location</label>
              <input
                className={inp}
                value={form.location}
                onChange={f("location")}
              />
            </div>
            <div>
              <label className={label}>Salary</label>
              <input
                className={inp}
                value={form.salary}
                onChange={f("salary")}
              />
            </div>
          </div>
          <div>
            <label className={label}>Description</label>
            <textarea
              className={inp}
              rows={4}
              value={form.description}
              onChange={f("description")}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="job-active"
              type="checkbox"
              className="w-4 h-4 accent-indigo-600"
              checked={form.isActive}
              onChange={(e) =>
                setForm((p) => ({ ...p, isActive: e.target.checked }))
              }
            />
            <label
              htmlFor="job-active"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Active (visible on job board)
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}

export default JobsAdmin;