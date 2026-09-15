import { BarChart3 } from "lucide-react";

const AnalyticsAdmin = () => (
  <>
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800">Analytics</h2>
      <p className="text-xs text-slate-500 mt-0.5">Site performance overview.</p>
    </div>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
      <BarChart3 size={48} className="text-slate-300 mx-auto mb-4" />
      <p className="text-slate-500 font-medium">Analytics integration coming soon.</p>
    </div>
  </>
);

export default AnalyticsAdmin;