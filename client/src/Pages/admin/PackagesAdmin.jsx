import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del} from "./shared/adminApi";
import { Modal, Badge, ActionBtn, inp, label } from "./shared/AdminUI";



function PackagesAdmin() {
  const [pkgs, setPkgs] = useState([]);
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    suffix: "",
    featured: false,
    badge: "",
    isActive: true,
    order: 0,
    prices: { Monthly: "", Quarterly: "", HalfYearly: "", Yearly: "" },
    features: "",
  });

  const load = () => get("/packages?all=true").then(setPkgs);
  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm({
      title: "",
      description: "",
      suffix: "",
      featured: false,
      badge: "",
      isActive: true,
      order: 0,
      prices: { Monthly: "", Quarterly: "", HalfYearly: "", Yearly: "" },
      features: "",
    });
    setEditId(null);
    setModal("add");
  };

  const openEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description || "",
      suffix: p.suffix || "",
      featured: p.featured || false,
      badge: p.badge || "",
      isActive: p.isActive,
      order: p.order ?? 0,
      prices: {
        Monthly: p.prices?.Monthly ?? p.price ?? "",
        Quarterly: p.prices?.Quarterly ?? "",
        HalfYearly: p.prices?.HalfYearly ?? "",
        Yearly: p.prices?.Yearly ?? "",
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
        Monthly: Number(form.prices.Monthly) || 0,
        Quarterly: Number(form.prices.Quarterly) || 0,
        HalfYearly: Number(form.prices.HalfYearly) || 0,
        Yearly: Number(form.prices.Yearly) || 0,
      },
      features: form.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      featured: Boolean(form.featured),
      order: Number(form.order),
    };
    if (editId) await put(`/packages/${editId}`, body);
    else await post("/packages", body);
    setModal(null);
    load();
  };

  const remove = async (id) => {
    await del(`/packages/${id}`);
    load();
  };
  const toggle = async (p) => {
    await put(`/packages/${p._id}`, { isActive: !p.isActive });
    load();
  };

  const setPrice = (cycle, val) =>
    setForm((prev) => ({ ...prev, prices: { ...prev.prices, [cycle]: val } }));

  const CYCLES = ["Monthly", "Quarterly", "HalfYearly", "Yearly"];
  const CYCLE_LABELS = {
    Monthly: "Monthly (1 mo)",
    Quarterly: "Quarterly (3 mo)",
    HalfYearly: "Half Yearly (6 mo)",
    Yearly: "Yearly (12 mo)",
  };

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
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-slate-400 text-sm"
                >
                  No packages yet.
                </td>
              </tr>
            )}
            {pkgs.map((p) => (
              <tr key={p._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-700">
                    {p.title} {p.badge && <Badge text={p.badge} color="red" />}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {p.description}
                  </p>
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
                  {p.featured ? (
                    <Badge text="Popular" color="amber" />
                  ) : (
                    <span className="text-slate-300 text-xs">—</span>
                  )}
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
                    <ActionBtn
                      icon={<Edit3 size={15} />}
                      onClick={() => openEdit(p)}
                    />
                    <ActionBtn
                      icon={<Trash2 size={15} />}
                      danger
                      onClick={() => remove(p._id)}
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
          title={modal === "edit" ? "Edit Package" : "Add Package"}
          onClose={() => setModal(null)}
          onSave={save}
          wide
        >
          {/* Basic info */}
          <div>
            <label className={label}>Package Title *</label>
            <input
              className={inp}
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="e.g. Standard"
            />
          </div>
          <div>
            <label className={label}>Description</label>
            <input
              className={inp}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Ideal for growing startups."
            />
          </div>

          {/* Prices grid */}
          <div>
            <label className={label}>Prices (₹) per Billing Cycle</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {CYCLES.map((cycle) => (
                <div key={cycle}>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                    {CYCLE_LABELS[cycle]}
                  </label>
                  <input
                    type="number"
                    className={inp}
                    value={form.prices[cycle]}
                    onChange={(e) => setPrice(cycle, e.target.value)}
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
              onChange={(e) =>
                setForm((p) => ({ ...p, features: e.target.value }))
              }
              placeholder="5 Social Media Posts, Basic SEO, Email Support"
            />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Price Suffix (optional)</label>
              <input
                className={inp}
                value={form.suffix}
                onChange={(e) =>
                  setForm((p) => ({ ...p, suffix: e.target.value }))
                }
                placeholder="/ month"
              />
            </div>
            <div>
              <label className={label}>Display Order</label>
              <input
                type="number"
                className={inp}
                value={form.order}
                onChange={(e) =>
                  setForm((p) => ({ ...p, order: e.target.value }))
                }
                min={0}
              />
            </div>
          </div>

          <div>
            <label className={label}>Extra Badge (optional)</label>
            <input
              className={inp}
              value={form.badge}
              onChange={(e) =>
                setForm((p) => ({ ...p, badge: e.target.value }))
              }
              placeholder="HOT"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <input
                id="feat-tog"
                type="checkbox"
                className="w-4 h-4 accent-indigo-600"
                checked={form.featured}
                onChange={(e) =>
                  setForm((p) => ({ ...p, featured: e.target.checked }))
                }
              />
              <label
                htmlFor="feat-tog"
                className="text-sm text-slate-600 cursor-pointer"
              >
                Mark as{" "}
                <span className="text-amber-500 font-bold">Popular</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="pkg-active"
                type="checkbox"
                className="w-4 h-4 accent-indigo-600"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isActive: e.target.checked }))
                }
              />
              <label
                htmlFor="pkg-active"
                className="text-sm text-slate-600 cursor-pointer"
              >
                Active (visible on site)
              </label>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
export default PackagesAdmin;