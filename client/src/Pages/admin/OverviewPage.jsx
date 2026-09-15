import { useNavigate } from "react-router-dom";
import { FileText, BarChart3, Package, Mail, FileUser, Monitor } from "lucide-react";

function StatCard({ label, value, sub, icon, color }) {
  const colors = { indigo: "text-indigo-600", blue: "text-blue-600", purple: "text-purple-600", green: "text-green-600" };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity ${colors[color]}`}>{icon}</div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold mt-1 text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 mt-2">{sub}</p>
    </div>
  );
}

const OverviewPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-xs text-slate-500 mt-0.5">Welcome back — here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Pages" value="12" sub="+2 from last month" icon={<FileText size={48} />} color="indigo" />
        <StatCard label="Total Views" value="3,240" sub="+12.5% increase" icon={<BarChart3 size={48} />} color="blue" />
        <StatCard label="Conversions" value="320" sub="Avg. 9.8% rate" icon={<Package size={48} />} color="purple" />
        <StatCard label="New Messages" value="2" sub="Unread contact forms" icon={<Mail size={48} />} color="green" />
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Resume Builder</p>
          <h3 className="text-lg font-bold text-slate-800">View All User Resumes</h3>
          <p className="text-sm text-slate-500 mt-1">Browse, search, and manage resumes created by users on the Resume Maker.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/resumes")}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors flex-shrink-0 ml-6"
        >
          <FileUser size={16} /> View Resumes
        </button>
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-100 p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">Homepage Editor</p>
          <h3 className="text-lg font-bold text-slate-800">Manage Homepage Sections</h3>
          <p className="text-sm text-slate-500 mt-1">Update slider images, project gallery, and client testimonial videos — all in one place.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/homepage")}
          className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors flex-shrink-0 ml-6"
        >
          <Monitor size={16} /> Open Editor
        </button>
      </div>
    </>
  );
};

export default OverviewPage;