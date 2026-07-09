// src/utils/helpers.ts
import { SystemData } from '@/types'

export const generateMockData = (): SystemData => ({
    pressure: (6.0 + Math.random() * 0.5).toFixed(1),
    hydrantPressure: (6.2 + (Math.random() - 0.5) * 0.4).toFixed(1),
    sprinklerPressure: (5.8 + (Math.random() - 0.5) * 0.4).toFixed(1),
    dgBatteryHealth: Math.floor(82 + Math.random() * 15),
    runningPumps: 3,
    totalPumps: 6,
    waterLevel: 78,
    criticalAlerts: 3,
    onlineDevices: 18,
    totalDevices: 20,
    batteryHealth: 92,
})

export const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'running':
            return 'var(--green)'
        case 'standby':
            return 'var(--yellow)'
        case 'fault':
            return 'var(--red)'
        default:
            return 'var(--text3)'
    }
}

export const getStatusBadge = (status: string): string => {
    switch (status) {
        case 'running':
            return 'badge-running'
        case 'standby':
            return 'badge-standby'
        case 'fault':
            return 'badge-fault'
        default:
            return 'badge-off'
    }
}