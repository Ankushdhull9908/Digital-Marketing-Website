import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Check } from "lucide-react";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://digital-marketing-temp.onrender.com/api";

const get = (url) => fetch(API + url).then((r) => r.json());
const post = (url, body) =>
  fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());
const put = (url, body) =>
  fetch(API + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());
const del = (url) => fetch(API + url, { method: "DELETE" }).then((r) => r.json());

const inp =
  "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 bg-slate-50";
const label = "block text-xs font-semibold text-slate-500 mb-1";

function Badge({ text, color }) {
  const map = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${map[color] || map.slate}`}>
      {text}
    </span>
  );
}

function ActionBtn({ icon, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border transition-colors ${
        danger
          ? "border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          : "border-slate-200 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
      }`}
    >
      {icon}
    </button>
  );
}

function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto">{children}</div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50"
          >
            Cancel
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 flex items-center gap-1.5"
            >
              <Check size={15} /> Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const emptyForm = {
  title: "",
  department: "Engineering",
  type: "Full-Time",
  location: "",
  salary: "",
  summary: "",
  requirements: "",
  order: 0,
  isActive: true,
};

const CareerAdmin = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "add" | "edit"
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () =>
    get("/career?all=true").then((d) => {
      setOpenings(Array.isArray(d) ? d : []);
      setLoading(false);
    });

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm({ ...emptyForm, order: openings.length });
    setEditId(null);
    setModal("form");
  };

  const openEdit = (o) => {
    setForm({
      title: o.title,
      department: o.department,
      type: o.type || "Full-Time",
      location: o.location || "",
      salary: o.salary || "",
      summary: o.summary || "",
      requirements: (o.requirements || []).join("\n"),
      order: o.order ?? 0,
      isActive: o.isActive,
    });
    setEditId(o._id);
    setModal("form");
  };

  const save = async () => {
    const body = {
      ...form,
      order: Number(form.order),
      requirements: form.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
    };
    if (editId) await put(`/career/${editId}`, body);
    else await post("/career", body);
    setModal(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this opening permanently?")) return;
    await del(`/career/${id}`);
    load();
  };

  const toggle = async (o) => {
    await put(`/career/${o._id}`, { isActive: !o.isActive });
    load();
  };

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const fCheck = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.checked }));

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">Career Openings</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {openings.length} total · {openings.filter((o) => o.isActive).length} live on the Career page
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> Add Opening
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-400 text-sm">Loading…</div>
        ) : openings.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">No openings yet. Add your first one!</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {openings.map((o) => (
                <tr key={o._id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-700">{o.title}</p>
                    <p className="text-xs text-slate-400">{o.salary || "Salary not listed"}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge text={o.department} color="blue" />
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">{o.location || "—"}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{o.type}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggle(o)}>
                      <Badge text={o.isActive ? "Live" : "Hidden"} color={o.isActive ? "green" : "amber"} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <ActionBtn icon={<Edit3 size={15} />} onClick={() => openEdit(o)} />
                      <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(o._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal === "form" && (
        <Modal title={editId ? "Edit Opening" : "Add Opening"} onClose={() => setModal(null)} onSave={save}>
          <div>
            <label className={label}>Job Title *</label>
            <input
              className={inp}
              value={form.title}
              onChange={f("title")}
              placeholder="Senior Front-End Engineer (React)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Department *</label>
              <input
                className={inp}
                value={form.department}
                onChange={f("department")}
                placeholder="Engineering"
              />
            </div>
            <div>
              <label className={label}>Type</label>
              <input className={inp} value={form.type} onChange={f("type")} placeholder="Full-Time" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Location</label>
              <input className={inp} value={form.location} onChange={f("location")} placeholder="Remote (India)" />
            </div>
            <div>
              <label className={label}>Salary</label>
              <input className={inp} value={form.salary} onChange={f("salary")} placeholder="₹18L - ₹24L" />
            </div>
          </div>

          <div>
            <label className={label}>Role Overview</label>
            <textarea className={inp} rows={3} value={form.summary} onChange={f("summary")} />
          </div>

          <div>
            <label className={label}>Requirements (one per line)</label>
            <textarea
              className={inp}
              rows={4}
              value={form.requirements}
              onChange={f("requirements")}
              placeholder={"3+ years production React experience\nExpert knowledge of Tailwind CSS"}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className={label}>Display Order</label>
              <input type="number" className={inp} value={form.order} onChange={f("order")} min={0} />
            </div>
            <div className="flex items-center gap-3 pb-2">
              <input
                id="opening-active"
                type="checkbox"
                className="w-4 h-4 accent-indigo-600"
                checked={form.isActive}
                onChange={fCheck("isActive")}
              />
              <label htmlFor="opening-active" className="text-sm text-slate-600 cursor-pointer">
                Live on Career page
              </label>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CareerAdmin;