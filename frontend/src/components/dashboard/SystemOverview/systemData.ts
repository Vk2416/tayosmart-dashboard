// All data for the system diagram – edit this to customize
export interface TooltipData {
  title: string
  rows: [string, string][] // array of [label, value]
}

export interface PumpData {
  id: string
  x: number
  y: number
  label: string
  status: 'running' | 'standby' | 'fault' | 'off'
  pressure: string
  flow: string
  voltage: string
  tooltip: TooltipData
}

export interface TankData {
  id: string
  x: number
  y: number
  label: string
  level: number
  capacity: number
  unit: string
  color: 'water' | 'fuel' | 'battery'
  tooltip: TooltipData
}

export interface GaugeData {
  id: string
  x: number
  y: number
  value: string
  unit: string
  zone: string
  tooltip: TooltipData
}

export interface HydrantData {
  id: string
  x: number
  y: number
  label: string
  zone: string
  tooltip: TooltipData
}

export interface ControlPanelData {
  x: number
  y: number
  status: string
  tooltip: TooltipData
}

export interface SystemLayout {
  powerSupply: {
    x: number
    y: number
    voltage: string
    load: string
    status: string
    tooltip: TooltipData
  }
  tanks: TankData[]
  pumps: PumpData[]
  gauges: GaugeData[]
  hydrants: HydrantData[]
  controlPanel: ControlPanelData
  pipes: {
    // pipe lines – we'll draw them programmatically
    from: { x: number; y: number }
    to: { x: number; y: number }
    color: string
    dashed?: boolean
    arrow?: boolean
  }[]
}

// Helper to build tooltips
const tip = (title: string, ...pairs: string[]): TooltipData => {
  const rows: [string, string][] = []
  for (let i = 0; i < pairs.length; i += 2) {
    rows.push([pairs[i], pairs[i + 1]])
  }
  return { title, rows }
}

export const systemLayout: SystemLayout = {
  powerSupply: {
    x: 18,
    y: 36,
    voltage: '415V',
    load: '68%',
    status: 'NORMAL',
    tooltip: tip('Power Supply', 'Voltage', '415V 3Ø', 'Status', 'NORMAL', 'Load', '68%'),
  },
  tanks: [
    {
      id: 'water-main',
      x: 18,
      y: 130,
      label: 'WATER TANK',
      level: 78,
      capacity: 50000,
      unit: 'L',
      color: 'water',
      tooltip: tip('Main Water Tank', 'Level', '78%', 'Capacity', '50,000 L', 'Status', 'NORMAL'),
    },
    {
      id: 'fuel-diesel',
      x: 18,
      y: 256,
      label: 'FUEL TANK',
      level: 55,
      capacity: 2000,
      unit: 'L',
      color: 'fuel',
      tooltip: tip('Diesel Fuel Tank', 'Level', '55%', 'Capacity', '2,000 L', 'Status', 'OK'),
    },
  ],
  pumps: [
    {
      id: 'hyd-main',
      x: 185,
      y: 50,
      label: 'HYD MAIN',
      status: 'running',
      pressure: '6.2',
      flow: '420',
      voltage: '415V',
      tooltip: tip('Hydrant Main Pump', 'Status', 'RUNNING', 'Pressure', '6.2 bar', 'Flow', '420 L/min', 'Voltage', '415V'),
    },
    {
      id: 'hyd-jockey',
      x: 185,
      y: 148,
      label: 'HYD JOCKEY',
      status: 'standby',
      pressure: '6.1',
      flow: '80',
      voltage: '415V',
      tooltip: tip('Hydrant Jockey Pump', 'Status', 'STANDBY', 'Pressure', '6.1 bar', 'Flow', '80 L/min', 'Voltage', '415V'),
    },
    {
      id: 'spr-main',
      x: 185,
      y: 246,
      label: 'SPR MAIN',
      status: 'running',
      pressure: '5.8',
      flow: '380',
      voltage: '415V',
      tooltip: tip('Sprinkler Main Pump', 'Status', 'RUNNING', 'Pressure', '5.8 bar', 'Flow', '380 L/min', 'Voltage', '415V'),
    },
    {
      id: 'diesel-backup',
      x: 185,
      y: 340,
      label: 'DIESEL BACKUP',
      status: 'standby',
      pressure: '—',
      flow: '500',
      voltage: '—',
      tooltip: tip('Diesel Backup Pump', 'Status', 'STANDBY', 'Fuel', '55%', 'Voltage', '—', 'Mode', 'Auto-start'),
    },
  ],
  gauges: [
    {
      id: 'gauge-1',
      x: 410,
      y: 60,
      value: '6.2',
      unit: 'bar',
      zone: 'Hydrant Main',
      tooltip: tip('Pressure Gauge — Zone A', 'Pressure', '6.2 bar', 'Status', 'NORMAL', 'Zone', 'Hydrant Main'),
    },
    {
      id: 'gauge-2',
      x: 560,
      y: 60,
      value: '5.9',
      unit: 'bar',
      zone: 'Hydrant Branch',
      tooltip: tip('Pressure Gauge — Zone B', 'Pressure', '5.9 bar', 'Status', 'NORMAL', 'Zone', 'Hydrant Branch'),
    },
    {
      id: 'gauge-3',
      x: 480,
      y: 252,
      value: '5.8',
      unit: 'bar',
      zone: 'Sprinkler Grid',
      tooltip: tip('Pressure Gauge — Sprinkler', 'Pressure', '5.8 bar', 'Status', 'NORMAL', 'Zone', 'Sprinkler Grid'),
    },
  ],
  hydrants: [
    {
      id: 'hydrant-a',
      x: 695,
      y: 60,
      label: 'HYDRANT',
      zone: 'ZONE A',
      tooltip: tip('Hydrant Zone A', 'Status', 'ACTIVE', 'Pressure', '6.2 bar', 'Flow', '420 L/min'),
    },
    {
      id: 'sprinkler-b',
      x: 695,
      y: 252,
      label: 'SPRINKLER',
      zone: 'GRID B',
      tooltip: tip('Sprinkler Grid B', 'Status', 'ACTIVE', 'Pressure', '5.8 bar', 'Flow', '380 L/min'),
    },
  ],
  controlPanel: {
    x: 780,
    y: 110,
    status: 'NORMAL',
    tooltip: tip('Control Panel', 'Status', 'NORMAL', 'Power', '415V', 'Network', 'Online', 'Alarm', 'OK'),
  },
  pipes: [
    // power to pumps
    { from: { x: 128, y: 71 }, to: { x: 180, y: 71 }, color: '#FFD60A', dashed: true },
    { from: { x: 128, y: 180 }, to: { x: 180, y: 180 }, color: '#00D4FF', arrow: true },
    { from: { x: 128, y: 290 }, to: { x: 180, y: 290 }, color: '#FF6B35', dashed: true, arrow: true },
    // main hydrant pipe
    { from: { x: 305, y: 90 }, to: { x: 710, y: 90 }, color: '#00D4FF' },
    // sprinkler pipe
    { from: { x: 305, y: 282 }, to: { x: 710, y: 282 }, color: '#A855F7' },
    // vertical connections
    { from: { x: 305, y: 90 }, to: { x: 305, y: 184 }, color: '#00D4FF', dashed: true },
    { from: { x: 305, y: 184 }, to: { x: 305, y: 282 }, color: '#00D4FF', dashed: true },
    { from: { x: 305, y: 282 }, to: { x: 305, y: 360 }, color: '#FF6B35', dashed: true },
    // to control panel
    { from: { x: 755, y: 185 }, to: { x: 780, y: 185 }, color: 'var(--border)', dashed: true },
  ],
}