import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del} from "./shared/adminApi";

import { Modal, Badge, ActionBtn, StarRating, ImageUpload, inp, label } from "./shared/AdminUI";

function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    text: "",
    avatarUrl: "",
    rating: 5,
    order: 0,
    isActive: true,
  });

  const load = () => get("/testimonials?all=true").then(setItems);
  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm({
      name: "",
      role: "",
      company: "",
      text: "",
      avatarUrl: "",
      rating: 5,
      order: 0,
      isActive: true,
    });
    setEditId(null);
    setModal("add");
  };
  const openEdit = (t) => {
    setForm({
      name: t.name,
      role: t.role,
      company: t.company || "",
      text: t.text,
      avatarUrl: t.avatarUrl || "",
      rating: t.rating,
      order: t.order ?? 0,
      isActive: t.isActive,
    });
    setEditId(t._id);
    setModal("edit");
  };
  const save = async () => {
    const body = {
      ...form,
      rating: Number(form.rating),
      order: Number(form.order),
    };
    if (editId) await put(`/testimonials/${editId}`, body);
    else await post("/testimonials", body);
    setModal(null);
    load();
  };
  const remove = async (id) => {
    await del(`/testimonials/${id}`);
    load();
  };
  const toggle = async (t) => {
    await put(`/testimonials/${t._id}`, { isActive: !t.isActive });
    load();
  };

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const fCheck = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.checked }));
  const initials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Client Testimonials</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> Add Testimonial
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Quote</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-slate-400 text-sm"
                >
                  No testimonials yet.
                </td>
              </tr>
            )}
            {items.map((t) => (
              <tr key={t._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                        {initials(t.name || "?")}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-700">{t.name}</p>
                      <p className="text-xs text-slate-400">
                        {t.role}
                        {t.company ? `, ${t.company}` : ""}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 max-w-xs">
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {t.text}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <StarRating rating={t.rating} />
                </td>
                <td className="px-5 py-4 text-slate-500 text-xs font-mono">
                  {t.order ?? 0}
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(t)}>
                    <Badge
                      text={t.isActive ? "Active" : "Hidden"}
                      color={t.isActive ? "green" : "amber"}
                    />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn
                      icon={<Edit3 size={15} />}
                      onClick={() => openEdit(t)}
                    />
                    <ActionBtn
                      icon={<Trash2 size={15} />}
                      danger
                      onClick={() => remove(t._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal
          title={modal === "edit" ? "Edit Testimonial" : "Add Testimonial"}
          onClose={() => setModal(null)}
          onSave={save}
        >
          <div>
            <label className={label}>Client Name *</label>
            <input
              className={inp}
              value={form.name}
              onChange={f("name")}
              placeholder="John Smith"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Role *</label>
              <input
                className={inp}
                value={form.role}
                onChange={f("role")}
                placeholder="Marketing Director"
              />
            </div>
            <div>
              <label className={label}>Company</label>
              <input
                className={inp}
                value={form.company}
                onChange={f("company")}
                placeholder="Acme Corp"
              />
            </div>
          </div>
          <div>
            <label className={label}>Testimonial Text *</label>
            <textarea
              className={inp}
              rows={4}
              value={form.text}
              onChange={f("text")}
            />
          </div>
          <ImageUpload
            label="Avatar Photo"
            value={form.avatarUrl}
            onChange={(url) => setForm((p) => ({ ...p, avatarUrl: url }))}
            folder="webtech/testimonials"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Rating</label>
              <select
                className={inp}
                value={form.rating}
                onChange={f("rating")}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)} ({n})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Display Order</label>
              <input
                type="number"
                className={inp}
                value={form.order}
                onChange={f("order")}
                min={0}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="t-active"
              type="checkbox"
              checked={form.isActive}
              onChange={fCheck("isActive")}
              className="w-4 h-4 accent-indigo-600"
            />
            <label
              htmlFor="t-active"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Show on website
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TestimonialsAdmin;