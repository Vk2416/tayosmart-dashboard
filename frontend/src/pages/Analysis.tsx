import React from 'react'
import SectionHeader from '@/components/common/SectionHeader'
import AnalysisCharts from '@/components/analysis/AnalysisCharts'
import AnalysisStats from '@/components/analysis/AnalysisStats'
import EventLogTable from '@/components/analysis/EventLogTable'

const Analysis: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <div className="text-[22px] font-extrabold tracking-[-.5px] mb-1">System Analysis</div>
            <div className="text-[13px] text-text2 mb-6">Detailed performance graphs for each pump and sensor</div>

            <SectionHeader title="Select Pump / Sensor" />
            <div className="flex gap-2.5 flex-wrap mb-5">
                {['Hydrant Main', 'Hyd Jockey', 'Spr Main', 'Diesel', 'Water Tank'].map((label) => (
                    <span key={label} className="chip active">
                        {label}
                    </span>
                ))}
            </div>

            <AnalysisStats />

            <div className="grid grid-cols-2 gap-4 mb-6">
                <AnalysisCharts />
            </div>

            <SectionHeader title="Pump Event Log — Today" />
            <EventLogTable />
        </div>
    )
}

export default Analysis