export interface Pump {
    id: string
    name: string
    type: string
    status: 'running' | 'standby' | 'fault' | 'off'
    pressure: string
    flow: string
    voltage: string
    current: string
    load: number
    temp: string
    fuel?: number
    faultCode?: string
    faultSince?: string
    online: boolean
    lastSeen: string
}

export interface Tank {
    id: string
    name: string
    subtype: string
    level: number
    current: number | string
    capacity: number
    fuel?: boolean
    battery?: boolean
}

export interface Alert {
    id: string
    title: string
    detail: string
    severity: 'critical' | 'warning' | 'info'
    time: string
    device: string
}

export interface SystemData {
    pressure: string
    hydrantPressure: string      // 👈 new
    sprinklerPressure: string    // 👈 new
    dgBatteryHealth: number      // 👈 new
    runningPumps: number
    totalPumps: number
    waterLevel: number
    criticalAlerts: number
    onlineDevices: number
    totalDevices: number
    batteryHealth: number
}