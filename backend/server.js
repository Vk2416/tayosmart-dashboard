import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

app.use(cors())
app.use(express.json())

import pumpRoutes from './routes/pumps.js'
import alertRoutes from './routes/alerts.js'
import reportRoutes from './routes/reports.js'

app.use('/api/pumps', pumpRoutes)
app.use('/api/alerts', alertRoutes)
app.use('/api/reports', reportRoutes)

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    setInterval(() => {
        const pressure = (6.0 + Math.random() * 0.5).toFixed(1)
        socket.emit('pressure-update', { pressure, timestamp: new Date() })
    }, 4000)

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`)
})