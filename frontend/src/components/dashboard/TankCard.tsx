import React from 'react'
import { Tank } from '@/types'
import { THRESHOLDS } from '@/constants'   // <-- import thresholds

interface TankCardProps {
    tank: Tank
}

const TankCard: React.FC<TankCardProps> = ({ tank }) => {
    const isFuel = tank.fuel || false
    const isBattery = tank.battery || false
    const isLow = tank.level < THRESHOLDS.tankLow   // <-- detect low level

    const fillGradient = isFuel
        ? 'linear-gradient(180deg,rgba(255,107,53,0.4),rgba(200,60,20,0.7))'
        : isBattery
        ? 'linear-gradient(180deg,rgba(255,214,10,0.5),rgba(180,140,0,0.8))'
        : 'linear-gradient(180deg,rgba(0,212,255,0.4),rgba(0,100,200,0.7))'

    const displayValue = typeof tank.current === 'number' ? tank.current.toLocaleString() : tank.current
    const unit = isBattery ? 'V' : 'L'

    // Build container classes conditionally
    const cardClasses = `tank-card ${isLow ? 'border-2 border-red-500 animate-pulse' : ''}`

    return (
        <div className={cardClasses}>
            <div className="text-xs font-bold text-left mb-1">{tank.name}</div>
            <div className="text-[10px] text-text2 text-left uppercase tracking-[.4px] mb-4">{tank.subtype}</div>

            {/* Warning label for low level */}
            {isLow && (
                <div className="text-red-500 text-xs font-bold mb-1 text-center">⚠️ LOW LEVEL</div>
            )}

            <div className="relative w-20 h-[120px] mx-auto mb-3">
                <div className="absolute bottom-0 left-0 right-0 border-2 border-border rounded-lg h-full overflow-hidden bg-bg2">
                    <div
                        className="absolute bottom-0 left-0 right-0 rounded-b-[6px] transition-[height] duration-1000 ease-in-out"
                        style={{
                            height: `${tank.level}%`,
                            background: fillGradient,
                        }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-extrabold text-white [text-shadow:0_1px_4px_rgba(0,0,0,.5)]">
                            {tank.level}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-xs text-text2">
                <strong className="text-text font-bold">{displayValue}</strong> / {tank.capacity.toLocaleString()} {unit}
            </div>
        </div>
    )
}

export default React.memo(TankCard)