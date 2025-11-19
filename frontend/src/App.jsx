import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
