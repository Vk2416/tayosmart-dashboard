import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { getChartDefaults, generatePressureData, generateVoltageData } from '@/utils/chartHelpers'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

const AnalysisCharts: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const { textColor, gridColor } = getChartDefaults(isDark)

    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
    const pressureData = generatePressureData(hours)
    const voltageData = generateVoltageData(hours)

    const pressureChartData = {
        labels: hours,
        datasets: [
            {
                label: 'Pressure (bar)',
                data: pressureData,
                borderColor: '#00D4FF',
                backgroundColor: 'rgba(0,212,255,0.08)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 5,
            },
            {
                label: 'Low Alarm',
                data: Array(24).fill(4.5),
                borderColor: '#FF3366',
                borderDash: [6, 3],
                borderWidth: 1,
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'High Alarm',
                data: Array(24).fill(8.5),
                borderColor: '#FFD60A',
                borderDash: [6, 3],
                borderWidth: 1,
                pointRadius: 0,
                fill: false,
            },
        ],
    }

    const pressureOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    color: textColor,
                    font: { size: 11 },
                    boxWidth: 12,
                },
            },
            tooltip: {
                backgroundColor: isDark ? '#131B2E' : '#ffffff',
                titleColor: isDark ? '#E8F0FE' : '#0A0E1A',
                bodyColor: textColor,
                borderColor: isDark ? 'rgba(0,212,255,0.2)' : '#C5D0E8',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor },
            },
            y: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor },
            },
        },
    }

    const timelineHours = Array.from({ length: 24 }, (_, i) => `${i}h`)
    const onOffData = timelineHours.map((_, i) => {
        if (i >= 6 && i <= 9) return 1
        if (i >= 11 && i <= 23) return 1
        return 0
    })

    const timelineData = {
        labels: timelineHours,
        datasets: [
            {
                label: 'Running',
                data: onOffData,
                backgroundColor: onOffData.map((v) => (v ? 'rgba(0,255,136,0.5)' : 'rgba(255,255,255,0.04)')),
                borderColor: onOffData.map((v) => (v ? '#00FF88' : 'rgba(255,255,255,0.1)')),
                borderWidth: 1,
                borderRadius: 2,
            },
        ],
    }

    const timelineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: isDark ? '#131B2E' : '#ffffff',
                titleColor: isDark ? '#E8F0FE' : '#0A0E1A',
                bodyColor: textColor,
                borderColor: isDark ? 'rgba(0,212,255,0.2)' : '#C5D0E8',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                ticks: { color: textColor, font: { size: 9 } },
                grid: { color: gridColor },
            },
            y: {
                ticks: { color: textColor, font: { size: 10 }, callback: (v: any) => (v ? 'ON' : 'OFF') },
                grid: { color: gridColor },
                max: 1.2,
            },
        },
    }

    const voltageChartData = {
        labels: hours,
        datasets: [
            {
                label: 'Voltage (V)',
                data: voltageData,
                borderColor: '#FFD60A',
                backgroundColor: 'rgba(255,214,10,0.06)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 2,
                pointBackgroundColor: voltageData.map((v) => (v < 400 ? '#FF3366' : '#FFD60A')),
            },
        ],
    }

    const voltageOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: isDark ? '#131B2E' : '#ffffff',
                titleColor: isDark ? '#E8F0FE' : '#0A0E1A',
                bodyColor: textColor,
                borderColor: isDark ? 'rgba(0,212,255,0.2)' : '#C5D0E8',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor },
            },
            y: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor },
                min: 385,
                max: 445,
            },
        },
    }

    return (
        <>
            <div className="col-span-2 bg-card border border-border2 rounded-xl p-5">
                <div className="text-[13px] font-bold mb-4 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Pressure Over Time — Last 24 Hours (bar)
                </div>
                <div className="h-[220px]">
                    <Line data={pressureChartData} options={pressureOptions as any} />
                </div>
            </div>

            <div className="bg-card border border-border2 rounded-xl p-5">
                <div className="text-[13px] font-bold mb-4 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    Pump On/Off Timeline
                </div>
                <div className="h-[180px]">
                    <Bar data={timelineData} options={timelineOptions as any} />
                </div>
            </div>

            <div className="bg-card border border-border2 rounded-xl p-5">
                <div className="text-[13px] font-bold mb-4 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--yellow)" strokeWidth="2">
                        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Voltage Trend (V)
                </div>
                <div className="h-[180px]">
                    <Line data={voltageChartData} options={voltageOptions as any} />
                </div>
            </div>
        </>
    )
}

export default AnalysisCharts