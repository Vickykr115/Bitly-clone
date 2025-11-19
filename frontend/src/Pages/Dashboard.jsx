import { useEffect, useState } from 'react';
import axios from 'axios';
import LinkForm from '../components/LinkForm';
import LinkTable from '../components/LinkTable';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE_URL;

  const load = async (isInitial = false) => {
    if (isInitial) setLoading(true);

    try {
      const res = await axios.get(`${API}/api/links`);
      setLinks(res.data);
    } catch (err) {
      setLinks([]);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    load(true); // first load (show spinner)

    const interval = setInterval(() => {
      load(false); // silent refresh every 2s
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCreated = (link) => setLinks(prev => [link, ...prev]);
  
  const handleDelete = async (code) => {
    if (!confirm('Delete link?')) return;
    try {
      await axios.delete(`${API}/api/links/${code}`);
      setLinks(prev => prev.filter(l => l.code !== code));
    } catch (err) {
      alert('Could not delete link');
    }
  };

  const totalLinks = links.length;
  const totalClicks = links.reduce((s, l) => s + (l.totalClicks || 0), 0);
  const recent = links[0];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your short links and click analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">Total links</div>
          <div className="px-3 py-1 bg-white border rounded-md text-sm font-semibold">{totalLinks}</div>

          <div className="text-sm text-slate-500">Total clicks</div>
          <div className="px-3 py-1 bg-white border rounded-md text-sm font-semibold">{totalClicks}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 card-hover">
          <div className="text-xs text-slate-500">Total links</div>
          <div className="text-xl font-semibold mt-2">{totalLinks}</div>
        </div>
        <div className="card p-4 card-hover">
          <div className="text-xs text-slate-500">Total clicks</div>
          <div className="text-xl font-semibold mt-2">{totalClicks}</div>
        </div>
        <div className="card p-4 card-hover">
          <div className="text-xs text-slate-500">Most recent</div>
          <div className="text-sm font-mono mt-2">
            {recent ? `${recent.code} • ${recent.totalClicks || 0} clicks` : '-'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LinkForm onCreated={handleCreated} />
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="card p-6">Loading…</div>
          ) : (
            <LinkTable links={links} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
