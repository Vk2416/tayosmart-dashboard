import React from 'react'
import { useData } from '@/context/DataContext'

const AnalysisStats: React.FC = () => {
    const { data } = useData()

    const stats = [
        { label: 'Avg Pressure Today', value: '6.1 bar', sub: '↑ 0.2 vs yesterday', accent: 'var(--green)' },
        { label: 'Total Run Hours', value: '8.4 h', sub: 'Today · 7-day avg: 6.2h', accent: 'var(--cyan)' },
        { label: 'Voltage Dips', value: '2', sub: 'Min: 392V at 03:22', accent: 'var(--amber)' },
        { label: 'Total Starts', value: '6', sub: 'Last: 11:45 AM', accent: 'var(--purple)' },
    ]

    return (
        <div className="grid grid-cols-4 gap-3.5 mb-5">
            {stats.map((stat, idx) => (
                <div key={idx} className="stat-card" style={{ '--accent': stat.accent } as React.CSSProperties}>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-value" style={{ fontSize: '22px', color: stat.accent }}>
                        {stat.value}
                    </div>
                    <div className="stat-sub">{stat.sub}</div>
                </div>
            ))}
        </div>
    )
}

export default AnalysisStats