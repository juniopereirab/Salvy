import express, { Application } from 'express'
import cors from 'cors'
import cron from 'node-cron'
import { db } from '../Config/db.config'
import { lineRouter } from '../Routes/line.routes'
import { lineJobs } from '../Jobs/line.jobs'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Routes
app.use(lineRouter)

cron.schedule('* * * * *', async () => await lineJobs.createLineInBackground())

const http = createServer(app)
const io = new Server(http, { cors: { origin: '*' }})

io.on('connection', (socket) => {
    console.log(`Conectado ao Cliente: ${socket.id}`)
})

export { db, app, http, io }