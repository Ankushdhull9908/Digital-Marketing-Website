import { useState, useEffect } from "react";
import { ImagePlay, FolderKanban, Video, Image, Loader2, Plus, Edit3, Trash2 } from "lucide-react";
import { get, post, put, del, API,  } from "./shared/adminApi";
import { Modal, Badge, ActionBtn, ImageUpload, StarRating, inp, label } from "./shared/AdminUI";



function HomepageAdmin() {
  const [activeSection, setActiveSection] = useState("slider");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(""), 2500);
  };
  const reload = () => {
    setLoading(true);
    get("/homepage")
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(() => {
    reload();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
        Loading homepage data…
      </div>
    );

  const sections = [
    {
      key: "slider",
      label: "Hero Slider",
      icon: <ImagePlay size={16} />,
      color: "blue",
    },
    {
      key: "ourProjects",
      label: "Our Projects",
      icon: <FolderKanban size={16} />,
      color: "teal",
    },
    {
      key: "clientVideos",
      label: "Client Testimonial Videos",
      icon: <Video size={16} />,
      color: "purple",
    },
  ];
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500",
    teal: "bg-teal-50 text-teal-700 border-teal-200 ring-teal-500",
    purple: "bg-purple-50 text-purple-700 border-purple-200 ring-purple-500",
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold ${toast.ok ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
        >
          {toast.msg}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activeSection === s.key ? `${colorMap[s.color]} ring-2 shadow-md` : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>
      {activeSection === "slider" && (
        <SliderSectionEditor
          data={data}
          reload={reload}
          showToast={showToast}
        />
      )}
      {activeSection === "ourProjects" && (
        <ProjectsSectionEditor
          data={data}
          reload={reload}
          showToast={showToast}
        />
      )}
      {activeSection === "clientVideos" && (
        <ClientVideosSectionEditor
          data={data}
          reload={reload}
          showToast={showToast}
        />
      )}
    </div>
  );
}

function SliderSectionEditor({ data, reload, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ imageUrl: "", altText: "", order: 0 });
  const openAdd = () => {
    setForm({
      imageUrl: "",
      altText: "",
      order: data?.slider?.images?.length || 0,
    });
    setModal("add");
  };
  const openEdit = (img) => {
    setForm({
      imageUrl: img.imageUrl,
      altText: img.altText || "",
      order: img.order || 0,
    });
    setModal(img);
  };
  const save = async () => {
    try {
      if (modal === "add") {
        await post("/homepage/slider/images", form);
        showToast("Slide added!");
      } else {
        await fetch(`${API}/homepage/slider/images/${modal._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showToast("Slide updated!");
      }
      setModal(null);
      reload();
    } catch {
      showToast("Error saving", false);
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Remove this slide?")) return;
    await del(`/homepage/slider/images/${id}`);
    showToast("Slide removed!");
    reload();
  };
  const toggle = async (imgId, current) => {
    await fetch(`${API}/homepage/slider/images/${imgId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !current }),
    });
    reload();
  };
  const images = data?.slider?.images || [];
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">Hero Slider Images</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              These images cycle in the hero carousel on the homepage.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"
          >
            <Plus size={15} /> Add Slide
          </button>
        </div>
        {images.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            No slides yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {[...images]
              .sort((a, b) => a.order - b.order)
              .map((img) => (
                <div
                  key={img._id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50"
                >
                  {img.imageUrl ? (
                    <img
                      src={img.imageUrl}
                      alt={img.altText}
                      className="w-24 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                      onError={(e) => (e.target.style.opacity = 0.2)}
                    />
                  ) : (
                    <div className="w-24 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Image size={20} className="text-slate-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">
                      {img.imageUrl || "No URL"}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {img.altText || "No alt text"} · Order #{img.order}
                    </p>
                  </div>
                  <button onClick={() => toggle(img._id, img.isActive)}>
                    <Badge
                      text={img.isActive ? "Active" : "Hidden"}
                      color={img.isActive ? "green" : "amber"}
                    />
                  </button>
                  <div className="flex gap-1.5">
                    <ActionBtn
                      icon={<Edit3 size={15} />}
                      onClick={() => openEdit(img)}
                    />
                    <ActionBtn
                      icon={<Trash2 size={15} />}
                      danger
                      onClick={() => remove(img._id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal
          title={modal === "add" ? "Add Slide" : "Edit Slide"}
          onClose={() => setModal(null)}
          onSave={save}
        >
          <ImageUpload
            label="Slide Image *"
            value={form.imageUrl}
            onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
            folder="webtech/slider"
          />
          <div>
            <label className={label}>Alt Text</label>
            <input
              className={inp}
              value={form.altText}
              onChange={(e) =>
                setForm((p) => ({ ...p, altText: e.target.value }))
              }
              placeholder="Describe the image"
            />
          </div>
          <div>
            <label className={label}>Display Order</label>
            <input
              type="number"
              className={inp}
              value={form.order}
              onChange={(e) =>
                setForm((p) => ({ ...p, order: Number(e.target.value) }))
              }
              min={0}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

const INDUSTRY_IDS = [
  "services",
  "education",
  "restaurants",
  "ecommerce",
  "realestate",
];
function ProjectsSectionEditor({ data, reload, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    industryId: "services",
    row: "top",
    order: 0,
    isActive: true,
  });
  const projects = data?.ourProjects?.projects || [];
  const openAdd = () => {
    setForm({
      title: "",
      imageUrl: "",
      industryId: "services",
      row: "top",
      order: projects.length,
      isActive: true,
    });
    setModal("add");
  };
  const openEdit = (p) => {
    setForm({
      title: p.title,
      imageUrl: p.imageUrl,
      industryId: p.industryId || "services",
      row: p.row || "top",
      order: p.order || 0,
      isActive: p.isActive,
    });
    setModal(p);
  };
  const save = async () => {
    try {
      if (modal === "add") {
        await post("/homepage/our-projects/projects", form);
        showToast("Project added!");
      } else {
        await put(`/homepage/our-projects/projects/${modal._id}`, form);
        showToast("Project updated!");
      }
      setModal(null);
      reload();
    } catch {
      showToast("Error saving", false);
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Remove this project?")) return;
    await del(`/homepage/our-projects/projects/${id}`);
    showToast("Project removed!");
    reload();
  };
  const toggle = async (p) => {
    await put(`/homepage/our-projects/projects/${p._id}`, {
      isActive: !p.isActive,
    });
    reload();
  };
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">Our Projects Gallery</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Top row = 4 images, bottom row = 2 images.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700"
          >
            <Plus size={15} /> Add Project
          </button>
        </div>
        {["top", "bottom"].map((row) => {
          const rowProjects = [...projects]
            .filter((p) => p.row === row)
            .sort((a, b) => a.order - b.order);
          return (
            <div key={row}>
              <div className="px-5 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {row === "top" ? "Top Row (4 slots)" : "Bottom Row (2 slots)"}
                </p>
              </div>
              {rowProjects.length === 0 ? (
                <div className="px-5 py-4 text-sm text-slate-400 italic">
                  No projects in this row yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {rowProjects.map((proj) => (
                    <div
                      key={proj._id}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50"
                    >
                      {proj.imageUrl ? (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-20 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                          onError={(e) => (e.target.style.opacity = 0.2)}
                        />
                      ) : (
                        <div className="w-20 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <Image size={18} className="text-slate-300" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700">
                          {proj.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Industry:{" "}
                          <span className="font-medium text-slate-600">
                            {proj.industryId}
                          </span>{" "}
                          · Order #{proj.order}
                        </p>
                      </div>
                      <button onClick={() => toggle(proj)}>
                        <Badge
                          text={proj.isActive ? "Visible" : "Hidden"}
                          color={proj.isActive ? "green" : "amber"}
                        />
                      </button>
                      <div className="flex gap-1.5">
                        <ActionBtn
                          icon={<Edit3 size={15} />}
                          onClick={() => openEdit(proj)}
                        />
                        <ActionBtn
                          icon={<Trash2 size={15} />}
                          danger
                          onClick={() => remove(proj._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal
          title={modal === "add" ? "Add Project" : "Edit Project"}
          onClose={() => setModal(null)}
          onSave={save}
        >
          <div>
            <label className={label}>Project Title *</label>
            <input
              className={inp}
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
          </div>
          <ImageUpload
            label="Project Image *"
            value={form.imageUrl}
            onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
            folder="webtech/projects"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Industry</label>
              <select
                className={inp}
                value={form.industryId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, industryId: e.target.value }))
                }
              >
                {INDUSTRY_IDS.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Grid Row</label>
              <select
                className={inp}
                value={form.row}
                onChange={(e) =>
                  setForm((p) => ({ ...p, row: e.target.value }))
                }
              >
                <option value="top">Top (up to 4)</option>
                <option value="bottom">Bottom (up to 2)</option>
              </select>
            </div>
          </div>
          <div>
            <label className={label}>Display Order</label>
            <input
              type="number"
              className={inp}
              value={form.order}
              onChange={(e) =>
                setForm((p) => ({ ...p, order: Number(e.target.value) }))
              }
              min={0}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="proj-active"
              type="checkbox"
              className="w-4 h-4 accent-teal-600"
              checked={form.isActive}
              onChange={(e) =>
                setForm((p) => ({ ...p, isActive: e.target.checked }))
              }
            />
            <label
              htmlFor="proj-active"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Visible on homepage
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}

function ClientVideosSectionEditor({ data, reload, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    clientName: "",
    clientRole: "",
    company: "",
    videoUrl: "",
    thumbnail: "",
    order: 0,
    isActive: true,
  });
  const videos = data?.clientVideos?.videos || [];
  const meta = data?.clientVideos || {};
  const openAdd = () => {
    setForm({
      clientName: "",
      clientRole: "",
      company: "",
      videoUrl: "",
      thumbnail: "",
      order: videos.length,
      isActive: true,
    });
    setModal("add");
  };
  const openEdit = (v) => {
    setForm({
      clientName: v.clientName,
      clientRole: v.clientRole || "",
      company: v.company || "",
      videoUrl: v.videoUrl,
      thumbnail: v.thumbnail || "",
      order: v.order || 0,
      isActive: v.isActive,
    });
    setModal(v);
  };
  const save = async () => {
    try {
      if (modal === "add") {
        await post("/homepage/client-videos/videos", form);
        showToast("Video added!");
      } else {
        await put(`/homepage/client-videos/videos/${modal._id}`, form);
        showToast("Video updated!");
      }
      setModal(null);
      reload();
    } catch {
      showToast("Error saving", false);
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Remove this video?")) return;
    await del(`/homepage/client-videos/videos/${id}`);
    showToast("Video removed!");
    reload();
  };
  const toggle = async (v) => {
    await fetch(`${API}/homepage/client-videos/videos/${v._id}/toggle`, {
      method: "PATCH",
    });
    reload();
  };
  const saveMeta = async (field, value) => {
    await put("/homepage/client-videos/meta", { [field]: value });
    reload();
  };
  return (
    <>
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className={label}>Section Title</label>
          <input
            className={inp}
            defaultValue={meta.sectionTitle || "What Our Clients Say"}
            onBlur={(e) => saveMeta("sectionTitle", e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-48">
          <label className={label}>Subtitle</label>
          <input
            className={inp}
            defaultValue={meta.subtitle || ""}
            onBlur={(e) => saveMeta("subtitle", e.target.value)}
            placeholder="Real results from real clients"
          />
        </div>
        <div className="flex items-center gap-2 pb-2">
          <input
            id="cv-active"
            type="checkbox"
            className="w-4 h-4 accent-purple-600"
            defaultChecked={meta.isActive}
            onChange={(e) => saveMeta("isActive", e.target.checked)}
          />
          <label
            htmlFor="cv-active"
            className="text-sm font-semibold text-purple-700 cursor-pointer"
          >
            Section Visible
          </label>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">
              Client Testimonial Videos
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload a thumbnail; paste a YouTube embed URL for the video.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700"
          >
            <Plus size={15} /> Add Video
          </button>
        </div>
        {videos.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            No client videos yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {[...videos]
              .sort((a, b) => a.order - b.order)
              .map((v) => (
                <div
                  key={v._id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50"
                >
                  {v.thumbnail ? (
                    <img
                      src={v.thumbnail}
                      alt={v.clientName}
                      className="w-24 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                      onError={(e) => (e.target.style.opacity = 0.2)}
                    />
                  ) : (
                    <div className="w-24 h-14 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                      <Video size={20} className="text-purple-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700">
                      {v.clientName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {[v.clientRole, v.company].filter(Boolean).join(", ") ||
                        "No role/company"}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {v.videoUrl}
                    </p>
                  </div>
                  <button onClick={() => toggle(v)}>
                    <Badge
                      text={v.isActive ? "Active" : "Hidden"}
                      color={v.isActive ? "green" : "amber"}
                    />
                  </button>
                  <div className="flex gap-1.5">
                    <ActionBtn
                      icon={<Edit3 size={15} />}
                      onClick={() => openEdit(v)}
                    />
                    <ActionBtn
                      icon={<Trash2 size={15} />}
                      danger
                      onClick={() => remove(v._id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal
          title={modal === "add" ? "Add Client Video" : "Edit Client Video"}
          onClose={() => setModal(null)}
          onSave={save}
        >
          <div>
            <label className={label}>Client Name *</label>
            <input
              className={inp}
              value={form.clientName}
              onChange={(e) =>
                setForm((p) => ({ ...p, clientName: e.target.value }))
              }
              placeholder="Rahul Sharma"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Role</label>
              <input
                className={inp}
                value={form.clientRole}
                onChange={(e) =>
                  setForm((p) => ({ ...p, clientRole: e.target.value }))
                }
                placeholder="CEO"
              />
            </div>
            <div>
              <label className={label}>Company</label>
              <input
                className={inp}
                value={form.company}
                onChange={(e) =>
                  setForm((p) => ({ ...p, company: e.target.value }))
                }
                placeholder="Acme Ltd."
              />
            </div>
          </div>
          <div>
            <label className={label}>Video URL *</label>
            <input
              className={inp}
              value={form.videoUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, videoUrl: e.target.value }))
              }
              placeholder="https://www.youtube.com/embed/…"
            />
            <p className="text-xs text-slate-400 mt-1">
              Use a YouTube embed URL or direct .mp4 link.
            </p>
          </div>
          <ImageUpload
            label="Thumbnail Image (optional)"
            value={form.thumbnail}
            onChange={(url) => setForm((p) => ({ ...p, thumbnail: url }))}
            folder="webtech/video-thumbnails"
          />
          <div>
            <label className={label}>Display Order</label>
            <input
              type="number"
              className={inp}
              value={form.order}
              onChange={(e) =>
                setForm((p) => ({ ...p, order: Number(e.target.value) }))
              }
              min={0}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="vid-active"
              type="checkbox"
              className="w-4 h-4 accent-purple-600"
              checked={form.isActive}
              onChange={(e) =>
                setForm((p) => ({ ...p, isActive: e.target.checked }))
              }
            />
            <label
              htmlFor="vid-active"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Show on homepage
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}

export default HomepageAdmin;