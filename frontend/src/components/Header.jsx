import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiOutlineLink, HiSparkles } from 'react-icons/hi'

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg text-white flex items-center justify-center">
                <HiOutlineLink className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Shortly</div>
                <div className="text-xs text-slate-300 -mt-0.5">Short links, smart analytics</div>
              </div>
            </Link>
            <span className="hidden md:inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium gap-1 ml-2">
              <HiSparkles className="w-4 h-4" /> Modern UI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm ${loc.pathname === '/' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}>
              Dashboard
            </Link>
            <Link to="/health" className={`text-sm ${loc.pathname === '/health' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}>
              Health
            </Link>

            <a href="https://example.com/docs" className="text-sm text-slate-300 hover:text-white">Docs</a>

            <button
              onClick={() => {
                const el = document.querySelector('input[type="url"], input[placeholder]');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="ml-4 inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 btn-primary"
            >
              New Link
            </button>

            <div className="w-px h-6 bg-slate-700 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-semibold">V</div>
            </div>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded-md text-slate-200 hover:bg-slate-800/60">
              {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block text-white font-medium">Dashboard</Link>
            <Link to="/health" onClick={() => setOpen(false)} className="block text-slate-300">Health</Link>
            <a href="https://example.com/docs" className="block text-slate-300">Docs</a>
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.querySelector('input[type="url"], input[placeholder]');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setOpen(false)
                }}
                className="w-full text-left px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                New Link
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
