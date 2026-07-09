import React from 'react'

interface Pipe {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  dashed?: boolean
  arrow?: boolean
}

interface Props {
  pipe: Pipe
}

const PipeSVG: React.FC<Props> = ({ pipe }) => {
  const strokeDasharray = pipe.dashed ? '4,3' : undefined
  const markerEnd = pipe.arrow ? 'url(#arrow-blue)' : undefined
  return (
    <line
      x1={pipe.from.x}
      y1={pipe.from.y}
      x2={pipe.to.x}
      y2={pipe.to.y}
      stroke={pipe.color}
      strokeWidth="2.5"
      strokeDasharray={strokeDasharray}
      markerEnd={markerEnd}
      opacity=".8"
    />
  )
}

export default PipeSVG