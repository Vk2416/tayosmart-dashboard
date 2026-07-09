// src/components/dashboard/Dashboard.tsx
import React from 'react'
import { useData } from '@/context/DataContext'
import StatCard from '@/components/dashboard/StatCard'
import SystemOverview from '@/components/dashboard/SystemOverview'
import PumpGrid from '@/components/dashboard/PumpGrid'
import TankGrid from '@/components/dashboard/TankGrid'
import SectionHeader from '@/components/common/SectionHeader'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

const Dashboard: React.FC = () => {
    const { data, pumps, tanks, loading } = useData()

    if (loading) {
        return (
            <div className="animate-pulse p-8 text-text2">
                Loading system data...
            </div>
        )
    }

    const waterTank = tanks.find(t => t.id === 't1' || t.name === 'Main Water Tank')
    const dieselTank = tanks.find(t => t.id === 't4' || t.name === 'Diesel Fuel Tank')

    const stats = [
        {
            label: 'Running Pumps',
            value: `${data.runningPumps}`,
            sub: `of ${data.totalPumps} total`,
            accent: 'var(--green)',
            icon: 'clock',
        },
        {
            label: 'Hydrant Pressure',
            value: `${data.hydrantPressure} bar`,
            sub: 'Normal 5–8 bar',
            accent: 'var(--cyan)',
            icon: 'gauge',
        },
        {
            label: 'Sprinkler Pressure',
            value: `${data.sprinklerPressure} bar`,
            sub: 'Normal 5–8 bar',
            accent: '#A855F7',
            icon: 'gauge',
        },
        {
            label: 'DG Battery',
            value: `${data.dgBatteryHealth}%`,
            sub: 'UPS nominal',
            accent: 'var(--yellow)',
            icon: 'battery',
        },
        {
            label: 'Diesel Tank',
            value: `${dieselTank?.level || 0}%`,
            sub: `${dieselTank?.current || 0} L / ${dieselTank?.capacity || 0} L`,
            accent: 'var(--amber)',
            icon: 'fuel',
        },
        {
            label: 'Water Tank',
            value: `${waterTank?.level || 0}%`,
            sub: `${waterTank?.current || 0} L / ${waterTank?.capacity || 0} L`,
            accent: 'var(--cyan)',
            icon: 'water',
        },
        {
            label: 'Critical Alerts',
            value: `${data.criticalAlerts}`,
            sub: '1 high · 2 medium',
            accent: 'var(--red)',
            icon: 'alert',
        },
    ]

    return (
        <ErrorBoundary>
            <div className="animate-fade-in">
                <div className="text-[22px] font-extrabold tracking-[-.5px] mb-1">
                    Fire Fighting Dashboard
                </div>
                <div className="text-[13px] text-text2 mb-6">
                    Real-time system overview · Warehouse Block-A
                </div>

                {/* New stats row – single line, scrollable */}
                <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 mb-6 scrollbar-thin">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="min-w-[140px] flex-1">
                            <StatCard {...stat} />
                        </div>
                    ))}
                </div>

                <div className="hidden sm:block">
                    <SectionHeader title="Fire Fighting System Overview" />
                    <SystemOverview />
                </div>

                <div className="sm:hidden">
                    <SectionHeader title="Pump Status" />
                    <PumpGrid pumps={pumps} />
                    <SectionHeader title="Tank Levels" />
                    <TankGrid tanks={tanks} />
                </div>

                <div className="hidden sm:block">
                    <SectionHeader title="Pump Status" />
                    <PumpGrid pumps={pumps} />
                    <SectionHeader title="Tank Levels" />
                    <TankGrid tanks={tanks} />
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default Dashboard