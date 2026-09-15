import { useState, useRef } from "react";
import { X, Check, Upload, Loader2, Star } from "lucide-react";
import { API } from "./adminApi";

export const inp =
  "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 bg-slate-50";
export const label = "block text-xs font-semibold text-slate-500 mb-1";

export function ImageUpload({
  value,
  onChange,
  label: labelText = "Image",
  accept = "image/*",
  folder,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const dataUri = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch(`${API}/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataUri, folder: folder || "webtech" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="space-y-2">
      {labelText && <label className="block text-xs font-semibold text-slate-500 mb-1">{labelText}</label>}
      <div
        className={`relative rounded-xl border-2 border-dashed transition-colors cursor-pointer
          ${uploading ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 bg-slate-50"}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {value ? (
          <div className="relative w-full h-36 group">
            <img
              src={value}
              alt="preview"
              className="w-full h-36 object-cover rounded-xl"
              onError={(e) => { e.target.style.opacity = 0.3; }}
            />
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <span className="hidden group-hover:flex items-center gap-1.5 bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow">
                <Upload size={13} /> Replace
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            {uploading ? (
              <>
                <Loader2 size={28} className="text-indigo-400 animate-spin mb-2" />
                <p className="text-xs text-indigo-500 font-medium">Uploading…</p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-2">
                  <Upload size={18} className="text-indigo-500" />
                </div>
                <p className="text-sm font-semibold text-slate-600">Click or drag & drop</p>
                <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, WebP up to 10 MB</p>
              </>
            )}
          </div>
        )}
        {uploading && value && (
          <div className="absolute inset-0 rounded-xl bg-white/70 flex items-center justify-center">
            <Loader2 size={28} className="text-indigo-500 animate-spin" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={11} /> {error}
        </p>
      )}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  );
}

export function Badge({ text, color }) {
  const map = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-600",
    purple: "bg-purple-100 text-purple-700",
    teal: "bg-teal-100 text-teal-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${map[color] || map.slate}`}>
      {text}
    </span>
  );
}

export function Modal({ title, onClose, onSave, children, wide }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`bg-white rounded-2xl w-full ${wide ? "max-w-3xl" : "max-w-lg"} shadow-2xl border border-slate-100 mx-4`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto">{children}</div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">
            Cancel
          </button>
          {onSave && (
            <button onClick={onSave} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 flex items-center gap-1.5">
              <Check size={15} /> Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ActionBtn({ icon, onClick, danger }) {
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

export function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}