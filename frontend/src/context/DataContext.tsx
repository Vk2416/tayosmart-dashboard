// src/context/DataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateMockData } from '@/utils/helpers';
import { SystemData, Alert, Pump, Tank } from '@/types';

interface DataContextType {
  data: SystemData;
  updatePressure: () => void;
  alerts: Alert[];
  pumps: Pump[];
  tanks: Tank[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// ---------- STATIC DATA (from your previous version) ----------
const defaultAlerts: Alert[] = [
  {
    id: '1',
    title: '🔴 Reserve Pump #2 — Fault Code E-047',
    detail: 'Motor overload protection triggered. Pump offline since 09:14. Maintenance required.',
    severity: 'critical',
    time: '09:14 AM',
    device: 'Reserve #2',
  },
  {
    id: '2',
    title: '⚠️ Diesel Fuel Tank — Level Below 60%',
    detail: 'Current level: 55%. Refill recommended before next scheduled weekly test.',
    severity: 'warning',
    time: 'Yesterday',
    device: 'Diesel Tank',
  },
  {
    id: '3',
    title: '⚠️ Voltage Dip Detected — Hydrant Main Pump',
    detail: 'Voltage dropped to 392V for 4 seconds at 03:22. Auto-recovered.',
    severity: 'warning',
    time: '03:22 AM',
    device: 'Hydrant Main',
  },
  {
    id: '4',
    title: 'ℹ️ Scheduled Weekly Pump Test — Completed',
    detail: 'All 5 operational pumps tested successfully. Hydrant Main: 6.2 bar.',
    severity: 'info',
    time: '08:30 AM',
    device: 'All Pumps',
  },
  {
    id: '5',
    title: 'ℹ️ Jockey Pump Starts — 4x in 24 hours',
    detail: 'Hydrant Jockey started 4 times today. Normal range is 2–6.',
    severity: 'info',
    time: '11:00 AM',
    device: 'Hyd Jockey',
  },
];

const defaultPumps: Pump[] = [
  {
    id: 'p1',
    name: 'Hydrant Main Pump',
    type: 'Electric · Auto Mode',
    status: 'running',
    pressure: '6.2',
    flow: '420',
    voltage: '415',
    current: '38',
    load: 74,
    temp: '42',
    online: true,
    lastSeen: '2s ago',
  },
  {
    id: 'p2',
    name: 'Hydrant Jockey Pump',
    type: 'Electric · Pressure Maintenance',
    status: 'standby',
    pressure: '6.1',
    flow: '80',
    voltage: '415',
    current: '0',
    load: 0,
    temp: '32',
    online: true,
    lastSeen: '5s ago',
  },
  {
    id: 'p3',
    name: 'Sprinkler Main Pump',
    type: 'Electric · Auto Mode',
    status: 'running',
    pressure: '5.8',
    flow: '380',
    voltage: '415',
    current: '34',
    load: 68,
    temp: '38',
    online: true,
    lastSeen: '1s ago',
  },
  {
    id: 'p4',
    name: 'Sprinkler Jockey Pump',
    type: 'Electric · Pressure Maintenance',
    status: 'standby',
    pressure: '5.7',
    flow: '60',
    voltage: '415',
    current: '0',
    load: 0,
    temp: '29',
    online: true,
    lastSeen: '8s ago',
  },
  {
    id: 'p5',
    name: 'Diesel Backup Pump',
    type: 'Diesel Engine · Auto-start',
    status: 'standby',
    pressure: '—',
    flow: '500',
    voltage: '—',
    current: '—',
    load: 0,
    temp: '31',
    fuel: 55,
    online: true,
    lastSeen: '3s ago',
  },
  {
    id: 'p6',
    name: 'Reserve Pump #2',
    type: 'Electric · Under Maintenance',
    status: 'fault',
    pressure: '—',
    flow: '—',
    voltage: '—',
    current: '—',
    load: 0,
    temp: '—',
    faultCode: 'E-047',
    faultSince: '09:14',
    online: false,
    lastSeen: '09:14',
  },
];

const defaultTanks: Tank[] = [
  { id: 't1', name: 'Main Water Tank', subtype: 'Hydrant Supply', level: 78, current: 39000, capacity: 50000 },
  { id: 't2', name: 'Reserve Tank A', subtype: 'Sprinkler Supply', level: 62, current: 12400, capacity: 20000 },
  { id: 't3', name: 'Reserve Tank B', subtype: 'Emergency Buffer', level: 91, current: 9100, capacity: 10000 },
  { id: 't4', name: 'Diesel Fuel Tank', subtype: 'Backup Pump', level: 55, current: 1100, capacity: 2000, fuel: true },
  { id: 't5', name: 'UPS Battery A', subtype: 'Control Panel', level: 94, current: 12.8, capacity: 100, battery: true },
  { id: 't6', name: 'UPS Battery B', subtype: 'Pump Controllers', level: 89, current: 12.6, capacity: 100, battery: true },
];

// ---------- Data Provider ----------
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with mock data and static arrays
  const [data, setData] = useState<SystemData>(generateMockData());
  const [pumps] = useState<Pump[]>(defaultPumps);      // static, no updates
  const [tanks] = useState<Tank[]>(defaultTanks);      // static, no updates
  const [loading, setLoading] = useState(false);       // immediately ready

  // (Optional) simulate pressure fluctuation every 4 seconds (already in generateMockData's interval)
  // but we'll keep the existing interval from the original code:
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = { ...prev };
        const currentPressure = parseFloat(prev.pressure);
        const fluctuation = (Math.random() - 0.5) * 0.3;
        newData.pressure = Math.max(5.5, Math.min(7.0, currentPressure + fluctuation)).toFixed(1);
        return newData;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Manual pressure update (for testing)
  const updatePressure = () => {
    setData((prev) => {
      const newData = { ...prev };
      const currentPressure = parseFloat(prev.pressure);
      const fluctuation = (Math.random() - 0.5) * 0.4;
      newData.pressure = Math.max(5.0, Math.min(7.5, currentPressure + fluctuation)).toFixed(1);
      return newData;
    });
  };

  // ---------- Context value ----------
  const value: DataContextType = {
    data,
    updatePressure,
    alerts: defaultAlerts,
    pumps,
    tanks,
    loading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};