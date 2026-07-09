import React from 'react'
import { ControlPanelData } from '../systemData'

interface Props {
  panel: ControlPanelData
}

const ControlPanelSVG: React.FC<Props> = ({ panel }) => {
  return (
    <g transform={`translate(${panel.x}, ${panel.y})`} style={{ cursor: 'pointer' }}>
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
      <text x="50" y="139" textAnchor="middle" fill="var(--cyan)" fontSize="8" fontFamily="JetBrains Mono,monospace" fontWeight="700">{panel.status}</text>
    </g>
  )
}

export default ControlPanelSVG