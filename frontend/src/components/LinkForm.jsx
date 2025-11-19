import { useState } from 'react'
import axios from 'axios'

export default function LinkForm({ onCreated }) {
  const [target, setTarget] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const API = import.meta.env.VITE_API_BASE_URL

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!target) return setError('URL is required')
    try {
      setLoading(true)
      const res = await axios.post(`${API}/api/links`, { target, code: code || undefined })
      onCreated(res.data)
      setTarget(''); setCode('')
    } catch (err) {
      setError(err?.response?.data?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card p-5 card-hover">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Create a short link</h3>
          <p className="text-sm text-slate-500 mt-1">Quickly shorten a link — keep the same backend behavior.</p>
        </div>
        <div className="text-xs text-slate-400">Auto-generate code if empty</div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm text-slate-700">Long URL</label>
          <input type="url" value={target} onChange={(e) => setTarget(e.target.value)}
            placeholder="https://example.com/very/long/url" className="input-bit mt-1" required />
        </div>

        <div>
          <label className="block text-sm text-slate-700">Custom code (optional)</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="your-code" className="input-bit mt-1" />
        </div>

        {error && <div className="text-sm text-rose-600">{error}</div>}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">Links are short & trackable.</div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating…' : 'Create'}
        </button>
      </div>
    </form>
  )
}
