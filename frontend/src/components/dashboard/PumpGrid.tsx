import React from 'react'
import { Pump } from '@/types'
import PumpCard from './PumpCard'

interface PumpGridProps {
    pumps: Pump[]
}

const PumpGrid: React.FC<PumpGridProps> = ({ pumps }) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 mb-6">
            {pumps.map((pump) => (
                <PumpCard key={pump.id} pump={pump} />
            ))}
        </div>
    )
}

export default React.memo(PumpGrid)