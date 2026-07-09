import express from 'express'

const router = express.Router()

const alerts = [
    { id: '1', title: 'Reserve Pump #2 — Fault Code E-047', severity: 'critical', device: 'Reserve #2', time: '09:14 AM', resolved: false },
    { id: '2', title: 'Diesel Fuel Tank — Level Below 60%', severity: 'warning', device: 'Diesel Tank', time: 'Yesterday', resolved: false },
    { id: '3', title: 'Voltage Dip Detected — Hydrant Main Pump', severity: 'warning', device: 'Hydrant Main', time: '03:22 AM', resolved: true },
    { id: '4', title: 'Scheduled Weekly Pump Test — Completed', severity: 'info', device: 'All Pumps', time: '08:30 AM', resolved: true },
]

router.get('/', (req, res) => {
    res.json(alerts)
})

export default router