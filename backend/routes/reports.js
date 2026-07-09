import express from 'express'

const router = express.Router()

router.get('/summary', (req, res) => {
    const summary = [
        { pump: 'Hydrant Main', runtime: '42.6', starts: '28', pressure: '6.2 bar', faults: '0', efficiency: '98.2%', status: 'Good' },
        { pump: 'Hydrant Jockey', runtime: '3.2', starts: '22', pressure: '6.1 bar', faults: '0', efficiency: '99.1%', status: 'Good' },
        { pump: 'Sprinkler Main', runtime: '38.4', starts: '24', pressure: '5.8 bar', faults: '0', efficiency: '97.8%', status: 'Good' },
        { pump: 'Sprinkler Jockey', runtime: '1.8', starts: '14', pressure: '5.7 bar', faults: '0', efficiency: '99.4%', status: 'Good' },
        { pump: 'Diesel Backup', runtime: '0.5', starts: '2', pressure: 'N/A', faults: '0', efficiency: '100%', status: 'Test OK' },
        { pump: 'Reserve #2', runtime: '12.4', starts: '8', pressure: '5.9 bar', faults: '1', efficiency: 'Fault', status: 'Fault' },
    ]
    res.json(summary)
})

export default router