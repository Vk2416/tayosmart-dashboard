import React from 'react'
import { HydrantData } from '../systemData'

interface Props {
  hydrant: HydrantData
  color: string
}

const HydrantSVG: React.FC<Props> = ({ hydrant, color }) => {
  const isSprinkler = hydrant.label === 'SPRINKLER'
  return (
    <g transform={`translate(${hydrant.x}, ${hydrant.y})`} style={{ cursor: 'pointer' }}>
      <rect width="60" height="60" rx="8" fill="var(--card)" stroke={color} strokeWidth="1.5" />
      <text x="30" y="14" textAnchor="middle" fill={color} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">
        {hydrant.label}
      </text>
      {isSprinkler ? (
        <text x="30" y="37" textAnchor="middle" fontSize="18">💧</text>
      ) : (
        <>
          <path d="M12,30 L30,22 L48,30 L30,40 Z" fill={color} opacity=".3" />
          <path d="M12,30 L30,22 L48,30 L30,40 Z" fill="none" stroke={color} strokeWidth="1.5" />
        </>
      )}
      <text x="30" y="54" textAnchor="middle" fill="var(--text2)" fontSize="8" fontFamily="Inter,sans-serif">
        {hydrant.zone}
      </text>
    </g>
  )
}

export default HydrantSVG