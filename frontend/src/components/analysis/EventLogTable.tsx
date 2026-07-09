import React from 'react'

const EventLogTable: React.FC = () => {
    const events = [
        { time: '11:45 AM', event: 'START', pressure: '6.2 bar', voltage: '415V', duration: '—', trigger: 'Auto — pressure drop' },
        { time: '09:30 AM', event: 'STOP', pressure: '6.0 bar', voltage: '414V', duration: '1h 12m', trigger: 'Manual stop' },
        { time: '08:18 AM', event: 'START', pressure: '5.9 bar', voltage: '413V', duration: '—', trigger: 'Scheduled test' },
        { time: '03:22 AM', event: 'VOLT DIP', pressure: '6.1 bar', voltage: '392V', duration: '4 sec', trigger: 'Grid fluctuation' },
        { time: '00:00 AM', event: 'STANDBY', pressure: '6.2 bar', voltage: '415V', duration: '—', trigger: 'Night mode' },
    ]

    const getEventBadge = (event: string) => {
        switch (event) {
            case 'START':
                return <span className="pump-status-badge badge-running">START</span>
            case 'STOP':
                return <span className="pump-status-badge badge-off">STOP</span>
            case 'STANDBY':
                return <span className="pump-status-badge badge-standby">STANDBY</span>
            case 'VOLT DIP':
                return <span className="pump-status-badge" style={{ background: 'rgba(255,107,53,0.15)', color: 'var(--amber)' }}>VOLT DIP</span>
            default:
                return <span className="pump-status-badge badge-running">{event}</span>
        }
    }

    return (
        <div className="bg-card border border-border2 rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Time</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Event</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Pressure</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Voltage</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Duration</th>
                        <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Trigger</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((evt, idx) => (
                        <tr key={idx} className="hover:bg-border2">
                            <td className="px-4 py-3 text-xs mono">{evt.time}</td>
                            <td className="px-4 py-3 text-xs">{getEventBadge(evt.event)}</td>
                            <td className="px-4 py-3 text-xs">{evt.pressure}</td>
                            <td className="px-4 py-3 text-xs">{evt.voltage}</td>
                            <td className="px-4 py-3 text-xs">{evt.duration}</td>
                            <td className="px-4 py-3 text-xs">{evt.trigger}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EventLogTable