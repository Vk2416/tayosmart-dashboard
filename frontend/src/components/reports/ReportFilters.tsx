import React from 'react'

const ReportFilters: React.FC = () => {
    return (
        <div className="flex gap-3 flex-wrap mb-5 items-center">
            <select className="bg-card border border-border rounded-[9px] px-3.5 py-2 text-text text-xs outline-none cursor-pointer">
                <option>All Pumps</option>
                <option>Hydrant Main</option>
                <option>Sprinkler Main</option>
                <option>Diesel Backup</option>
            </select>
            <select className="bg-card border border-border rounded-[9px] px-3.5 py-2 text-text text-xs outline-none cursor-pointer">
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range</option>
            </select>
            <select className="bg-card border border-border rounded-[9px] px-3.5 py-2 text-text text-xs outline-none cursor-pointer">
                <option>Pump Runtime</option>
                <option>Pressure Log</option>
                <option>Alert History</option>
                <option>Full System Report</option>
            </select>
            <button className="px-[18px] py-2 bg-cyan rounded-[9px] text-xs font-bold text-black transition-all duration-200 hover:opacity-85 hover:-translate-y-px">
                ⬇ Download PDF
            </button>
            <button className="px-[18px] py-2 bg-green rounded-[9px] text-xs font-bold text-black transition-all duration-200 hover:opacity-85 hover:-translate-y-px">
                ⬇ Download Excel
            </button>
        </div>
    )
}

export default ReportFilters