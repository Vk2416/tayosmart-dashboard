import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
    currentPath: string
    isOpen: boolean   // 👈 new – controls visibility
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, isOpen }) => {
    const isActive = (path: string) => {
        if (path === '/dashboard' && currentPath === '/') return true
        return currentPath === path
    }

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { path: '/analysis', label: 'Analysis', icon: 'analysis' },
        { path: '/alerts', label: 'Alert List', icon: 'alert', badge: '3' },
        { path: '/alarms', label: 'Set Alarms', icon: 'alarm' },
        { path: '/reports', label: 'Reports', icon: 'reports' },
    ]

    const renderIcon = (icon: string) => {
        switch (icon) {
            case 'dashboard':
                return (
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                )
            case 'analysis':
                return (
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                )
            case 'alert':
                return (
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                )
            case 'alarm':
                return (
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                )
            case 'reports':
                return (
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <aside
            className={`
                fixed top-28 left-10 z-55
                w-58
                h-[82vh]
                bg-card bg-opacity-60 backdrop-blur-md
                border 
                
                
                border-white/25 dark:border-border/50
                rounded-2xl shadow-2xl shadow-black/20
                transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
                p-4
            `}
        >
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-150
                            ${isActive(item.path)
                                ? 'bg-cyan/10 text-cyan shadow-sm'
                                : 'text-text2 hover:bg-bg2 hover:text-text'
                            }
                        `}
                    >
                        <span className="w-5 h-5 flex items-center justify-center">
                            {renderIcon(item.icon)}
                        </span>
                        {item.label}
                        {item.badge && (
                            <span className="ml-auto bg-red/20 text-red text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </Link>
                ))}

                {/* Logout button inside the sidebar */}
                <div className="mt-4 pt-3 border-t border-border/50">
                    <button
                        onClick={() => {
                            localStorage.removeItem('auth')
                            window.location.href = '/login'
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text2 transition-all duration-150 hover:bg-red/10 hover:text-red"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar