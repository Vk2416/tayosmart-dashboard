import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Pump } from '@/types'
import { getStatusBadge } from '@/utils/helpers'

interface PumpCardProps {
    pump: Pump
}

const PumpCard: React.FC<PumpCardProps> = ({ pump }) => {
    const navigate = useNavigate()

    const statusBadge = getStatusBadge(pump.status)
    const isFault = pump.status === 'fault'

    const getStatusLabel = () => {
        switch (pump.status) {
            case 'running':
                return 'Running'
            case 'standby':
                return 'Standby'
            case 'fault':
                return 'Fault'
            default:
                return 'Off'
        }
    }

    const getBarColor = () => {
        if (pump.status === 'fault') return 'var(--red)'
        if (pump.status === 'running') return 'var(--green)'
        return '#FFD60A'
    }

    const getBarOpacity = () => {
        if (pump.status === 'fault') return '0.3'
        return '1'
    }

    const cardClasses = `
        pump-card 
        ${pump.status === 'running' ? 'running' : ''} 
        ${isFault ? 'fault ring-2 ring-red-500 animate-pulse' : ''}
    `

    return (
        <div className={cardClasses}>
            <div className="flex items-start justify-between mb-3.5">
                <div>
                    <div className="text-[13px] font-bold">{pump.name}</div>
                    <div className="text-[10px] text-text2 mt-0.5 uppercase tracking-[.4px]">{pump.type}</div>
                </div>
                <div className={`pump-status-badge ${statusBadge}`}>{getStatusLabel()}</div>
            </div>

            {isFault && (
                <div className="text-red-500 text-xs font-bold mb-2 text-center">⚠️ FAULT – Maintenance Required</div>
            )}

            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                <div className="bg-bg2 rounded-lg p-2.5">
                    <div className="text-[10px] text-text2 uppercase tracking-[.4px] mb-0.5">Pressure</div>
                    <div className="text-base font-bold text-text">
                        {pump.pressure}
                        {pump.pressure !== '—' && <span className="text-[10px] text-text2 ml-0.5">bar</span>}
                    </div>
                </div>
                <div className="bg-bg2 rounded-lg p-2.5">
                    <div className="text-[10px] text-text2 uppercase tracking-[.4px] mb-0.5">Flow Rate</div>
                    <div className="text-base font-bold text-text">
                        {pump.flow}
                        {pump.flow !== '—' && <span className="text-[10px] text-text2 ml-0.5">L/m</span>}
                    </div>
                </div>
                <div className="bg-bg2 rounded-lg p-2.5">
                    <div className="text-[10px] text-text2 uppercase tracking-[.4px] mb-0.5">Voltage</div>
                    <div className="text-base font-bold text-text">
                        {pump.voltage}
                        {pump.voltage !== '—' && <span className="text-[10px] text-text2 ml-0.5">V</span>}
                    </div>
                </div>
                <div className="bg-bg2 rounded-lg p-2.5">
                    <div className="text-[10px] text-text2 uppercase tracking-[.4px] mb-0.5">Current</div>
                    <div className="text-base font-bold text-text">
                        {pump.current}
                        {pump.current !== '—' && <span className="text-[10px] text-text2 ml-0.5">A</span>}
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <div className="flex justify-between text-[11px] text-text2 mb-1.5">
                    <span>Motor Load</span>
                    <span>{pump.status === 'fault' ? 'Offline' : `${pump.load}%`}</span>
                </div>
                <div className="h-1.5 bg-bg2 rounded-[3px] overflow-hidden">
                    <div
                        className="h-full rounded-[3px] transition-[width] duration-1000 ease-in-out"
                        style={{
                            width: pump.status === 'fault' ? '100%' : `${pump.load}%`,
                            background: getBarColor(),
                            opacity: getBarOpacity(),
                        }}
                    ></div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border2">
                <div>
                    <span className={`conn-dot ${pump.online ? 'conn-online' : 'conn-offline'}`}></span>
                    <span className="text-[11px] text-text2">{pump.online ? `Online · ${pump.lastSeen}` : 'Offline · Fault'}</span>
                </div>
                <button
                    className="text-[11px] text-cyan font-semibold px-2.5 py-1 rounded-md border border-cyan/20 transition-all duration-180 hover:bg-cyan/10 cursor-pointer"
                    onClick={() => navigate(`/pump/${pump.id}`)}
                >
                    View Details →
                </button>
            </div>
        </div>
    )
}

export default React.memo(PumpCard)