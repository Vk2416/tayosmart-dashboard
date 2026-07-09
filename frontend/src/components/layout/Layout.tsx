// src/components/layout/Layout.tsx
import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useData } from '@/context/DataContext'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout: React.FC = () => {
    const location = useLocation()
    const { logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const { alerts } = useData()

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(prev => !prev)

    return (
        <div className="h-screen overflow-hidden relative bg-bg">
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                onLogout={logout}
                alertCount={alerts.length}
                onLogoClick={toggleSidebar}   // 👈 pass toggle
            />
            <Sidebar
                currentPath={location.pathname}
                isOpen={sidebarOpen}           // 👈 pass open state
            />
            <main
                className={`
                    transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'ml-[var(--sidebar-w)]' : 'ml-0'}
                    mt-[var(--header-h)]
                    h-[calc(100vh-var(--header-h))]
                    overflow-y-auto overflow-x-hidden p-6 bg-bg
                `}
            >
                <Outlet />
            </main>
        </div>
    )
}

export default Layout