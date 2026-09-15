import {useState, useEffect } from "react";
import React from "react";
import {  Trash2,ChevronDown /* whatever icons that panel used */ } from "lucide-react";

import {Badge, ActionBtn} from "./shared/AdminUI";
import { API } from "./shared/adminApi";

function InfluencerAdmin() {
  const [subTab, setSubTab] = useState("campaigns");
  const [campaigns, setCampaigns] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [appsMap, setAppsMap] = useState({});
  const [appsLoading, setAppsLoading] = useState({});

  const IAPI = API.replace("/api", "/api/influencer");

  useEffect(() => {
    fetch(`${IAPI}/campaigns/all`)
      .then((r) => r.json())
      .then((d) => setCampaigns(Array.isArray(d) ? d : []));
    fetch(`${IAPI}/influencers`)
      .then((r) => r.json())
      .then((d) => setInfluencers(Array.isArray(d) ? d : []));
  }, []);

  const toggleCampaign = async (id) => {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    if (appsMap[id]) return;
    setAppsLoading((p) => ({ ...p, [id]: true }));
    const data = await fetch(`${IAPI}/campaigns/${id}/applications`).then((r) =>
      r.json(),
    );
    setAppsMap((p) => ({ ...p, [id]: Array.isArray(data) ? data : [] }));
    setAppsLoading((p) => ({ ...p, [id]: false }));
  };

  const updateStatus = async (campaignId, appId, status) => {
    await fetch(`${IAPI}/applications/${appId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAppsMap((p) => ({
      ...p,
      [campaignId]: p[campaignId].map((a) =>
        a._id === appId ? { ...a, status } : a,
      ),
    }));
  };

  const deleteCampaign = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    await fetch(`${IAPI}/campaigns/${id}`, { method: "DELETE" });
    setCampaigns((p) => p.filter((c) => c._id !== id));
  };
  const deleteInfluencer = async (id) => {
    if (!window.confirm("Delete this influencer profile?")) return;
    await fetch(`${IAPI}/influencers/${id}`, { method: "DELETE" });
    setInfluencers((p) => p.filter((i) => i._id !== id));
  };
  const toggleCampaignActive = async (c) => {
    await fetch(`${IAPI}/campaigns/${c._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !c.isActive }),
    });
    setCampaigns((p) =>
      p.map((x) => (x._id === c._id ? { ...x, isActive: !x.isActive } : x)),
    );
  };

  const STATUS_OPTIONS = ["pending", "reviewed", "shortlisted", "rejected"];
  const formatN = (n) => {
    if (!n) return "—";
    if (n >= 10000000) return (n / 10000000).toFixed(1) + "Cr";
    if (n >= 100000) return (n / 100000).toFixed(1) + "L";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n;
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 bg-white rounded-2xl border border-slate-200 p-1.5 w-fit shadow-sm">
        {[
          ["campaigns", "🏢 Brand Campaigns"],
          ["influencers", "🎙️ Influencer Profiles"],
        ].map(([id, lbl]) => (
          <button
            key={id}
            onClick={() => setSubTab(id)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${subTab === id ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {lbl}
          </button>
        ))}
      </div>

      {subTab === "campaigns" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Brand Campaigns</h3>
            <span className="text-xs text-slate-400">
              {campaigns.length} total
            </span>
          </div>
          {campaigns.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">
              No brand campaigns yet.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Brand</th>
                  <th className="px-5 py-3">Niche</th>
                  <th className="px-5 py-3">Budget</th>
                  <th className="px-5 py-3">Posted</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <React.Fragment key={c._id}>
                    <tr
                      className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer ${expanded === c._id ? "bg-indigo-50/30" : ""}`}
                      onClick={() => toggleCampaign(c._id)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {expanded === c._id ? (
                            <ChevronUp size={14} className="text-indigo-500" />
                          ) : (
                            <ChevronDown size={14} className="text-slate-400" />
                          )}
                          <div>
                            <p className="font-semibold text-slate-700">
                              {c.company}
                            </p>
                            <p className="text-xs text-slate-400">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {c.niche ? <Badge text={c.niche} color="blue" /> : "—"}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-600">
                        {c.budget ? `₹${c.budget}` : "—"}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCampaignActive(c);
                          }}
                        >
                          <Badge
                            text={c.isActive ? "Active" : "Hidden"}
                            color={c.isActive ? "green" : "amber"}
                          />
                        </button>
                      </td>
                      <td
                        className="px-5 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-end">
                          <ActionBtn
                            icon={<Trash2 size={15} />}
                            danger
                            onClick={() => deleteCampaign(c._id)}
                          />
                        </div>
                      </td>
                    </tr>
                    {expanded === c._id && (
                      <tr className="border-t border-indigo-100">
                        <td colSpan={6} className="px-0 py-0">
                          <div className="bg-indigo-50/30 px-8 py-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                              Influencer Applications
                            </p>
                            {appsLoading[c._id] ? (
                              <p className="text-sm text-slate-400">Loading…</p>
                            ) : !appsMap[c._id] ||
                              appsMap[c._id].length === 0 ? (
                              <p className="text-sm text-slate-400">
                                No applications yet.
                              </p>
                            ) : (
                              <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-slate-100">
                                <thead>
                                  <tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50">
                                    <th className="px-4 py-2 text-left">
                                      Influencer
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Handle
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Followers
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Message
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {appsMap[c._id].map((app) => (
                                    <tr
                                      key={app._id}
                                      className="hover:bg-slate-50"
                                    >
                                      <td className="px-4 py-3 font-semibold text-slate-700">
                                        {app.influencer?.name || "—"}
                                      </td>
                                      <td className="px-4 py-3 text-slate-500 text-xs">
                                        @{app.influencer?.handle || "—"}
                                      </td>
                                      <td className="px-4 py-3 text-slate-500 text-xs">
                                        {formatN(app.influencer?.followers)}
                                      </td>
                                      <td className="px-4 py-3 max-w-xs">
                                        <p className="text-xs text-slate-500 line-clamp-2">
                                          {app.message || "—"}
                                        </p>
                                      </td>
                                      <td className="px-4 py-3">
                                        <select
                                          value={app.status}
                                          onChange={(e) =>
                                            updateStatus(
                                              c._id,
                                              app._id,
                                              e.target.value,
                                            )
                                          }
                                          className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
                                        >
                                          {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s}>
                                              {s.charAt(0).toUpperCase() +
                                                s.slice(1)}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {subTab === "influencers" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Registered Influencers</h3>
            <span className="text-xs text-slate-400">
              {influencers.length} total
            </span>
          </div>
          {influencers.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">
              No influencer profiles yet.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Influencer</th>
                  <th className="px-5 py-3">Platforms</th>
                  <th className="px-5 py-3">Followers</th>
                  <th className="px-5 py-3">Niches</th>
                  <th className="px-5 py-3">Rate/Post</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {influencers.map((inf) => (
                  <tr key={inf._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-700">{inf.name}</p>
                      <p className="text-xs text-slate-400">
                        @{inf.handle} · {inf.location || "—"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {inf.platforms?.join(", ") || "—"}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {formatN(inf.followers)}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {inf.niches?.slice(0, 3).join(", ") || "—"}
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-600">
                      {inf.ratePerPost ? `₹${inf.ratePerPost}` : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <ActionBtn
                          icon={<Trash2 size={15} />}
                          danger
                          onClick={() => deleteInfluencer(inf._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}


export default InfluencerAdmin;