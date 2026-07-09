import React from 'react'

interface ReportTableProps {
    data: Array<{
        pump: string
        runtime: string
        starts: string
        pressure: string
        faults: string
        efficiency: string
        status: string
    }>
}

const ReportTable: React.FC<ReportTableProps> = ({ data }) => {
    const getStatusBadge = (status: string) => {
        if (status === 'Good') {
            return <span className="pump-status-badge badge-running">Good</span>
        } else if (status === 'Test OK') {
            return <span className="pump-status-badge badge-standby">Test OK</span>
        } else {
            return <span className="pump-status-badge badge-fault">Fault</span>
        }
    }

    const getEfficiencyColor = (eff: string) => {
        if (eff.includes('Fault')) return 'var(--red)'
        if (eff.includes('%')) {
            const num = parseFloat(eff)
            if (num >= 98) return 'var(--green)'
            if (num >= 95) return 'var(--yellow)'
            return 'var(--amber)'
        }
        return 'var(--text)'
    }

    return (
        <div className="bg-card border border-border2 rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Pump</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Total Run (hrs)</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Starts</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Avg Pressure</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Faults</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Efficiency</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-border2">
                            <td className="px-4 py-3 text-xs"><strong>{row.pump}</strong></td>
                            <td className="px-4 py-3 text-xs">{row.runtime}</td>
                            <td className="px-4 py-3 text-xs">{row.starts}</td>
                            <td className="px-4 py-3 text-xs">{row.pressure}</td>
                            <td className="px-4 py-3 text-xs">{row.faults}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: getEfficiencyColor(row.efficiency) }}>
                                {row.efficiency}
                            </td>
                            <td className="px-4 py-3 text-xs">{getStatusBadge(row.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportTable