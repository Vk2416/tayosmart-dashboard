import express from 'express'

const router = express.Router()

const pumps = [
    { id: 'p1', name: 'Hydrant Main Pump', status: 'running', pressure: '6.2', flow: '420', voltage: '415', current: '38', load: 74, online: true },
    { id: 'p2', name: 'Hydrant Jockey Pump', status: 'standby', pressure: '6.1', flow: '80', voltage: '415', current: '0', load: 0, online: true },
    { id: 'p3', name: 'Sprinkler Main Pump', status: 'running', pressure: '5.8', flow: '380', voltage: '415', current: '34', load: 68, online: true },
    { id: 'p4', name: 'Sprinkler Jockey Pump', status: 'standby', pressure: '5.7', flow: '60', voltage: '415', current: '0', load: 0, online: true },
    { id: 'p5', name: 'Diesel Backup Pump', status: 'standby', pressure: '—', flow: '500', voltage: '—', current: '—', load: 0, online: true },
    { id: 'p6', name: 'Reserve Pump #2', status: 'fault', pressure: '—', flow: '—', voltage: '—', current: '—', load: 0, online: false },
]

router.get('/', (req, res) => {
    res.json(pumps)
})

router.get('/:id', (req, res) => {
    const pump = pumps.find((p) => p.id === req.params.id)
    if (!pump) return res.status(404).json({ error: 'Pump not found' })
    res.json(pump)
})

export default router