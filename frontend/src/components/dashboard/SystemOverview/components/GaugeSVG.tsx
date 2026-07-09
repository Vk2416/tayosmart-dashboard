import React from 'react'
import { GaugeData } from '../systemData'

interface Props {
  gauge: GaugeData
}

const GaugeSVG: React.FC<Props> = ({ gauge }) => {
  return (
    <g transform={`translate(${gauge.x}, ${gauge.y})`} style={{ cursor: 'pointer' }}>
      <circle cx="20" cy="20" r="18" fill="var(--card)" stroke="#00D4FF" strokeWidth="1.5" />
      <text x="20" y="17" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="JetBrains Mono,monospace" fontWeight="700">
        {gauge.value}
      </text>
      <text x="20" y="27" textAnchor="middle" fill="var(--text2)" fontSize="7" fontFamily="Inter,sans-serif">
        {gauge.unit}
      </text>
      <circle cx="20" cy="20" r="18" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="70 43" strokeDashoffset="-5" opacity=".5">
        <animate attributeName="stroke-dashoffset" values="-5;-10;-5" dur="3s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

export default GaugeSVG