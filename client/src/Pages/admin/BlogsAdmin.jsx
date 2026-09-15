import { useState, useEffect } from "react";
import {  Trash2,Plus,FileText /* whatever icons that panel used */ } from "lucide-react";
import { get, post, put, del,} from "./shared/adminApi";
import { Modal, Badge, ActionBtn, inp, label } from "./shared/AdminUI";


function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [modal, setModal] = useState(null); // null | "add" | "edit"
  const [editId, setEditId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "SEO Strategy",
    author: "Sr. Writer",
    excerpt: "",
    content: "",
    image: "",
    tags: "",
    isActive: true,
    isFeatured: false,
    order: 0,
    publishedAt: new Date().toISOString().split("T")[0],
  });

  const CATEGORIES = [
    "SEO Strategy",
    "PPC / Google Ads",
    "Digital Marketing",
    "Social Media",
    "Content Marketing",
    "Web Design",
    "General",
  ];

  const load = () =>
    get("/blogs?all=true").then((d) => setBlogs(Array.isArray(d) ? d : []));
  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm({
      title: "",
      category: "SEO Strategy",
      author: "Sr. Writer",
      excerpt: "",
      content: "",
      image: "",
      tags: "",
      isActive: true,
      isFeatured: false,
      order: blogs.length,
      publishedAt: new Date().toISOString().split("T")[0],
    });
    setEditId(null);
    setModal("form");
  };

  const openEdit = (b) => {
    setForm({
      title: b.title,
      category: b.category || "General",
      author: b.author || "Sr. Writer",
      excerpt: b.excerpt || "",
      content: b.content || "",
      image: b.image || "",
      tags: (b.tags || []).join(", "),
      isActive: b.isActive,
      isFeatured: b.isFeatured || false,
      order: b.order ?? 0,
      publishedAt: b.publishedAt
        ? new Date(b.publishedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setEditId(b._id);
    setModal("form");
  };

  const save = async () => {
    const body = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(form.order),
    };
    if (editId) await put(`/blogs/${editId}`, body);
    else await post("/blogs", body);
    setModal(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this blog post permanently?")) return;
    await del(`/blogs/${id}`);
    load();
  };

  const toggle = async (b) => {
    await put(`/blogs/${b._id}`, { isActive: !b.isActive });
    load();
  };

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const fCheck = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.checked }));

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">All Blog Posts</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {blogs.length} total · {blogs.filter((b) => b.isActive).length}{" "}
              published
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus size={15} /> New Post
          </button>
        </div>

        {/* Table */}
        {blogs.length === 0 ? (
          <div className="py-16 text-center">
            <FileText size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              No blog posts yet. Create your first one!
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Post</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Published</th>
                <th className="px-5 py-3">Featured</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                  {/* Post */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {b.image ? (
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-14 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-100"
                          onError={(e) => {
                            e.target.style.opacity = 0.3;
                          }}
                        />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <FileText size={16} className="text-slate-300" />
                        </div>
                      )}
                      <div className="max-w-[220px]">
                        <p className="font-semibold text-slate-700 truncate">
                          {b.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {b.excerpt || "No excerpt"}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-5 py-4">
                    <Badge text={b.category || "General"} color="blue" />
                  </td>
                  {/* Author */}
                  <td className="px-5 py-4 text-slate-500 text-xs">
                    {b.author}
                  </td>
                  {/* Published */}
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {formatDate(b.publishedAt || b.createdAt)}
                  </td>
                  {/* Featured */}
                  <td className="px-5 py-4">
                    {b.isFeatured ? (
                      <Badge text="Featured" color="amber" />
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <button onClick={() => toggle(b)}>
                      <Badge
                        text={b.isActive ? "Published" : "Draft"}
                        color={b.isActive ? "green" : "amber"}
                      />
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <ActionBtn
                        icon={<Eye size={15} />}
                        onClick={() => setViewing(b)}
                      />
                      <ActionBtn
                        icon={<Edit3 size={15} />}
                        onClick={() => openEdit(b)}
                      />
                      <ActionBtn
                        icon={<Trash2 size={15} />}
                        danger
                        onClick={() => remove(b._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal === "form" && (
        <Modal
          title={editId ? "Edit Blog Post" : "New Blog Post"}
          onClose={() => setModal(null)}
          onSave={save}
          wide
        >
          {/* Title */}
          <div>
            <label className={label}>Title *</label>
            <input
              className={inp}
              value={form.title}
              onChange={f("title")}
              placeholder="e.g. How to Rank #1 on Google in 2026"
            />
          </div>

          {/* Image upload */}
          <ImageUpload
            label="Cover Image"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
            folder="webtech/blogs"
          />

          {/* Category + Author */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Category</label>
              <select
                className={inp}
                value={form.category}
                onChange={f("category")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Author</label>
              <input
                className={inp}
                value={form.author}
                onChange={f("author")}
                placeholder="Sr. Writer"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className={label}>Excerpt (shown on card)</label>
            <textarea
              className={inp}
              rows={2}
              value={form.excerpt}
              onChange={f("excerpt")}
              placeholder="Short summary shown below the blog title on the card…"
            />
          </div>

          {/* Full content */}
          <div>
            <label className={label}>Full Content (for blog detail page)</label>
            <textarea
              className={inp}
              rows={6}
              value={form.content}
              onChange={f("content")}
              placeholder="Write the full blog article here…"
            />
          </div>

          {/* Tags */}
          <div>
            <label className={label}>Tags (comma-separated)</label>
            <input
              className={inp}
              value={form.tags}
              onChange={f("tags")}
              placeholder="seo, google, digital marketing"
            />
          </div>

          {/* Publish date + Order */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Publish Date</label>
              <input
                type="date"
                className={inp}
                value={form.publishedAt}
                onChange={f("publishedAt")}
              />
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

          {/* Toggles */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <input
                id="blog-active"
                type="checkbox"
                className="w-4 h-4 accent-indigo-600"
                checked={form.isActive}
                onChange={fCheck("isActive")}
              />
              <label
                htmlFor="blog-active"
                className="text-sm text-slate-600 cursor-pointer"
              >
                Published (visible on site)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="blog-featured"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.isFeatured}
                onChange={fCheck("isFeatured")}
              />
              <label
                htmlFor="blog-featured"
                className="text-sm text-slate-600 cursor-pointer"
              >
                Mark as{" "}
                <span className="text-amber-500 font-bold">Featured</span>
              </label>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Preview Modal ── */}
      {viewing && (
        <Modal title="Blog Preview" onClose={() => setViewing(null)} wide>
          {/* Cover image */}
          {viewing.image && (
            <img
              src={viewing.image}
              alt={viewing.title}
              className="w-full h-52 object-cover rounded-xl border border-slate-100"
              onError={(e) => {
                e.target.style.opacity = 0.3;
              }}
            />
          )}

          {/* Meta row */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge text={viewing.category || "General"} color="blue" />
            {viewing.isFeatured && <Badge text="Featured" color="amber" />}
            <Badge
              text={viewing.isActive ? "Published" : "Draft"}
              color={viewing.isActive ? "green" : "amber"}
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-800 leading-snug">
            {viewing.title}
          </h2>

          {/* Info row */}
          <div className="flex gap-4 text-xs text-slate-400 flex-wrap">
            <span>
              By{" "}
              <span className="font-semibold text-slate-600">
                {viewing.author}
              </span>
            </span>
            <span>
              {new Date(
                viewing.publishedAt || viewing.createdAt,
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Excerpt */}
          {viewing.excerpt && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Excerpt
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {viewing.excerpt}
              </p>
            </div>
          )}

          {/* Content */}
          {viewing.content && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Content
              </p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {viewing.content}
              </p>
            </div>
          )}

          {/* Tags */}
          {viewing.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {viewing.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Slug */}
          <p className="text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-2">
            slug: {viewing.slug || "—"}
          </p>
        </Modal>
      )}
    </>
  );
}


export default BlogsAdmin;
