import React, { ReactNode } from 'react'

interface SectionHeaderProps {
    title: string
    actions?: ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, actions }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold flex items-center gap-2">
                <span className="inline-block w-0.5 h-4 bg-cyan rounded"></span>
                {title}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
        </div>
    )
}

export default SectionHeader