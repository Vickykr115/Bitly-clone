import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Health() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const API = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    axios.get(`${API}/healthz`).then(res => setData(res.data)).catch(() => setData(null)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="card p-6 text-center">Checking system health…</div>
  if (!data) return <div className="card p-6 text-center text-rose-600">Unable to fetch system health.</div>

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">System Health</h2>
          <p className="text-sm text-slate-500">Realtime status of your backend</p>
        </div>
        <div className="text-sm text-slate-500">Checked at {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-50 rounded-md">
          <div className="text-xs text-slate-500">Status</div>
          <div className="font-semibold mt-1 text-emerald-600">{data.ok ? 'Healthy' : 'Unhealthy'}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-md">
          <div className="text-xs text-slate-500">Version</div>
          <div className="font-semibold mt-1">{data.version}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-md">
          <div className="text-xs text-slate-500">Server time</div>
          <div className="font-semibold mt-1">{new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
