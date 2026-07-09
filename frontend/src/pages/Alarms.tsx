import React, { useState } from 'react'
import AlarmCard from '@/components/alarms/AlarmCard'

const Alarms: React.FC = () => {
    const [alarmSettings, setAlarmSettings] = useState({
        pressureHigh: 8.5,
        pressureLow: 4.5,
        sprinklerHigh: 8.0,
        sprinklerLow: 4.0,
        waterLow: 30,
        reserveLow: 15,
        dieselLow: 40,
        dieselCritical: 20,
        voltageLow: 400,
        voltageHigh: 440,
        motorCurrent: 55,
        batteryLow: 11.5,
        email: true,
        sms: true,
        whatsapp: true,
        sound: false,
    })

    const handleToggle = (key: keyof typeof alarmSettings) => {
        if (typeof alarmSettings[key] === 'boolean') {
            setAlarmSettings((prev) => ({ ...prev, [key]: !prev[key] }))
        }
    }

    const handleInputChange = (key: keyof typeof alarmSettings, value: string) => {
        const num = parseFloat(value)
        if (!isNaN(num)) {
            setAlarmSettings((prev) => ({ ...prev, [key]: num }))
        }
    }

    return (
        <div className="animate-fade-in">
            <div className="text-[22px] font-extrabold tracking-[-.5px] mb-1">Set Alarms</div>
            <div className="text-[13px] text-text2 mb-6">Configure threshold-based notifications for each sensor</div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mb-6">
                <AlarmCard
                    title="🔵 Pressure Alarms"
                    color="var(--cyan)"
                    settings={[
                        { key: 'pressureHigh', label: 'Hydrant Line — High Limit', desc: 'Alert when pressure exceeds this value', value: alarmSettings.pressureHigh, unit: 'bar' },
                        { key: 'pressureLow', label: 'Hydrant Line — Low Limit', desc: 'Alert when pressure drops below this', value: alarmSettings.pressureLow, unit: 'bar' },
                        { key: 'sprinklerHigh', label: 'Sprinkler Line — High Limit', desc: 'Max acceptable sprinkler pressure', value: alarmSettings.sprinklerHigh, unit: 'bar' },
                        { key: 'sprinklerLow', label: 'Sprinkler Line — Low Limit', desc: 'Min pressure for sprinkler activation', value: alarmSettings.sprinklerLow, unit: 'bar' },
                    ]}
                    onInputChange={handleInputChange}
                />
                <AlarmCard
                    title="🟦 Tank Level Alarms"
                    color="var(--cyan)"
                    settings={[
                        { key: 'waterLow', label: 'Main Water Tank — Low Alert', desc: 'Notify when tank drops below this level', value: alarmSettings.waterLow, unit: '%' },
                        { key: 'reserveLow', label: 'Reserve Tank — Critical Low', desc: 'Emergency alert threshold', value: alarmSettings.reserveLow, unit: '%' },
                        { key: 'dieselLow', label: 'Diesel Fuel Tank — Low Alert', desc: 'Refill reminder threshold', value: alarmSettings.dieselLow, unit: '%' },
                        { key: 'dieselCritical', label: 'Fuel Tank — Critical', desc: 'Minimum safe diesel level', value: alarmSettings.dieselCritical, unit: '%' },
                    ]}
                    onInputChange={handleInputChange}
                />
                <AlarmCard
                    title="⚡ Electrical Alarms"
                    color="var(--yellow)"
                    settings={[
                        { key: 'voltageLow', label: 'Voltage — Low Limit', desc: 'Alert on voltage below this (3-phase)', value: alarmSettings.voltageLow, unit: 'V' },
                        { key: 'voltageHigh', label: 'Voltage — High Limit', desc: 'Overvoltage protection threshold', value: alarmSettings.voltageHigh, unit: 'V' },
                        { key: 'motorCurrent', label: 'Motor Current — Overload', desc: 'Max motor current before trip alert', value: alarmSettings.motorCurrent, unit: 'A' },
                        { key: 'batteryLow', label: 'UPS Battery — Low', desc: 'Battery voltage low alert', value: alarmSettings.batteryLow, unit: 'V' },
                    ]}
                    onInputChange={handleInputChange}
                />
                <AlarmCard
                    title="🔔 Notification Settings"
                    color="var(--green)"
                    settings={[]}
                    onInputChange={handleInputChange}
                    notifications={[
                        { key: 'email', label: 'Email Notifications', desc: 'admin@tayosmart.com', value: alarmSettings.email },
                        { key: 'sms', label: 'SMS Alerts', desc: '+91-XXXXXXXXXX', value: alarmSettings.sms },
                        { key: 'whatsapp', label: 'WhatsApp Alerts', desc: 'Critical alerts only', value: alarmSettings.whatsapp },
                        { key: 'sound', label: 'In-App Sound Alert', desc: 'Browser notification beep', value: alarmSettings.sound },
                    ]}
                    onToggle={handleToggle}
                />
            </div>

            <button className="w-full py-3 bg-cyan rounded-[9px] font-bold text-sm text-black transition-all duration-200 hover:opacity-85 hover:-translate-y-px">
                Save Alarm Settings
            </button>
        </div>
    )
}

export default Alarms