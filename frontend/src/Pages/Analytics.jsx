import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { HiOutlineChartBar } from "react-icons/hi";

export default function Analytics() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch links only
  const load = async () => {
    try {
      const res = await axios.get(`${API}/api/links`);
      setLinks(res.data);
    } catch (err) {
      console.log("Analytics error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="card p-6 text-center">Loading analytics…</div>;

  // ——————————————————————————————————————————
  //   CALCULATIONS BASED ON EXISTING API ONLY
  // ——————————————————————————————————————————

  const totalClicks = links.reduce((s, l) => s + (l.totalClicks || 0), 0);

  // Top 5 links
  const topLinks = [...links]
    .sort((a, b) => b.totalClicks - a.totalClicks)
    .slice(0, 5);

  // Create a click trend (based on createdAt OR lastClickedAt)
  const trendMap = {};

  links.forEach((link) => {
    const date = link.lastClickedAt || link.createdAt;
    if (!date) return;

    const day = new Date(date).toISOString().slice(0, 10);
    trendMap[day] = (trendMap[day] || 0) + (link.totalClicks || 0);
  });

  const trendData = Object.keys(trendMap).map((day) => ({
    date: day,
    clicks: trendMap[day],
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <HiOutlineChartBar className="w-7 h-7 text-orange-500" />
        <h1 className="text-2xl font-semibold">Analytics Overview</h1>
      </div>
      <p className="text-slate-500 text-sm">
        Auto-generated analytics based on your links and click history.
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 card-hover">
          <div className="text-xs text-slate-500">Total Links</div>
          <div className="text-2xl font-semibold mt-2">{links.length}</div>
        </div>

        <div className="card p-5 card-hover">
          <div className="text-xs text-slate-500">Total Clicks</div>
          <div className="text-2xl font-semibold mt-2">{totalClicks}</div>
        </div>

        <div className="card p-5 card-hover">
          <div className="text-xs text-slate-500">Top Link</div>
          <div className="font-mono text-indigo-600 mt-2">
            {topLinks[0] ? `${topLinks[0].code} (${topLinks[0].totalClicks} clicks)` : "-"}
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="card p-6 card-hover">
        <div className="text-lg font-semibold mb-2">Clicks Trend</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#ff7a59" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Links Table */}
      <div className="card p-6 card-hover">
        <div className="text-lg font-semibold mb-3">Top Links</div>

        <table className="w-full table-compact">
          <thead>
            <tr className="border-b">
              <th className="text-left">Code</th>
              <th className="text-left">Target</th>
              <th className="text-left">Clicks</th>
            </tr>
          </thead>

          <tbody>
            {topLinks.map((l) => (
              <tr key={l.code} className="border-b hover:bg-slate-50">
                <td className="font-mono text-sm">{l.code}</td>
                <td className="truncate max-w-[300px] text-sm">{l.target}</td>
                <td className="text-sm">{l.totalClicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
