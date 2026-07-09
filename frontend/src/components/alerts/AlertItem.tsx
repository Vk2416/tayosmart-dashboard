import React from 'react'
import { Alert } from '@/types'

interface AlertItemProps {
    alert: Alert
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
    const severityClass = alert.severity
    const severityLabel = alert.severity.toUpperCase()

    return (
        <div className={`alert-item ${severityClass}`}>
            <div className={`alert-dot w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                severityClass === 'critical' ? 'bg-red shadow-[0_0_6px_var(--red)]' :
                severityClass === 'warning' ? 'bg-amber shadow-[0_0_6px_var(--amber)]' :
                'bg-cyan'
            }`}></div>
            <div className="flex-1">
                <div className="text-[13px] font-semibold mb-0.5">{alert.title}</div>
                <div className="text-[11px] text-text2">{alert.detail}</div>
            </div>
            <div className="text-[10px] text-text3 whitespace-nowrap pt-0.5 text-right">
                {alert.time}
                <br />
                <span className={`text-[9px] font-bold ${
                    severityClass === 'critical' ? 'text-red' :
                    severityClass === 'warning' ? 'text-amber' :
                    'text-cyan'
                }`}>{severityLabel}</span>
            </div>
        </div>
    )
}

export default AlertItem