import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del} from "./shared/adminApi";
import { Modal, Badge, ActionBtn, inp, label } from "./shared/AdminUI";


function FAQAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "general",
  });
  const [editId, setEditId] = useState(null);

  const load = () => get("/faqs?all=true").then(setFaqs);
  useEffect(() => {
    load();
  }, []);
  const openAdd = () => {
    setForm({ question: "", answer: "", category: "general" });
    setEditId(null);
    setModal("add");
  };
  const openEdit = (f) => {
    setForm({
      question: f.question,
      answer: f.answer,
      category: f.category,
      isActive: f.isActive,
    });
    setEditId(f._id);
    setModal("edit");
  };
  const save = async () => {
    if (editId) await put(`/faqs/${editId}`, form);
    else await post("/faqs", form);
    setModal(null);
    load();
  };
  const remove = async (id) => {
    await del(`/faqs/${id}`);
    load();
  };
  const toggle = async (f) => {
    await put(`/faqs/${f._id}`, { isActive: !f.isActive });
    load();
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">All FAQs</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
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
            {faqs.map((f) => (
              <tr key={f._id} className="hover:bg-slate-50">
                <td className="px-5 py-4 max-w-xs">
                  <p className="font-semibold text-slate-700 truncate">
                    {f.question}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {f.answer}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <Badge text={f.category} color="blue" />
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(f)}>
                    <Badge
                      text={f.isActive ? "Active" : "Hidden"}
                      color={f.isActive ? "green" : "amber"}
                    />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn
                      icon={<Edit3 size={15} />}
                      onClick={() => openEdit(f)}
                    />
                    <ActionBtn
                      icon={<Trash2 size={15} />}
                      danger
                      onClick={() => remove(f._id)}
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
          title={modal === "edit" ? "Edit FAQ" : "Add FAQ"}
          onClose={() => setModal(null)}
          onSave={save}
        >
          <div>
            <label className={label}>Question</label>
            <input
              className={inp}
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="What is…"
            />
          </div>
          <div>
            <label className={label}>Answer</label>
            <textarea
              className={inp}
              rows={3}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Category</label>
            <select
              className={inp}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
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

export default FAQAdmin;
