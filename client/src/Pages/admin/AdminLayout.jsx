import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Monitor, FileUser, HelpCircle, Users, Package,
  Quote, Mail, Briefcase, BarChart3, FileText, LogOut,Building2
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
  { to: "/dashboard/homepage", label: "Homepage", icon: <Monitor size={18} />, badge: "NEW", dividerAfter: true },
  { to: "/dashboard/resumes", label: "Resumes", icon: <FileUser size={18} />, badge: "NEW" },
  { to: "/dashboard/faqs", label: "FAQs", icon: <HelpCircle size={18} /> },
  { to: "/dashboard/clients", label: "Clients", icon: <Users size={18} /> },
  { to: "/dashboard/packages", label: "Packages", icon: <Package size={18} /> },
  { to: "/dashboard/testimonials", label: "Testimonials", icon: <Quote size={18} /> },
  { to: "/dashboard/contacts", label: "Contacts", icon: <Mail size={18} /> },
  { to: "/dashboard/jobs", label: "Jobs", icon: <Briefcase size={18} /> },
  { to: "/dashboard/influencer", label: "Influencer Hub", icon: <Users size={18} /> },
  { to: "/dashboard/blogs", label: "Blogs", icon: <FileText size={18} /> },
  { to: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { to: "/dashboard/industries", label: "Industries", icon: <Building2 size={18} /> },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <div className="w-16 md:w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-4 md:p-6 flex items-center justify-center md:justify-start gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">W</div>
          <h1 className="hidden md:block text-xl font-bold tracking-tight text-slate-800">WebTech</h1>
        </div>

        <nav className="flex-1 px-2 md:px-4 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((n) => (
            <div key={n.to}>
              <NavLink
                to={n.to}
                end={n.end}
                title={n.label}
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${
                    isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <span className="shrink-0">{n.icon}</span>
                <span className="hidden md:inline">{n.label}</span>
                {n.badge && (
                  <span className="hidden md:inline-block ml-auto px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-600 text-[10px] font-bold">
                    {n.badge}
                  </span>
                )}
              </NavLink>
              {n.dividerAfter && <div className="my-2 border-t border-slate-100" />}
            </div>
          ))}
        </nav>

        <div className="p-2 md:p-4 border-t border-slate-100">
          <button
            onClick={logout}
            title="Logout"
            className="w-full flex items-center justify-center md:justify-start gap-2 py-2.5 px-3 md:px-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm"
          >
            <LogOut size={18} className="shrink-0" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="p-8 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;