import React from 'react'
import { Tank } from '@/types'
import TankCard from './TankCard'

interface TankGridProps {
    tanks: Tank[]
}

const TankGrid: React.FC<TankGridProps> = ({ tanks }) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mb-6">
            {tanks.map((tank) => (
                <TankCard key={tank.id} tank={tank} />
            ))}
        </div>
    )
}

export default React.memo(TankGrid)