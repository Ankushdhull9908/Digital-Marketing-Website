import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del, patch } from "./shared/adminApi";
import { Modal, Badge, ActionBtn, ImageUpload, StarRating, inp, label } from "./shared/AdminUI";
import { Eye } from "lucide-react";

function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [viewing, setViewing] = useState(null);
  const load = () => get("/contact").then(setContacts);
  useEffect(() => {
    load();
  }, []);
  const remove = async (id) => {
    await del(`/contact/${id}`);
    load();
  };
  const updateStatus = async (id, status) => {
    await patch(`/contact/${id}/status`, { status });
    load();
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Contact Submissions</h3>
          <span className="text-xs text-slate-400">
            {contacts.filter((c) => c.status === "new").length} unread
          </span>
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
            {contacts.map((c) => (
              <tr
                key={c._id}
                className={`hover:bg-slate-50 ${c.status === "new" ? "bg-indigo-50/30" : ""}`}
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-700">{c.fullName}</p>
                  <p className="text-xs text-slate-400">{c.phone || "—"}</p>
                </td>
                <td className="px-5 py-4 text-slate-500">{c.email}</td>
                <td className="px-5 py-4">
                  {c.subject ? <Badge text={c.subject} color="blue" /> : "—"}
                </td>
                <td className="px-5 py-4 max-w-xs">
                  <p className="text-xs text-slate-500 truncate">{c.message}</p>
                </td>
                <td className="px-5 py-4">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
                    className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="seen">Seen</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <ActionBtn
                      icon={<Eye size={15} />}
                      onClick={() => setViewing(c)}
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
      {viewing && (
        <Modal
          title={`Message from ${viewing.fullName}`}
          onClose={() => setViewing(null)}
          onSave={() => {
            updateStatus(viewing._id, "replied");
            setViewing(null);
          }}
        >
          <div className="text-xs text-slate-500 flex gap-3 flex-wrap">
            <span>{viewing.email}</span>
            {viewing.phone && <span>{viewing.phone}</span>}
            {viewing.subject && <Badge text={viewing.subject} color="blue" />}
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">
            {viewing.message}
          </div>
          <p className="text-xs text-slate-400 text-center">
            Save will mark as Replied.
          </p>
        </Modal>
      )}
    </>
  );
}


export default ContactsAdmin;