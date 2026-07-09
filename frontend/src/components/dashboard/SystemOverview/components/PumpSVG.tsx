import React from 'react'
import { PumpData } from '../systemData'

interface Props {
  pump: PumpData
}

const PumpSVG: React.FC<Props> = ({ pump }) => {
  const isRunning = pump.status === 'running'
  const isStandby = pump.status === 'standby'
  const isFault = pump.status === 'fault'
  const color = isRunning ? 'var(--green)' : isStandby ? '#FFD60A' : isFault ? 'var(--red)' : 'var(--text3)'
  const spinClass = isRunning ? 'spin-pump' : ''

  return (
    <g transform={`translate(${pump.x}, ${pump.y})`} style={{ cursor: 'pointer' }}>
      <rect width="120" height="75" rx="9" fill="var(--card)" stroke={color} strokeWidth="1.5" />
      <text x="60" y="14" textAnchor="middle" fill={color} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">
        {pump.label}
      </text>
      <circle cx="60" cy="42" r="20" fill="none" stroke="#1A3A2A" strokeWidth="8" />
      <circle
        cx="60"
        cy="42"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={isRunning ? '70 56' : '20 56'}
        opacity={isRunning ? 1 : 0.6}
        className={spinClass}
      />
      <text x="60" y="66" textAnchor="middle" fill="var(--text2)" fontSize="9" fontFamily="Inter,sans-serif">
        {pump.pressure} bar · {pump.flow} L/m
      </text>
      {isRunning && (
        <circle cx="108" cy="10" r="4" fill="var(--green)" filter="url(#glow-green)" className="pulse-dot" />
      )}
      {isStandby && <circle cx="108" cy="10" r="4" fill="#FFD60A" />}
      {isFault && <circle cx="108" cy="10" r="4" fill="var(--red)" filter="url(#glow-red)" className="pulse-dot" />}
      {!isRunning && !isStandby && !isFault && <circle cx="108" cy="10" r="4" fill="var(--text3)" />}
    </g>
  )
}

export default PumpSVG