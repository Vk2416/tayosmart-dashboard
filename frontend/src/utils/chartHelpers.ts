import { ChartOptions } from 'chart.js'

export const getChartDefaults = (isDark: boolean) => {
    const textColor = isDark ? '#7B8DB0' : '#4A5568'
    const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'

    return {
        textColor,
        gridColor,
        commonOptions: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
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
        } as ChartOptions,
    }
}

export const generatePressureData = (hours: string[]) => {
    return hours.map((_, i) => {
        const base = 6.0
        const noise = Math.sin(i * 0.5) + Math.random() * 0.4 - 0.2
        return Math.max(4.5, Math.min(8, +(base + noise).toFixed(2)))
    })
}

export const generateVoltageData = (hours: string[]) => {
    return hours.map((_, i) => {
        const base = 415
        const v = base + Math.sin(i * 0.8) * 3 + Math.random() * 2 - 1
        if (i === 3) return 392
        return Math.round(v)
    })
}

export const generateOnOffData = (hours: string[]) => {
    return hours.map((_, i) => {
        if (i >= 6 && i <= 9) return 1
        if (i >= 11 && i <= 23) return 1
        return 0
    })
}