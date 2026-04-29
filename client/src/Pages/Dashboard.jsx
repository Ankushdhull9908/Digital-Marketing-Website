import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, FileText, BarChart3, LogOut, Plus, HelpCircle,
  Users, Package, Mail, Edit3, Trash2, Eye, X, Check, ChevronDown
} from "lucide-react";

var API = "https://digital-marketing-temp.onrender.com/api" ? "https://digital-marketing-temp.onrender.com/api": "http://localhost:5000/api"

// ─── tiny fetch helpers ────────────────────────────────────────────────────
const get  = (url)        => fetch(API + url).then(r => r.json());
const post = (url, body)  => fetch(API + url, { method:"POST",  headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());
const put  = (url, body)  => fetch(API + url, { method:"PUT",   headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());
const del  = (url)        => fetch(API + url, { method:"DELETE" }).then(r => r.json());
const patch= (url, body)  => fetch(API + url, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());

// ─── shared badge ─────────────────────────────────────────────────────────
function Badge({ text, color }) {
  const map = {
    green:  "bg-green-100 text-green-700",
    amber:  "bg-amber-100 text-amber-700",
    blue:   "bg-blue-100 text-blue-700",
    red:    "bg-red-100 text-red-700",
    slate:  "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${map[color] || map.slate}`}>
      {text}
    </span>
  );
}

// ─── modal ────────────────────────────────────────────────────────────────
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
        <div className="px-6 py-5 space-y-4">{children}</div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">Cancel</button>
          <button onClick={onSave}  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 flex items-center gap-1.5"><Check size={15} /> Save</button>
        </div>
      </div>
    </div>
  );
}

// shared input/textarea/select classes
const inp = "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 bg-slate-50";

// ─── FAQ PANEL ────────────────────────────────────────────────────────────
function FAQPanel() {
  const [faqs, setFaqs]   = useState([]);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm]   = useState({ question:"", answer:"", category:"general" });
  const [editId, setEditId] = useState(null);

  const load = () => get("/faqs?all=true").then(setFaqs);
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm({ question:"", answer:"", category:"general" }); setEditId(null); setModal("add"); };
  const openEdit = (f)  => { setForm({ question: f.question, answer: f.answer, category: f.category, isActive: f.isActive }); setEditId(f._id); setModal("edit"); };

  const save = async () => {
    if (editId) await put(`/faqs/${editId}`, form);
    else        await post("/faqs", form);
    setModal(null); load();
  };

  const remove = async (id) => { await del(`/faqs/${id}`); load(); };
  const toggle = async (f)  => { await put(`/faqs/${f._id}`, { isActive: !f.isActive }); load(); };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">All FAQs</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700">
            <Plus size={15} /> Add FAQ
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Question</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {faqs.map(f => (
              <tr key={f._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 max-w-xs">
                  <p className="font-semibold text-slate-700 truncate">{f.question}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{f.answer}</p>
                </td>
                <td className="px-5 py-4"><Badge text={f.category} color="blue" /></td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(f)}>
                    <Badge text={f.isActive ? "Active" : "Hidden"} color={f.isActive ? "green" : "amber"} />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn icon={<Edit3 size={15} />} onClick={() => openEdit(f)} />
                    <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(f._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "edit" ? "Edit FAQ" : "Add FAQ"} onClose={() => setModal(null)} onSave={save}>
          <div><label className="label-sm">Question</label><input className={inp} value={form.question} onChange={e => setForm({...form, question: e.target.value})} placeholder="What is..." /></div>
          <div><label className="label-sm">Answer</label><textarea className={inp} rows={3} value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} placeholder="Detailed answer..." /></div>
          <div><label className="label-sm">Category</label>
            <select className={inp} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="general">General</option>
              <option value="seo">SEO</option>
              <option value="pricing">Pricing</option>
              <option value="web">Web</option>
            </select>
          </div>
        </Modal>
      )}
    </>
  );
}

// ─── CLIENTS PANEL ────────────────────────────────────────────────────────
function ClientsPanel() {
  const [clients, setClients] = useState([]);
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState({ name:"", logoUrl:"", websiteUrl:"" });
  const [editId, setEditId]   = useState(null);

  const load = () => get("/clients").then(setClients);
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm({ name:"", logoUrl:"", websiteUrl:"" }); setEditId(null); setModal("add"); };
  const openEdit = (c)  => { setForm({ name: c.name, logoUrl: c.logoUrl, websiteUrl: c.websiteUrl||"" }); setEditId(c._id); setModal("edit"); };

  const save = async () => {
    if (editId) await put(`/clients/${editId}`, form);
    else        await post("/clients", form);
    setModal(null); load();
  };

  const remove = async (id) => { await del(`/clients/${id}`); load(); };
  const toggle = async (c)  => { await put(`/clients/${c._id}`, { isActive: !c.isActive }); load(); };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Client Logos</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700">
            <Plus size={15} /> Add Client
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Website</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map(c => (
              <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-700">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-slate-400">{c.websiteUrl || "—"}</td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(c)}>
                    <Badge text={c.isActive ? "Active" : "Hidden"} color={c.isActive ? "green" : "amber"} />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn icon={<Edit3 size={15} />} onClick={() => openEdit(c)} />
                    <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(c._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "edit" ? "Edit Client" : "Add Client Logo"} onClose={() => setModal(null)} onSave={save}>
          <div><label className="label-sm">Client Name</label><input className={inp} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Company Name" /></div>
          <div><label className="label-sm">Logo URL</label><input className={inp} value={form.logoUrl} onChange={e => setForm({...form, logoUrl: e.target.value})} placeholder="https://..." /></div>
          <div><label className="label-sm">Website URL (optional)</label><input className={inp} value={form.websiteUrl} onChange={e => setForm({...form, websiteUrl: e.target.value})} placeholder="https://..." /></div>
        </Modal>
      )}
    </>
  );
}

// ─── PACKAGES PANEL ───────────────────────────────────────────────────────
function PackagesPanel() {
  const [pkgs, setPkgs]   = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({
    title: "",
    price: "",
    billingCycle: "monthly",
    suffix: "",
    description: "",
    features: "",
    featured: false,
    badge: "",
  });
  const [editId, setEditId] = useState(null);
 
  const load = () => get("/packages?all=true").then(setPkgs);
  useEffect(() => { load(); }, []);
 
  const openAdd = () => {
    setForm({
      title: "",
      price: "",
      billingCycle: "monthly",
      suffix: "",
      description: "",
      features: "",
      featured: false,
      badge: "",
    });
    setEditId(null);
    setModal("add");
  };
 
  const openEdit = (p) => {
    setForm({
      title: p.title,
      price: p.price,
      billingCycle: p.billingCycle,
      suffix: p.suffix || "",
      description: p.description || "",
      features: p.features.join(", "),
      featured: p.featured || false,
      badge: p.badge || "",
    });
    setEditId(p._id);
    setModal("edit");
  };
 
  const save = async () => {
    const body = {
      ...form,
      price: Number(form.price),
      features: form.features.split(",").map(s => s.trim()).filter(Boolean),
      featured: Boolean(form.featured),
    };
    if (editId) await put(`/packages/${editId}`, body);
    else        await post("/packages", body);
    setModal(null);
    load();
  };
 
  const remove = async (id) => { await del(`/packages/${id}`); load(); };
  const toggle = async (p)  => { await put(`/packages/${p._id}`, { isActive: !p.isActive }); load(); };
 
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Pricing Packages</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> Add Package
          </button>
        </div>
 
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Package</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Suffix</th>
              <th className="px-5 py-3">Billing</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3">Features</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pkgs.map(p => (
              <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-700">
                    {p.title}{" "}
                    {p.badge && <Badge text={p.badge} color="red" />}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.description}</p>
                </td>
                <td className="px-5 py-4 font-bold text-slate-700">
                  ₹{p.price.toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4 text-slate-500 text-xs">
                  {p.suffix || <span className="text-slate-300">—</span>}
                </td>
                <td className="px-5 py-4">
                  <Badge text={p.billingCycle} color="blue" />
                </td>
                <td className="px-5 py-4">
                  {p.featured
                    ? <Badge text="Popular" color="amber" />
                    : <span className="text-slate-300 text-xs">—</span>}
                </td>
                <td className="px-5 py-4 text-xs text-slate-500">
                  {p.features.slice(0, 2).join(", ")}{p.features.length > 2 ? "…" : ""}
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
        >
          {/* Title */}
          <div>
            <label className="label-sm">Title</label>
            <input
              className={inp}
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Social Media Management"
            />
          </div>
 
          {/* Price + Billing Cycle */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-sm">Price (₹)</label>
              <input
                className={inp}
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="4000"
              />
            </div>
            <div>
              <label className="label-sm">Billing Cycle</label>
              <select
                className={inp}
                value={form.billingCycle}
                onChange={e => setForm({ ...form, billingCycle: e.target.value })}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>
 
          {/* Suffix — shown after price on the card */}
          <div>
            <label className="label-sm">Price Suffix (e.g. "/ month" or leave blank for "/-")</label>
            <input
              className={inp}
              value={form.suffix}
              onChange={e => setForm({ ...form, suffix: e.target.value })}
              placeholder="/ month"
            />
          </div>
 
          {/* Description */}
          <div>
            <label className="label-sm">Description</label>
            <input
              className={inp}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="We manage your social media platforms..."
            />
          </div>
 
          {/* Features */}
          <div>
            <label className="label-sm">Features (comma-separated)</label>
            <input
              className={inp}
              value={form.features}
              onChange={e => setForm({ ...form, features: e.target.value })}
              placeholder="Post Creation, Monthly Calendar, 12–15 Posts"
            />
          </div>
 
          {/* Featured toggle */}
          <div className="flex items-center gap-3">
            <input
              id="featured-toggle"
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
            />
            <label htmlFor="featured-toggle" className="label-sm cursor-pointer">
              Mark as <span className="text-amber-500 font-bold">Popular</span> (shows orange "Popular" badge on card)
            </label>
          </div>
 
          {/* Optional badge label */}
          <div>
            <label className="label-sm">Extra Badge Label (optional, e.g. HOT)</label>
            <input
              className={inp}
              value={form.badge}
              onChange={e => setForm({ ...form, badge: e.target.value })}
              placeholder="HOT"
            />
          </div>
        </Modal>
      )}
    </>
  );
}

// ─── CONTACTS PANEL ───────────────────────────────────────────────────────
function ContactsPanel() {
  const [contacts, setContacts] = useState([]);
  const [viewing, setViewing]   = useState(null);

  const load = () => get("/contact").then(setContacts);
  useEffect(() => { load(); }, []);

  const remove = async (id) => { await del(`/contact/${id}`); load(); };
  const updateStatus = async (id, status) => {
    await patch(`/contact/${id}/status`, { status });
    load();
  };

  const statusColor = { new:"red", seen:"amber", replied:"green" };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Contact Submissions</h3>
          <span className="text-xs text-slate-400 font-medium">{contacts.filter(c => c.status === "new").length} unread</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contacts.map(c => (
              <tr key={c._id} className={`hover:bg-slate-50 transition-colors ${c.status === "new" ? "bg-indigo-50/30" : ""}`}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-700">{c.fullName}</p>
                  <p className="text-xs text-slate-400">{c.phone || "—"}</p>
                </td>
                <td className="px-5 py-4 text-slate-500">{c.email}</td>
                <td className="px-5 py-4">{c.subject ? <Badge text={c.subject} color="blue" /> : "—"}</td>
                <td className="px-5 py-4 max-w-xs">
                  <p className="text-xs text-slate-500 truncate">{c.message}</p>
                </td>
                <td className="px-5 py-4">
                  <select
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-indigo-400"
                  >
                    <option value="new">New</option>
                    <option value="seen">Seen</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn icon={<Eye size={15} />} onClick={() => setViewing(c)} />
                    <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(c._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <Modal title={`Message from ${viewing.fullName}`} onClose={() => setViewing(null)} onSave={() => { updateStatus(viewing._id, "replied"); setViewing(null); }}>
          <div className="text-xs text-slate-500 flex gap-3 flex-wrap">
            <span>{viewing.email}</span>
            {viewing.phone && <span>{viewing.phone}</span>}
            {viewing.subject && <Badge text={viewing.subject} color="blue" />}
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">
            {viewing.message}
          </div>
          <p className="text-xs text-slate-400 text-center">Clicking Save will mark this as Replied.</p>
        </Modal>
      )}
    </>
  );
}

// ─── shared action button ──────────────────────────────────────────────────
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

// ─── OVERVIEW STAT CARD ───────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color }) {
  const colors = {
    indigo: "text-indigo-600", blue: "text-blue-600",
    purple: "text-purple-600", green: "text-green-600",
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold mt-1 text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 mt-2">{sub}</p>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────
function Dashboard() {
  const navigate    = useNavigate();
  const [tab, setTab] = useState("overview");

  const logout = () => { localStorage.removeItem("token"); navigate("/"); };

  const nav = [
    { id:"overview",  label:"Dashboard",    icon:<LayoutDashboard size={18} /> },
    { id:"faqs",      label:"FAQs",         icon:<HelpCircle size={18} /> },
    { id:"clients",   label:"Clients",      icon:<Users size={18} /> },
    { id:"packages",  label:"Packages",     icon:<Package size={18} /> },
    { id:"contacts",  label:"Contacts",     icon:<Mail size={18} /> },
    { id:"pages",     label:"My Pages",     icon:<FileText size={18} /> },
    { id:"analytics", label:"Analytics",    icon:<BarChart3 size={18} /> },
  ];

  const pages = [
    { name: "Gym Landing Page",     url: "/page/gym",        date: "12 Apr 2026", status: "Published" },
    { name: "Marketing Campaign",   url: "/page/marketing",  date: "10 Apr 2026", status: "Draft" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">

      {/* ── Sidebar ── */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">WebTech</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${
                tab === n.id
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {n.icon} {n.label}
              {n.id === "contacts" && <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">2</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="bg-white border-b border-slate-200 flex justify-between items-center px-8 py-4 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800 capitalize">{tab === "overview" ? "Overview" : tab}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {tab === "overview" && "Welcome back — here's what's happening."}
              {tab === "faqs"     && "Manage homepage FAQ section."}
              {tab === "clients"  && "Add and manage client logos on the homepage."}
              {tab === "packages" && "Control pricing plans shown on the homepage."}
              {tab === "contacts" && "View and respond to messages from users."}
              {tab === "pages"    && "Your published landing pages."}
              {tab === "analytics"&& "Site performance overview."}
            </p>
          </div>
        </header>

        <main className="p-8 overflow-y-auto flex-1">

          {/* OVERVIEW */}
          {tab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Pages"   value="12"    sub="+2 from last month"   icon={<FileText size={48} />}   color="indigo" />
                <StatCard label="Total Views"   value="3,240" sub="+12.5% increase"       icon={<BarChart3 size={48} />}  color="blue"   />
                <StatCard label="Conversions"   value="320"   sub="Avg. 9.8% rate"        icon={<Package size={48} />}    color="purple" />
                <StatCard label="New Messages"  value="2"     sub="Unread contact forms"  icon={<Mail size={48} />}       color="green"  />
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">Your Landing Pages</h3>
                  <button className="text-sm text-indigo-600 font-semibold hover:underline" onClick={() => setTab("pages")}>View All</button>
                </div>
                <table className="w-full text-left">
                  <thead><tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50/50">
                    <th className="px-6 py-4">Page Name</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Created</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {pages.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-4"><p className="font-bold text-slate-700">{p.name}</p><p className="text-xs text-slate-400">{p.url}</p></td>
                        <td className="px-6 py-4"><Badge text={p.status} color={p.status === "Published" ? "green" : "amber"} /></td>
                        <td className="px-6 py-4 text-sm text-slate-500">{p.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "faqs"      && <FAQPanel />}
          {tab === "clients"   && <ClientsPanel />}
          {tab === "packages"  && <PackagesPanel />}
          {tab === "contacts"  && <ContactsPanel />}

          {tab === "pages" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Landing Pages</h3>
                <button onClick={() => navigate("/create")} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"><Plus size={15}/> Create New</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead><tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50/50">
                  <th className="px-5 py-3">Page</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th><th className="px-5 py-3 text-right">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {pages.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-5 py-4"><p className="font-semibold text-slate-700">{p.name}</p><p className="text-xs text-slate-400">{p.url}</p></td>
                      <td className="px-5 py-4"><Badge text={p.status} color={p.status === "Published" ? "green" : "amber"} /></td>
                      <td className="px-5 py-4 text-slate-500">{p.date}</td>
                      <td className="px-5 py-4"><div className="flex justify-end gap-1.5"><ActionBtn icon={<Eye size={15}/>} /><ActionBtn icon={<Edit3 size={15}/>} /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "analytics" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
              <BarChart3 size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Analytics integration coming soon.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
