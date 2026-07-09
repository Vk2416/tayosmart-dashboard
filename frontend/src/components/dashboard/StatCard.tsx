// src/components/dashboard/StatCard.tsx
import React from 'react'
import { THRESHOLDS } from '@/constants'

interface StatCardProps {
    label: string
    value: string
    sub: string
    accent: string
    icon: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, accent, icon }) => {
    const isPressure = label === 'Hydrant Pressure' || label === 'Sprinkler Pressure'
    const isHighPressure = isPressure && parseFloat(value) > THRESHOLDS.pressureMax

    const renderIcon = () => {
        switch (icon) {
            case 'clock':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l3 3" />
                    </svg>
                )
            case 'water':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                )
            case 'gauge':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                )
            case 'alert':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    </svg>
                )
            case 'check':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <path d="M23 6l-9.5 9.5-5-5L1 18" />
                        <polyline points="17 6 23 6 23 12" />
                    </svg>
                )
            case 'battery':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <rect x="2" y="7" width="18" height="10" rx="2" />
                        <line x1="22" y1="11" x2="22" y2="13" />
                    </svg>
                )
            case 'fuel':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                        <rect x="2" y="2" width="8" height="20" rx="1" />
                        <path d="M10 6h4l2 4-2 4h-4" />
                        <line x1="16" y1="10" x2="22" y2="10" />
                        <line x1="16" y1="14" x2="22" y2="14" />
                    </svg>
                )
            default:
                return null
        }
    }

    // ✨ GLASS-MORPHISM CARD STYLES ✨
    const cardClass = `
        stat-card h-full relative overflow-hidden 
        bg-card bg-opacity-50 backdrop-blur-md 
        border border-white/20 dark:border-border/50 
        rounded-xl p-4 
        transition-all duration-300 
        hover:shadow-2xl hover:scale-[1.02] 
        shadow-xl shadow-black/10 
        ${isHighPressure ? 'ring-2 ring-red-500 animate-pulse' : ''}
    `

    return (
        <div className={cardClass} style={{ '--accent': accent } as React.CSSProperties}>
            {/* Top accent bar – keep it glassy too */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: accent }}></div>
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-[11px] text-text2 uppercase tracking-wider font-semibold">{label}</div>
                    <div className="text-2xl font-bold mt-1" style={{ color: accent }}>
                        {value}
                        {isHighPressure && <span className="ml-1 text-red-500">⚠️</span>}
                    </div>
                    <div className="text-[11px] text-text2 mt-0.5">{sub}</div>
                </div>
                <div className="p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm">
                    {renderIcon()}
                </div>
            </div>
        </div>
    )
}

export default React.memo(StatCard)