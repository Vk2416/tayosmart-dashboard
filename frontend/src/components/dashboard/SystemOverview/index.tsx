import React, { useState, useMemo } from 'react'
import { useData } from '@/context/DataContext'
import { systemLayout, type TooltipData } from './systemData'
import PumpSVG from './components/PumpSVG'
import TankSVG from './components/TankSVG'
import GaugeSVG from './components/GaugeSVG'
import HydrantSVG from './components/HydrantSVG'
import ControlPanelSVG from './components/ControlPanelSVG'
import PipeSVG from './components/PipeSVG'

// Helper to create tooltip data from key-value pairs
const tip = (title: string, ...pairs: string[]): TooltipData => {
  const rows: [string, string][] = []
  for (let i = 0; i < pairs.length; i += 2) {
    rows.push([pairs[i], pairs[i + 1]])
  }
  return { title, rows }
}

const SystemOverview: React.FC = () => {
  const { pumps: realPumps, tanks: realTanks, data } = useData()

  // Build the pump data for SVG using real values
  const pumpData = useMemo(() => {
    // We'll keep the positions from systemLayout, but overwrite values from realPumps
    const layoutPumps = systemLayout.pumps
    return layoutPumps.map((layoutPump) => {
      // Find matching real pump by id (or by name, etc.)
      const realPump = realPumps.find((p) => p.id === layoutPump.id)
      if (realPump) {
        return {
          ...layoutPump,
          status: realPump.status,
          pressure: realPump.pressure,
          flow: realPump.flow,
          voltage: realPump.voltage,
          // Update tooltip with real values
          tooltip: tip(
            realPump.name,
            'Status', realPump.status.toUpperCase(),
            'Pressure', `${realPump.pressure} bar`,
            'Flow', `${realPump.flow} L/min`,
            'Voltage', realPump.voltage
          ),
        }
      }
      return layoutPump
    })
  }, [realPumps])

  // Build tank data using real values
  const tankData = useMemo(() => {
    const layoutTanks = systemLayout.tanks
    return layoutTanks.map((layoutTank) => {
      // Find matching real tank by id
      const realTank = realTanks.find((t) => t.id === layoutTank.id)
      if (realTank) {
        return {
          ...layoutTank,
          level: realTank.level,
          // Update tooltip with real level
          tooltip: tip(
            realTank.name,
            'Level', `${realTank.level}%`,
            'Capacity', `${realTank.capacity.toLocaleString()} L`,
            'Status', 'NORMAL'
          ),
        }
      }
      return layoutTank
    })
  }, [realTanks])

  // Gauges can also be updated with real pressure if needed
  // For simplicity we keep them as is, but you could also update them from data

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    data: TooltipData | null
    x: number
    y: number
  }>({
    visible: false,
    data: null,
    x: 0,
    y: 0,
  })

  const showTooltip = (e: React.MouseEvent<SVGGElement>, data: TooltipData) => {
    setTooltip({
      visible: true,
      data,
      x: e.clientX + 16,
      y: e.clientY - 8,
    })
  }

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

  const withTooltip = (child: React.ReactNode, data: TooltipData, extraProps = {}) => {
    return (
      <g
        onMouseEnter={(e) => showTooltip(e, data)}
        onMouseMove={moveTooltip}
        onMouseLeave={hideTooltip}
        style={{ cursor: 'pointer' }}
        {...extraProps}
      >
        {child}
      </g>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 text-[10px] font-bold text-green bg-green/10 border border-green/25 px-2 py-0.75 rounded-md tracking-[.6px]">LIVE</div>

      {tooltip.visible && tooltip.data && (
        <div
          className="fixed z-[500] pointer-events-none bg-card border border-border rounded-[10px] p-[10px_14px] text-xs shadow-card min-w-[160px]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-bold text-[13px] mb-1.5">{tooltip.data.title}</div>
          {tooltip.data.rows.map(([label, value], idx) => (
            <div key={idx} className="flex justify-between gap-5 mb-0.5 text-text2">
              <span>{label}</span>
              <span className="text-text font-semibold">{value}</span>
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
          <linearGradient id="tank-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity=".5" />
            <stop offset="100%" stopColor="#0055AA" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="fuel-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity=".5" />
            <stop offset="100%" stopColor="#AA3300" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="battery-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD60A" stopOpacity=".5" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity=".9" />
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
            `}
          </style>
        </defs>

        <rect width="900" height="380" rx="12" fill="var(--bg2)" opacity=".4" />

        <text x="20" y="24" fill="var(--text2)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing=".5">MAIN POWER</text>
        <text x="720" y="24" fill="var(--text2)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing=".5">HYDRANT NETWORK</text>
        <text x="20" y="360" fill="var(--text2)" fontSize="10" fontFamily="Inter,sans-serif">tap elements for details</text>

        {/* Power Supply – static, but could be updated from data if needed */}
        {withTooltip(
          <>
            <rect x={systemLayout.powerSupply.x} y={systemLayout.powerSupply.y} width="110" height="70" rx="8" fill="var(--card)" stroke="#FFD60A" strokeWidth="1.5" opacity=".9" />
            <text x={systemLayout.powerSupply.x + 55} y={systemLayout.powerSupply.y + 18} textAnchor="middle" fill="#FFD60A" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">POWER SUPPLY</text>
            <text x={systemLayout.powerSupply.x + 55} y={systemLayout.powerSupply.y + 35} textAnchor="middle" fill="var(--text)" fontSize="18" fontFamily="JetBrains Mono,monospace" fontWeight="700">{systemLayout.powerSupply.voltage}</text>
            <text x={systemLayout.powerSupply.x + 55} y={systemLayout.powerSupply.y + 50} textAnchor="middle" fill="var(--text2)" fontSize="10" fontFamily="Inter,sans-serif">3-Phase · {systemLayout.powerSupply.load} load</text>
            <circle cx={systemLayout.powerSupply.x + 96} cy={systemLayout.powerSupply.y + 10} r="4" fill="#00FF88" className="pulse-dot" />
          </>,
          systemLayout.powerSupply.tooltip
        )}

        {/* Tanks – using real data from tankData */}
        {tankData.map(tank => withTooltip(<TankSVG key={tank.id} tank={tank} />, tank.tooltip))}

        {/* Pumps – using real data from pumpData */}
        {pumpData.map(pump => withTooltip(<PumpSVG key={pump.id} pump={pump} />, pump.tooltip))}

        {/* Gauges – could be updated with real pressure if you want */}
        {systemLayout.gauges.map(gauge => withTooltip(<GaugeSVG key={gauge.id} gauge={gauge} />, gauge.tooltip))}

        {/* Hydrants */}
        <g>
          <HydrantSVG hydrant={systemLayout.hydrants[0]} color="var(--red)" />
        </g>
        <g>
          <HydrantSVG hydrant={systemLayout.hydrants[1]} color="#A855F7" />
        </g>

        {/* Control Panel */}
        {withTooltip(<ControlPanelSVG panel={systemLayout.controlPanel} />, systemLayout.controlPanel.tooltip)}

        {/* Pipes */}
        {systemLayout.pipes.map((pipe, idx) => (
          <PipeSVG key={idx} pipe={pipe} />
        ))}

        {/* Flow particles – static, but you could animate based on pump status */}
        <circle r="4" fill="#00D4FF" opacity=".9" className="flow-particle">
          <animateMotion dur="3s" repeatCount="indefinite" path="M305,90 L710,90" />
        </circle>
        <circle r="3" fill="#00D4FF" opacity=".6" style={{ animation: 'flow 3s linear infinite', animationDelay: '1s' }}>
          <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M305,90 L710,90" />
        </circle>
        <circle r="4" fill="#A855F7" opacity=".8" className="flow-particle2">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M305,282 L710,282" />
        </circle>
      </svg>
    </div>
  )
}

export default SystemOverview