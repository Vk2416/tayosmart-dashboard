import React from 'react'
import { TankData } from '../systemData'

interface Props {
  tank: TankData
}

const TankSVG: React.FC<Props> = ({ tank }) => {
  const color = tank.color === 'fuel' ? '#FF6B35' : tank.color === 'battery' ? '#FFD60A' : '#00D4FF'
  const gradId = tank.color === 'fuel' ? 'fuel-grad' : tank.color === 'battery' ? 'battery-grad' : 'tank-grad'
  const level = tank.level
  const capacityText = `${(tank.level / 100 * tank.capacity).toLocaleString()} / ${tank.capacity.toLocaleString()} ${tank.unit}`

  return (
    <g transform={`translate(${tank.x}, ${tank.y})`} style={{ cursor: 'pointer' }}>
      <rect width="110" height="100" rx="8" fill="var(--card)" stroke={color} strokeWidth="1.5" opacity=".9" />
      <text x="55" y="16" textAnchor="middle" fill={color} fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">
        {tank.label}
      </text>
      <rect x="25" y="22" width="60" height="64" rx="4" fill="var(--bg2)" stroke="var(--border)" strokeWidth="1" />
      <rect
        x="26"
        y={22 + (64 - (level / 100) * 64)}
        width="58"
        height={(level / 100) * 64}
        rx="0 0 3 3"
        fill={`url(#${gradId})`}
      />
      <text x="55" y="87" textAnchor="middle" fill="white" fontSize="13" fontFamily="JetBrains Mono,monospace" fontWeight="700">
        {level}%
      </text>
    </g>
  )
}

export default TankSVG