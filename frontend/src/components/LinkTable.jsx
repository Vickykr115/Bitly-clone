import { useMemo } from 'react'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { Link } from "react-router-dom"


function truncate(s, n = 70) {
  if (!s) return ''
  return s.length > n ? s.slice(0, n) + '…' : s
}

export default function LinkTable({ links, onDelete }) {
  const BASE = import.meta.env.VITE_BASE_URL || ''

  if (!links || links.length === 0) {
    return (
      <div className="card p-6 text-center">
        <h3 className="text-lg font-semibold">No links yet</h3>
        <p className="text-sm text-slate-500 mt-2">Create your first short link to get started.</p>
      </div>
    )
  }

  const rows = useMemo(() => links, [links])

  return (
    <div className="card-strong p-0 overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="text-sm font-semibold">Recent links</div>
        <div className="text-xs text-slate-500">Updated now</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-compact">
          <thead>
            <tr>
              <th className="text-left">Short Code</th>
              <th className="text-left">Target URL </th>
              <th className="text-left">Total Clicks</th>
              <th className="text-left">Last click</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(link => (
              <tr key={link.code} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3 align-middle font-mono text-slate-700">{link.code}</td>
                <td className="px-4 py-3 align-middle text-sm text-slate-700 max-w-[60ch]">
                  <div title={link.target} className="truncate">{truncate(link.target, 120)}</div>
                </td>
                <td className="px-4 py-3 align-middle text-sm">{link.totalClicks || 0}</td>
                <td className="px-4 py-3 align-middle text-sm text-slate-500">{link.lastClickedAt ? new Date(link.lastClickedAt).toLocaleString() : '-'}</td>
                <td className="px-4 py-3 align-middle text-sm">
                  <div className="flex items-center gap-3">
                    <button onClick={() => {
                      navigator.clipboard?.writeText(`${BASE}/${link.code}`)
                      alert('Copied short URL to clipboard')
                    }} className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2">
                      <HiOutlineClipboardCopy className="w-4 h-4" /> Copy
                    </button>

<Link 
  to={`/code/${link.code}`} 
  className="text-sm text-indigo-600 hover:underline"
>
  Stats
</Link>
                    <a href={`${BASE}/${link.code}`} target="_blank" rel="noreferrer" className="text-sm text-emerald-600">Open</a>

                    <button onClick={() => onDelete(link.code)} className="text-sm text-rose-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
