import React from 'react'
import ReportFilters from '@/components/reports/ReportFilters'
import ReportTable from '@/components/reports/ReportTable'

const Reports: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <div className="text-[22px] font-extrabold tracking-[-.5px] mb-1">Reports</div>
            <div className="text-[13px] text-text2 mb-6">Download operational reports in PDF or Excel</div>

            <ReportFilters />

            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold flex items-center gap-2">
                        <span className="inline-block w-0.5 h-4 bg-cyan rounded"></span>
                        Pump Runtime Summary — Last 7 Days
                    </div>
                </div>
                <ReportTable
                    data={[
                        { pump: 'Hydrant Main', runtime: '42.6', starts: '28', pressure: '6.2 bar', faults: '0', efficiency: '98.2%', status: 'Good' },
                        { pump: 'Hydrant Jockey', runtime: '3.2', starts: '22', pressure: '6.1 bar', faults: '0', efficiency: '99.1%', status: 'Good' },
                        { pump: 'Sprinkler Main', runtime: '38.4', starts: '24', pressure: '5.8 bar', faults: '0', efficiency: '97.8%', status: 'Good' },
                        { pump: 'Sprinkler Jockey', runtime: '1.8', starts: '14', pressure: '5.7 bar', faults: '0', efficiency: '99.4%', status: 'Good' },
                        { pump: 'Diesel Backup', runtime: '0.5', starts: '2', pressure: 'N/A', faults: '0', efficiency: '100%', status: 'Test OK' },
                        { pump: 'Reserve #2', runtime: '12.4', starts: '8', pressure: '5.9 bar', faults: '1', efficiency: 'Fault', status: 'Fault' },
                    ]}
                />
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold flex items-center gap-2">
                        <span className="inline-block w-0.5 h-4 bg-cyan rounded"></span>
                        Alert History — Last 7 Days
                    </div>
                </div>
                <div className="bg-card border border-border2 rounded-xl overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Date/Time</th>
                                <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Alert</th>
                                <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Severity</th>
                                <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Device</th>
                                <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Resolved</th>
                                <th className="bg-bg2 px-4 py-3 text-left text-[11px] font-bold text-text2 uppercase tracking-[.5px] border-b border-border2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-border2">
                                <td className="px-4 py-3 text-xs mono">Jun 29, 09:14</td>
                                <td className="px-4 py-3 text-xs">Motor Overload Fault E-047</td>
                                <td className="px-4 py-3 text-xs"><span className="text-red font-bold">CRITICAL</span></td>
                                <td className="px-4 py-3 text-xs">Reserve #2</td>
                                <td className="px-4 py-3 text-xs">Pending</td>
                                <td className="px-4 py-3 text-xs">Maintenance dispatched</td>
                            </tr>
                            <tr className="hover:bg-border2">
                                <td className="px-4 py-3 text-xs mono">Jun 28, 14:22</td>
                                <td className="px-4 py-3 text-xs">Fuel Tank below 60%</td>
                                <td className="px-4 py-3 text-xs"><span className="text-amber font-bold">WARNING</span></td>
                                <td className="px-4 py-3 text-xs">Diesel Tank</td>
                                <td className="px-4 py-3 text-xs">Open</td>
                                <td className="px-4 py-3 text-xs">Refill scheduled</td>
                            </tr>
                            <tr className="hover:bg-border2">
                                <td className="px-4 py-3 text-xs mono">Jun 29, 03:22</td>
                                <td className="px-4 py-3 text-xs">Voltage Dip 392V</td>
                                <td className="px-4 py-3 text-xs"><span className="text-amber font-bold">WARNING</span></td>
                                <td className="px-4 py-3 text-xs">Hydrant Main</td>
                                <td className="px-4 py-3 text-xs">Auto-resolved</td>
                                <td className="px-4 py-3 text-xs">Log noted</td>
                            </tr>
                            <tr className="hover:bg-border2">
                                <td className="px-4 py-3 text-xs mono">Jun 27, 11:00</td>
                                <td className="px-4 py-3 text-xs">Jockey starts frequency</td>
                                <td className="px-4 py-3 text-xs"><span className="text-cyan font-bold">INFO</span></td>
                                <td className="px-4 py-3 text-xs">Hyd Jockey</td>
                                <td className="px-4 py-3 text-xs">Resolved</td>
                                <td className="px-4 py-3 text-xs">Pipe inspection done</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Reports