import { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Image as ImageIcon, Video } from "lucide-react";
import { get, post, put, del,} from "./shared/adminApi";
import { Modal, Badge, ActionBtn, ImageUpload, inp, label } from "./shared/AdminUI";


// Must match the keys used in ICON_MAP on the public IndustriesWeWorkWith page.
const ICON_OPTIONS = [
  "GraduationCap", "Utensils", "ShoppingCart", "Building2", "Briefcase",
  "Users", "Award", "Rocket", "Target", "BarChart3", "CheckCircle2", "Star",
];

const emptyImage = () => ({ src: "", caption: "" });
const emptyVideo = () => ({ src: "", poster: "", caption: "" });

const emptyForm = () => ({
  slug: "",
  label: "",
  iconName: "Briefcase",
  accent: "#F39221",
  description: "",
  tags: "",
  images: [emptyImage(), emptyImage(), emptyImage()],
  videos: [emptyVideo()],
  order: 0,
  isActive: true,
});

const IndustriesAdmin = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "form"
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState(null);

  const load = () =>
    get("/industries?all=true").then((d) => {
      setIndustries(Array.isArray(d) ? d : []);
      setLoading(false);
    });

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm(emptyForm());
    setEditId(null);
    setError(null);
    setModal("form");
  };

  const openEdit = (ind) => {
    setForm({
      slug: ind.slug,
      label: ind.label,
      iconName: ind.iconName,
      accent: ind.accent,
      description: ind.description,
      tags: (ind.tags || []).join(", "),
      images: ind.images?.length ? ind.images : [emptyImage(), emptyImage(), emptyImage()],
      videos: ind.videos?.length ? ind.videos : [emptyVideo()],
      order: ind.order ?? 0,
      isActive: ind.isActive,
    });
    setEditId(ind._id);
    setError(null);
    setModal("form");
  };

  const save = async () => {
    setError(null);
    if (!form.slug || !form.label || !form.description) {
      setError("Slug, label, and description are required.");
      return;
    }
    if (form.images.filter((i) => i.src).length < 3) {
      setError("At least 3 images are required (1 feature + 2 side tiles).");
      return;
    }

    const body = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
      images: form.images.filter((i) => i.src),
      videos: form.videos.filter((v) => v.src && v.poster),
    };

    try {
      if (editId) await put(`/industries/${editId}`, body);
      else await post("/industries", body);
      setModal(null);
      load();
    } catch (err) {
      setError("Failed to save. Check your connection and try again.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this industry section? This cannot be undone.")) return;
    await del(`/industries/${id}`);
    load();
  };

  const toggle = async (ind) => {
    await put(`/industries/${ind._id}`, { isActive: !ind.isActive });
    load();
  };

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const updateImage = (i, field, value) =>
    setForm((p) => {
      const images = [...p.images];
      images[i] = { ...images[i], [field]: value };
      return { ...p, images };
    });
  const addImage = () => setForm((p) => ({ ...p, images: [...p.images, emptyImage()] }));
  const removeImage = (i) => setForm((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }));

  const updateVideo = (i, field, value) =>
    setForm((p) => {
      const videos = [...p.videos];
      videos[i] = { ...videos[i], [field]: value };
      return { ...p, videos };
    });
  const addVideo = () => setForm((p) => ({ ...p, videos: [...p.videos, emptyVideo()] }));
  const removeVideo = (i) => setForm((p) => ({ ...p, videos: p.videos.filter((_, idx) => idx !== i) }));

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Industries We Work With</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage each industry section shown on the public Industries page.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">All Industries ({industries.length})</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> Add Industry
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-400 text-sm">Loading…</div>
        ) : industries.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">No industries yet.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Industry</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Tags</th>
                <th className="px-5 py-3">Media</th>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {industries.map((ind) => (
                <tr key={ind._id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0"
                        style={{ background: `${ind.accent}22`, color: ind.accent }}
                      >
                        {ind.iconName.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">{ind.label}</p>
                        <p className="text-xs text-slate-400">{ind.description.slice(0, 50)}…</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-slate-500">{ind.slug}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {(ind.tags || []).slice(0, 2).join(", ")}
                    {(ind.tags || []).length > 2 && ` +${ind.tags.length - 2}`}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><ImageIcon size={12} /> {ind.images?.length || 0}</span>
                      <span className="flex items-center gap-1"><Video size={12} /> {ind.videos?.length || 0}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-slate-500">{ind.order}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggle(ind)}>
                      <Badge text={ind.isActive ? "Active" : "Hidden"} color={ind.isActive ? "green" : "amber"} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <ActionBtn icon={<Edit3 size={15} />} onClick={() => openEdit(ind)} />
                      <ActionBtn icon={<Trash2 size={15} />} danger onClick={() => remove(ind._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal === "form" && (
        <Modal
          title={editId ? "Edit Industry" : "Add Industry"}
          onClose={() => setModal(null)}
          onSave={save}
          wide
        >
          {error && <div className="alert alert-error text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Slug * (used in the URL anchor, e.g. "education")</label>
              <input className={inp} value={form.slug} onChange={f("slug")} placeholder="education" />
            </div>
            <div>
              <label className={label}>Label *</label>
              <input className={inp} value={form.label} onChange={f("label")} placeholder="Schools & Education" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Icon</label>
              <select className={inp} value={form.iconName} onChange={f("iconName")}>
                {ICON_OPTIONS.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Accent Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={form.accent} onChange={f("accent")} className="h-9 w-12 rounded-lg border border-slate-200" />
                <input className={inp} value={form.accent} onChange={f("accent")} placeholder="#F39221" />
              </div>
            </div>
          </div>

          <div>
            <label className={label}>Description *</label>
            <textarea className={inp} rows={3} value={form.description} onChange={f("description")} />
          </div>

          <div>
            <label className={label}>Tags (comma-separated)</label>
            <input className={inp} value={form.tags} onChange={f("tags")} placeholder="Social Media, Website Design, SEO" />
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={label}>
                Images * (first = large feature tile, 2nd & 3rd = side tiles, rest optional/unused)
              </label>
              <button type="button" onClick={addImage} className="text-xs font-bold text-indigo-600 hover:underline">
                + Add Image
              </button>
            </div>
            <div className="space-y-3">
              {form.images.map((img, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2 relative">
                  {form.images.length > 3 && (
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                  <ImageUpload
                    label={`Image ${i + 1}`}
                    value={img.src}
                    onChange={(url) => updateImage(i, "src", url)}
                    folder="webtech/industries"
                  />
                  <input
                    className={inp}
                    value={img.caption}
                    onChange={(e) => updateImage(i, "caption", e.target.value)}
                    placeholder="Caption (e.g. School Branding)"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={label}>Video Reels (optional)</label>
              <button type="button" onClick={addVideo} className="text-xs font-bold text-indigo-600 hover:underline">
                + Add Video
              </button>
            </div>
            <div className="space-y-3">
              {form.videos.map((vid, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => removeVideo(i)}
                    className="absolute top-2 right-2 text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                  <div>
                    <label className="text-xs font-bold opacity-60 block mb-1">Video URL (.mp4)</label>
                    <input
                      className={inp}
                      value={vid.src}
                      onChange={(e) => updateVideo(i, "src", e.target.value)}
                      placeholder="https://…/video.mp4"
                    />
                  </div>
                  <ImageUpload
                    label="Poster Image"
                    value={vid.poster}
                    onChange={(url) => updateVideo(i, "poster", url)}
                    folder="webtech/industries"
                  />
                  <input
                    className={inp}
                    value={vid.caption}
                    onChange={(e) => updateVideo(i, "caption", e.target.value)}
                    placeholder="Caption (e.g. Admission Drive Reel)"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Display Order</label>
              <input type="number" className={inp} value={form.order} onChange={f("order")} min={0} />
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-3">
                <input
                  id="ind-active"
                  type="checkbox"
                  className="w-4 h-4 accent-indigo-600"
                  checked={form.isActive}
                  onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                />
                <label htmlFor="ind-active" className="text-sm text-slate-600 cursor-pointer">
                  Visible on site
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IndustriesAdmin;