import React from 'react'

interface AlarmCardProps {
    title: string
    color: string
    settings: Array<{
        key: string
        label: string
        desc: string
        value: number
        unit: string
    }>
    onInputChange: (key: string, value: string) => void
    notifications?: Array<{
        key: string
        label: string
        desc: string
        value: boolean
    }>
    onToggle?: (key: string) => void
}

const AlarmCard: React.FC<AlarmCardProps> = ({
    title,
    color,
    settings,
    onInputChange,
    notifications,
    onToggle,
}) => {
    return (
        <div className="bg-card border border-border2 rounded-xl p-5">
            <div className="text-[13px] font-bold mb-4" style={{ color }}>
                {title}
            </div>

            {settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-border2 last:border-b-0">
                    <div>
                        <div className="text-xs font-semibold">{setting.label}</div>
                        <div className="text-[11px] text-text2 mt-px">{setting.desc}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="number"
                            className="w-[90px] bg-bg2 border border-border rounded-[7px] px-2.5 py-1.5 text-text text-xs text-right outline-none transition-colors duration-200 focus:border-cyan"
                            value={setting.value}
                            onChange={(e) => onInputChange(setting.key, e.target.value)}
                            step="0.1"
                        />
                        <span className="text-[11px] text-text2">{setting.unit}</span>
                    </div>
                </div>
            ))}

            {notifications &&
                notifications.map((notif) => (
                    <div key={notif.key} className="flex items-center justify-between py-3 border-b border-border2 last:border-b-0">
                        <div>
                            <div className="text-xs font-semibold">{notif.label}</div>
                            <div className="text-[11px] text-text2 mt-px">{notif.desc}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`toggle ${notif.value ? 'on' : ''}`}
                                onClick={() => onToggle && onToggle(notif.key)}
                            ></div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AlarmCard