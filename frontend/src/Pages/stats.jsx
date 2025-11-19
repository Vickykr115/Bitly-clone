import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Stats() {
  const { code } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const API = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    setLoading(true)
    axios.get(`${API}/api/links/${code}`).then(res => setData(res.data)).catch(()=>setData(null)).finally(()=>setLoading(false))
  }, [code])

  if (loading) return <div className="card p-6">Loading…</div>
  if (!data) return <div className="card p-6">Not Found</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Link stats — <span className="font-mono text-slate-700">{code}</span></h2>
        <a href={data.target} target="_blank" rel="noreferrer" className="text-sm text-emerald-600">Open target</a>
      </div>

      <div className="card p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <div className="text-xs text-slate-500">Total clicks</div>
          <div className="text-xl font-semibold mt-1">{data.totalClicks || 0}</div>
        </div>

        <div>
          <div className="text-xs text-slate-500">Created at</div>
          <div className="text-sm mt-1">{new Date(data.createdAt).toLocaleString()}</div>
        </div>

        <div>
          <div className="text-xs text-slate-500">Last clicked</div>
          <div className="text-sm mt-1">{data.lastClickedAt ? new Date(data.lastClickedAt).toLocaleString() : '-'}</div>
        </div>
      </div>

      <div className="card p-4">
        <div className="text-xs text-slate-500">Target URL</div>
        <div className="mt-2 text-sm break-all">{data.target}</div>
      </div>
    </div>
  )
}
