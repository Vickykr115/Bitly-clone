import { Link, useLocation } from 'react-router-dom'
import { HiOutlineHome, HiOutlineChartBar, HiOutlineDocumentText } from 'react-icons/hi'

export default function Sidebar() {
    const loc = useLocation()
    return (
        <aside className="w-64 border-r bg-white hidden lg:block sidebar-hidden-lg">
            <div className="h-full sticky top-14">
                <div className="px-4 py-6 space-y-4">
                    <nav className="space-y-1">
                        <Link to="/" className={`flex items-center gap-3 px-3 py-2 rounded-md ${loc.pathname === '/' ? 'bg-slate-100 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <HiOutlineHome className="w-5 h-5" /> Dashboard
                        </Link>
                        <Link
                            to="/analytics"
                            className={`flex items-center gap-3 px-3 py-2 rounded-md ${loc.pathname.startsWith('/analytics')
                                    ? 'bg-slate-100 font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <HiOutlineChartBar className="w-5 h-5" /> Analytics
                        </Link>

                        <Link to="/health" className={`flex items-center gap-3 px-3 py-2 rounded-md ${loc.pathname === '/health' ? 'bg-slate-100 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <HiOutlineDocumentText className="w-5 h-5" /> Health
                        </Link>
                    </nav>


                </div>
            </div>
        </aside>
    )
}
