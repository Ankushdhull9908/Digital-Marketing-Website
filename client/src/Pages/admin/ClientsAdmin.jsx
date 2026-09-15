import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del} from "./shared/adminApi";
import { Modal, Badge, ActionBtn, inp, label } from "./shared/AdminUI";


function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", logoUrl: "", websiteUrl: "" });
  const [editId, setEditId] = useState(null);

  const load = () => get("/clients").then(setClients);
  useEffect(() => {
    load();
  }, []);
  const openAdd = () => {
    setForm({ name: "", logoUrl: "", websiteUrl: "" });
    setEditId(null);
    setModal("add");
  };
  const openEdit = (c) => {
    setForm({
      name: c.name,
      logoUrl: c.logoUrl,
      websiteUrl: c.websiteUrl || "",
    });
    setEditId(c._id);
    setModal("edit");
  };
  const save = async () => {
    if (editId) await put(`/clients/${editId}`, form);
    else await post("/clients", form);
    setModal(null);
    load();
  };
  const remove = async (id) => {
    await del(`/clients/${id}`);
    load();
  };
  const toggle = async (c) => {
    await put(`/clients/${c._id}`, { isActive: !c.isActive });
    load();
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Client Logos</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
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
            {clients.map((c) => (
              <tr key={c._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {c.logoUrl ? (
                      <img
                        src={c.logoUrl}
                        alt={c.name}
                        className="w-10 h-10 rounded-xl object-contain bg-slate-100 p-1"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-semibold text-slate-700">
                      {c.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-slate-400">
                  {c.websiteUrl || "—"}
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(c)}>
                    <Badge
                      text={c.isActive ? "Active" : "Hidden"}
                      color={c.isActive ? "green" : "amber"}
                    />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn
                      icon={<Edit3 size={15} />}
                      onClick={() => openEdit(c)}
                    />
                    <ActionBtn
                      icon={<Trash2 size={15} />}
                      danger
                      onClick={() => remove(c._id)}
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
          title={modal === "edit" ? "Edit Client" : "Add Client"}
          onClose={() => setModal(null)}
          onSave={save}
        >
          <div>
            <label className={label}>Client Name</label>
            <input
              className={inp}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Company Name"
            />
          </div>
          <ImageUpload
            label="Client Logo"
            value={form.logoUrl}
            onChange={(url) => setForm((p) => ({ ...p, logoUrl: url }))}
            folder="webtech/clients"
          />
          <div>
            <label className={label}>Website URL</label>
            <input
              className={inp}
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              placeholder="https://…"
            />
          </div>
        </Modal>
      )}
    </>
  );
}


export default ClientsAdmin;