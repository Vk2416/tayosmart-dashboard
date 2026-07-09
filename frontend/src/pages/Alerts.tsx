import React from 'react'
import { useData } from '@/context/DataContext'
import AlertItem from '@/components/alerts/AlertItem'

const Alerts: React.FC = () => {
    const { alerts } = useData()

    return (
        <div className="animate-fade-in">
            <div className="text-[22px] font-extrabold tracking-[-.5px] mb-1">Alert List</div>
            <div className="text-[13px] text-text2 mb-6">All active and recent system alerts</div>

            <div className="flex gap-2.5 flex-wrap mb-5">
                {['All', 'Critical', 'Warning', 'Info'].map((label) => (
                    <span key={label} className={`chip ${label === 'All' ? 'active' : ''}`}>
                        {label}
                    </span>
                ))}
            </div>

            <div className="flex flex-col gap-2.5 mb-6">
                {alerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                ))}
            </div>
        </div>
    )
}

export default Alerts