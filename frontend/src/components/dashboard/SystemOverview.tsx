import React, { useState } from 'react'

interface TooltipRow {
    label: string
    value: string
}

interface TooltipState {
    visible: boolean
    title: string
    rows: TooltipRow[]
    x: number
    y: number
}

const SystemOverview: React.FC = () => {
    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        title: '',
        rows: [],
        x: 0,
        y: 0,
    })

    // Unified showTooltip – works for mouse (has clientX/Y) and keyboard (uses bounding rect)
    const showTooltip = (
    e: React.MouseEvent<SVGGElement> | React.FocusEvent<SVGGElement>,
    title: string,
    ...pairs: string[]
) => {
    const rows: TooltipRow[] = [];
    for (let i = 0; i < pairs.length; i += 2) {
        rows.push({ label: pairs[i], value: pairs[i + 1] });
    }

    let x: number, y: number;
    if ('clientX' in e) {
        // Mouse event – use cursor position
        x = e.clientX + 16;
        y = e.clientY - 8;
    } else {
        // Keyboard focus event – position below the element
        const rect = e.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2 - 80; // roughly center
        y = rect.bottom + 8;
    }

    setTooltip({
        visible: true,
        title,
        rows,
        x,
        y,
    });
};

    const moveTooltip = (e: React.MouseEvent<SVGGElement>) => {
        if (!tooltip.visible) return
        setTooltip((prev) => ({
            ...prev,
            x: e.clientX + 16,
            y: e.clientY - 8,
        }))
    }

    const hideTooltip = () => {
        setTooltip((prev) => ({ ...prev, visible: false }))
    }

    return (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[10px] font-bold text-green bg-green/10 border border-green/25 px-2 py-0.75 rounded-md tracking-[.6px]">LIVE</div>

            {/* Tooltip */}
            {tooltip.visible && (
                <div
                    className="fixed z-[500] pointer-events-none bg-card border border-border rounded-[10px] p-[10px_14px] text-xs shadow-card min-w-[160px]"
                    style={{ left: tooltip.x, top: tooltip.y }}
                >
                    <div className="font-bold text-[13px] mb-1.5">{tooltip.title}</div>
                    {tooltip.rows.map((row, idx) => (
                        <div key={idx} className="flex justify-between gap-5 mb-0.5 text-text2">
                            <span>{row.label}</span>
                            <span className="text-text font-semibold">{row.value}</span>
                        </div>
                    ))}
                </div>
            )}

            <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-[420px]">
                <defs>
                    <filter id="glow-blue">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="glow-green">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="glow-red">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                        <path d="M0 0 L8 3 L0 6 Z" fill="#00D4FF" opacity=".8" />
                    </marker>
                    <marker id="arrow-green" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                        <path d="M0 0 L8 3 L0 6 Z" fill="#00FF88" opacity=".8" />
                    </marker>
                    <linearGradient id="tank-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity=".5" />
                        <stop offset="100%" stopColor="#0055AA" stopOpacity=".9" />
                    </linearGradient>
                    <linearGradient id="fuel-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6B35" stopOpacity=".5" />
                        <stop offset="100%" stopColor="#AA3300" stopOpacity=".9" />
                    </linearGradient>
                    <style>
                        {`
                            .pulse-dot { animation: pulse 2s ease-in-out infinite; }
                            @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
                            .spin-pump { animation: spin 2s linear infinite; transform-origin: 60px 42px; }
                            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                            .flow-particle { animation: flow 3s linear infinite; }
                            @keyframes flow { from { transform: translateX(0); } to { transform: translateX(405px); } }
                            .flow-particle2 { animation: flow2 3.5s linear infinite; }
                            @keyframes flow2 { from { transform: translateX(0); } to { transform: translateX(405px); } }
                            /* Focus outline for keyboard users */
                            svg g:focus { outline: 2px solid var(--cyan); outline-offset: 2px; }
                        `}
                    </style>
                </defs>

                <rect width="900" height="380" rx="12" fill="var(--bg2)" opacity=".4" />

                <text x="20" y="24" fill="var(--text2)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing=".5">MAIN POWER</text>
                <text x="720" y="24" fill="var(--text2)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing=".5">HYDRANT NETWORK</text>
                <text x="20" y="360" fill="var(--text2)" fontSize="10" fontFamily="Inter,sans-serif">tap elements for details</text>

                {/* POWER SUPPLY */}
                <g
                    transform="translate(18,36)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Power Supply', 'Voltage', '415V 3Ø', 'Status', 'NORMAL', 'Load', '68%')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Power Supply', 'Voltage', '415V 3Ø', 'Status', 'NORMAL', 'Load', '68%')}
                    onBlur={hideTooltip}
                >
                    <rect width="110" height="70" rx="8" fill="var(--card)" stroke="#FFD60A" strokeWidth="1.5" opacity=".9" />
                    <text x="55" y="18" textAnchor="middle" fill="#FFD60A" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">POWER SUPPLY</text>
                    <text x="55" y="35" textAnchor="middle" fill="var(--text)" fontSize="18" fontFamily="JetBrains Mono,monospace" fontWeight="700">415V</text>
                    <text x="55" y="50" textAnchor="middle" fill="var(--text2)" fontSize="10" fontFamily="Inter,sans-serif">3-Phase · 68% load</text>
                    <circle cx="96" cy="10" r="4" fill="#00FF88" className="pulse-dot" />
                </g>

                {/* WATER TANK */}
                <g
                    transform="translate(18,130)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Main Water Tank', 'Level', '78%', 'Capacity', '50,000 L', 'Status', 'NORMAL')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Main Water Tank', 'Level', '78%', 'Capacity', '50,000 L', 'Status', 'NORMAL')}
                    onBlur={hideTooltip}
                >
                    <rect width="110" height="100" rx="8" fill="var(--card)" stroke="#00D4FF" strokeWidth="1.5" opacity=".9" />
                    <text x="55" y="16" textAnchor="middle" fill="var(--cyan)" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">WATER TANK</text>
                    <rect x="25" y="22" width="60" height="64" rx="4" fill="var(--bg2)" stroke="var(--border)" strokeWidth="1" />
                    <rect x="26" y="71" width="58" height="14" rx="0 0 3 3" fill="url(#tank-grad)" />
                    <text x="55" y="87" textAnchor="middle" fill="white" fontSize="13" fontFamily="JetBrains Mono,monospace" fontWeight="700">78%</text>
                </g>

                {/* FUEL TANK */}
                <g
                    transform="translate(18,256)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Diesel Fuel Tank', 'Level', '55%', 'Capacity', '2,000 L', 'Status', 'OK')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Diesel Fuel Tank', 'Level', '55%', 'Capacity', '2,000 L', 'Status', 'OK')}
                    onBlur={hideTooltip}
                >
                    <rect width="110" height="100" rx="8" fill="var(--card)" stroke="#FF6B35" strokeWidth="1.5" opacity=".9" />
                    <text x="55" y="16" textAnchor="middle" fill="var(--amber)" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">FUEL TANK</text>
                    <rect x="25" y="22" width="60" height="64" rx="4" fill="var(--bg2)" stroke="var(--border)" strokeWidth="1" />
                    <rect x="26" y="49" width="58" height="36" rx="0 0 3 3" fill="url(#fuel-grad)" />
                    <text x="55" y="87" textAnchor="middle" fill="white" fontSize="13" fontFamily="JetBrains Mono,monospace" fontWeight="700">55%</text>
                </g>

                {/* Lines (non‑interactive) – no changes */}

                {/* HYD MAIN */}
                <g
                    transform="translate(185,50)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Hydrant Main Pump', 'Status', 'RUNNING', 'Pressure', '6.2 bar', 'Flow', '420 L/min', 'Voltage', '415V')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Hydrant Main Pump', 'Status', 'RUNNING', 'Pressure', '6.2 bar', 'Flow', '420 L/min', 'Voltage', '415V')}
                    onBlur={hideTooltip}
                >
                    <rect width="120" height="75" rx="9" fill="var(--card)" stroke="var(--green)" strokeWidth="1.5" />
                    <text x="60" y="14" textAnchor="middle" fill="var(--green)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">HYD MAIN</text>
                    <circle cx="60" cy="42" r="20" fill="none" stroke="#1A3A2A" strokeWidth="8" />
                    <circle cx="60" cy="42" r="20" fill="none" stroke="var(--green)" strokeWidth="8" strokeDasharray="70 56" className="spin-pump" />
                    <text x="60" y="66" textAnchor="middle" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif">6.2 bar · 420 L/m</text>
                    <circle cx="108" cy="10" r="4" fill="var(--green)" filter="url(#glow-green)" className="pulse-dot" />
                </g>

                {/* HYD JOCKEY */}
                <g
                    transform="translate(185,148)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Hydrant Jockey Pump', 'Status', 'STANDBY', 'Pressure', '6.1 bar', 'Flow', '80 L/min', 'Voltage', '415V')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Hydrant Jockey Pump', 'Status', 'STANDBY', 'Pressure', '6.1 bar', 'Flow', '80 L/min', 'Voltage', '415V')}
                    onBlur={hideTooltip}
                >
                    <rect width="120" height="75" rx="9" fill="var(--card)" stroke="#FFD60A" strokeWidth="1.5" />
                    <text x="60" y="14" textAnchor="middle" fill="#FFD60A" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">HYD JOCKEY</text>
                    <circle cx="60" cy="42" r="20" fill="none" stroke="#2A2A10" strokeWidth="8" />
                    <circle cx="60" cy="42" r="20" fill="none" stroke="#FFD60A" strokeWidth="8" strokeDasharray="20 56" opacity=".6" />
                    <text x="60" y="66" textAnchor="middle" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif">STANDBY</text>
                    <circle cx="108" cy="10" r="4" fill="#FFD60A" />
                </g>

                {/* SPR MAIN */}
                <g
                    transform="translate(185,246)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Sprinkler Main Pump', 'Status', 'RUNNING', 'Pressure', '5.8 bar', 'Flow', '380 L/min', 'Voltage', '415V')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Sprinkler Main Pump', 'Status', 'RUNNING', 'Pressure', '5.8 bar', 'Flow', '380 L/min', 'Voltage', '415V')}
                    onBlur={hideTooltip}
                >
                    <rect width="120" height="75" rx="9" fill="var(--card)" stroke="var(--green)" strokeWidth="1.5" />
                    <text x="60" y="14" textAnchor="middle" fill="var(--green)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">SPR MAIN</text>
                    <circle cx="60" cy="42" r="20" fill="none" stroke="#1A3A2A" strokeWidth="8" />
                    <circle cx="60" cy="42" r="20" fill="none" stroke="var(--green)" strokeWidth="8" strokeDasharray="70 56" className="spin-pump" />
                    <text x="60" y="66" textAnchor="middle" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif">5.8 bar · 380 L/m</text>
                    <circle cx="108" cy="10" r="4" fill="var(--green)" filter="url(#glow-green)" className="pulse-dot" />
                </g>

                {/* DIESEL BACKUP */}
                <g
                    transform="translate(185,340)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Diesel Backup Pump', 'Status', 'STANDBY', 'Fuel', '55%', 'Voltage', '—', 'Mode', 'Auto-start')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Diesel Backup Pump', 'Status', 'STANDBY', 'Fuel', '55%', 'Voltage', '—', 'Mode', 'Auto-start')}
                    onBlur={hideTooltip}
                >
                    <rect width="120" height="35" rx="9" fill="var(--card)" stroke="var(--amber)" strokeWidth="1.5" opacity=".9" />
                    <text x="20" y="14" fill="var(--amber)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">DIESEL BACKUP</text>
                    <text x="20" y="26" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif">STANDBY — Auto-start</text>
                    <circle cx="108" cy="10" r="4" fill="var(--amber)" />
                </g>

                {/* Pipes with flow – not interactive, skip */}
                 {/* ========== PIPES WITH FLOW (VISIBLE + INTERACTIVE) ========== */}

                {/* 1. TOP PIPE: Hydrant Main Line */}
                <g
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => showTooltip(e, 'Hydrant Main Pipe', 'Flow Direction', 'Pumps → Hydrant', 'Pressure', '6.2 bar', 'Flow Rate', '420 L/min', 'Status', 'NORMAL')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Hydrant Main Pipe', 'Flow Direction', 'Pumps → Hydrant', 'Pressure', '6.2 bar', 'Flow Rate', '420 L/min', 'Status', 'NORMAL')}
                    onBlur={hideTooltip}
           >
                {/* Pipe line – brighter and thicker */}
                    <line x1="305" y1="90" x2="710" y2="90" stroke="#00D4FF" strokeWidth="6" strokeLinecap="round" opacity="1" />
                {/* Glow effect */}
                    <line x1="305" y1="90" x2="710" y2="90" stroke="#00D4FF" strokeWidth="12" strokeLinecap="round" opacity="0.2" />
                {/* Animated flow particles */}
                    <circle r="5" fill="#00D4FF" opacity="0.9" className="flow-particle">
                     <animateMotion dur="3s" repeatCount="indefinite" path="M305,90 L710,90" />
                    </circle>
                    <circle r="3" fill="#00D4FF" opacity="0.6" className="flow-particle">
                     <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M305,90 L710,90" />
                    </circle>
                {/* Label */}
                    <text x="480" y="80" textAnchor="middle" fill="#00D4FF" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600" opacity="0.8">HYDRANT MAIN LINE</text>
                </g>

                {/* 2. BOTTOM PIPE: Sprinkler Main Line */}
                <g
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => showTooltip(e, 'Sprinkler Main Pipe', 'Flow Direction', 'Pumps → Sprinkler', 'Pressure', '5.8 bar', 'Flow Rate', '380 L/min', 'Status', 'NORMAL')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Sprinkler Main Pipe', 'Flow Direction', 'Pumps → Sprinkler', 'Pressure', '5.8 bar', 'Flow Rate', '380 L/min', 'Status', 'NORMAL')}
                    onBlur={hideTooltip}
                >
                    <line x1="305" y1="282" x2="710" y2="282" stroke="#A855F7" strokeWidth="6" strokeLinecap="round" opacity="1" />
                    <line x1="305" y1="282" x2="710" y2="282" stroke="#A855F7" strokeWidth="12" strokeLinecap="round" opacity="0.2" />
                    <circle r="5" fill="#A855F7" opacity="0.9" className="flow-particle2">
                     <animateMotion dur="3.5s" repeatCount="indefinite" path="M305,282 L710,282" />
                    </circle>
                    <circle r="3" fill="#A855F7" opacity="0.6" className="flow-particle2">
                     <animateMotion dur="3.5s" begin="1.7s" repeatCount="indefinite" path="M305,282 L710,282" />
                    </circle>
                    <text x="480" y="302" textAnchor="middle" fill="#A855F7" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600" opacity="0.8">SPRINKLER MAIN LINE</text>
                </g>

                {/* 3. VERTICAL RISER PIPE */}
                <g
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => showTooltip(e, 'Vertical Riser', 'Connects', 'Hydrant → Sprinkler', 'Pressure', '6.0 bar', 'Status', 'NORMAL')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Vertical Riser', 'Connects', 'Hydrant → Sprinkler', 'Pressure', '6.0 bar', 'Status', 'NORMAL')}
                    onBlur={hideTooltip}
                >
                    <line x1="305" y1="90" x2="305" y2="184" stroke="#00D4FF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                    <line x1="305" y1="184" x2="305" y2="282" stroke="#A855F7" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                    <line x1="305" y1="282" x2="305" y2="360" stroke="#FF6B35" strokeWidth="3" strokeDasharray="6,4" strokeLinecap="round" opacity="0.7" />
                    <text x="290" y="200" fill="#A855F7" fontSize="7" fontFamily="Inter,sans-serif" opacity="0.6" transform="rotate(-90, 290, 200)">RISER</text>
                </g>
                {/* PRESSURE GAUGE 1 */}
                <g
                    transform="translate(410,60)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Pressure Gauge — Zone A', 'Pressure', '6.2 bar', 'Status', 'NORMAL', 'Zone', 'Hydrant Main')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Pressure Gauge — Zone A', 'Pressure', '6.2 bar', 'Status', 'NORMAL', 'Zone', 'Hydrant Main')}
                    onBlur={hideTooltip}
                >
                    <circle cx="20" cy="20" r="18" fill="var(--card)" stroke="#00D4FF" strokeWidth="1.5" />
                    <text x="20" y="17" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="JetBrains Mono,monospace" fontWeight="700">6.2</text>
                    <text x="20" y="27" textAnchor="middle" fill="var(--text2)" fontSize="7" fontFamily="Inter,sans-serif">bar</text>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="70 43" strokeDashoffset="-5" opacity=".5">
                        <animate attributeName="stroke-dashoffset" values="-5;-10;-5" dur="3s" repeatCount="indefinite" />
                    </circle>
                </g>

                {/* PRESSURE GAUGE 2 */}
                <g
                    transform="translate(560,60)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Pressure Gauge — Zone B', 'Pressure', '5.9 bar', 'Status', 'NORMAL', 'Zone', 'Hydrant Branch')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Pressure Gauge — Zone B', 'Pressure', '5.9 bar', 'Status', 'NORMAL', 'Zone', 'Hydrant Branch')}
                    onBlur={hideTooltip}
                >
                    <circle cx="20" cy="20" r="18" fill="var(--card)" stroke="#00D4FF" strokeWidth="1.5" />
                    <text x="20" y="17" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="JetBrains Mono,monospace" fontWeight="700">5.9</text>
                    <text x="20" y="27" textAnchor="middle" fill="var(--text2)" fontSize="7" fontFamily="Inter,sans-serif">bar</text>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="65 48" strokeDashoffset="-5" opacity=".5" />
                </g>

                {/* PRESSURE GAUGE 3 */}
                <g
                    transform="translate(480,252)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Pressure Gauge — Sprinkler', 'Pressure', '5.8 bar', 'Status', 'NORMAL', 'Zone', 'Sprinkler Grid')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Pressure Gauge — Sprinkler', 'Pressure', '5.8 bar', 'Status', 'NORMAL', 'Zone', 'Sprinkler Grid')}
                    onBlur={hideTooltip}
                >
                    <circle cx="20" cy="20" r="18" fill="var(--card)" stroke="#A855F7" strokeWidth="1.5" />
                    <text x="20" y="17" textAnchor="middle" fill="#A855F7" fontSize="9" fontFamily="JetBrains Mono,monospace" fontWeight="700">5.8</text>
                    <text x="20" y="27" textAnchor="middle" fill="var(--text2)" fontSize="7" fontFamily="Inter,sans-serif">bar</text>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="63 50" opacity=".4" />
                </g>

                {/* HYDRANT ZONE */}
                <g
                    transform="translate(695,60)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Hydrant Zone A', 'Status', 'ACTIVE', 'Pressure', '6.2 bar', 'Flow', '420 L/min')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Hydrant Zone A', 'Status', 'ACTIVE', 'Pressure', '6.2 bar', 'Flow', '420 L/min')}
                    onBlur={hideTooltip}
                >
                    <rect width="60" height="60" rx="8" fill="var(--card)" stroke="var(--red)" strokeWidth="1.5" />
                    <text x="30" y="14" textAnchor="middle" fill="var(--red)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">HYDRANT</text>
                    <path d="M12,30 L30,22 L48,30 L30,40 Z" fill="var(--red)" opacity=".3" />
                    <path d="M12,30 L30,22 L48,30 L30,40 Z" fill="none" stroke="var(--red)" strokeWidth="1.5" />
                    <text x="30" y="54" textAnchor="middle" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">ZONE A</text>
                </g>

                {/* SPRINKLER GRID */}
                <g
                    transform="translate(695,252)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Sprinkler Grid B', 'Status', 'ACTIVE', 'Pressure', '5.8 bar', 'Flow', '380 L/min')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Sprinkler Grid B', 'Status', 'ACTIVE', 'Pressure', '5.8 bar', 'Flow', '380 L/min')}
                    onBlur={hideTooltip}
                >
                    <rect width="60" height="60" rx="8" fill="var(--card)" stroke="#A855F7" strokeWidth="1.5" />
                    <text x="30" y="14" textAnchor="middle" fill="#A855F7" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">SPRINKLER</text>
                    <text x="30" y="37" textAnchor="middle" fontSize="18">💧</text>
                    <text x="30" y="54" textAnchor="middle" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">GRID B</text>
                </g>

                {/* CONTROL PANEL */}
                <g
                    transform="translate(780,110)"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={(e) => showTooltip(e, 'Control Panel', 'Status', 'NORMAL', 'Power', '415V', 'Network', 'Online', 'Alarm', 'OK')}
                    onMouseMove={moveTooltip}
                    onMouseLeave={hideTooltip}
                    onFocus={(e) => showTooltip(e, 'Control Panel', 'Status', 'NORMAL', 'Power', '415V', 'Network', 'Online', 'Alarm', 'OK')}
                    onBlur={hideTooltip}
                >
                    <rect width="100" height="150" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
                    <text x="50" y="16" textAnchor="middle" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">CONTROL</text>
                    <text x="50" y="27" textAnchor="middle" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">PANEL</text>
                    <circle cx="25" cy="50" r="5" fill="var(--green)" className="pulse-dot" />
                    <text x="35" y="54" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">Power</text>
                    <circle cx="25" cy="70" r="5" fill="var(--green)" className="pulse-dot" style={{ animationDelay: '0.5s' }} />
                    <text x="35" y="74" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">Network</text>
                    <circle cx="25" cy="90" r="5" fill="#FFD60A" />
                    <text x="35" y="94" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">Alarm</text>
                    <circle cx="25" cy="110" r="5" fill="var(--green)" className="pulse-dot" style={{ animationDelay: '0.2s' }} />
                    <text x="35" y="114" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">Comms</text>
                    <rect x="15" y="128" width="70" height="14" rx="4" fill="var(--bg2)" stroke="var(--border)" strokeWidth="1" />
                    <text x="50" y="139" textAnchor="middle" fill="var(--cyan)" fontSize="8" fontFamily="JetBrains Mono,monospace" fontWeight="700">NORMAL</text>
                </g>

                <line x1="755" y1="185" x2="780" y2="185" stroke="var(--border)" strokeWidth="1" strokeDasharray="3,2" />
            </svg>
        </div>
    )
}

export default React.memo(SystemOverview)