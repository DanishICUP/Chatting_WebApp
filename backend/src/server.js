import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import path from 'path'
import connectDb from './lib/db.js'
import cookieParser from 'cookie-parser'
import MessagesRoutes from './routes/message.routes.js'
import cors from 'cors'
import { app, server } from './lib/socket.js'



dotenv.config()

// const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 3000
app.use(express.json({limit: "5mb"}))
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

//routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', MessagesRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

server.listen(PORT, '0.0.0.0', () => {
    console.log(`server is running at port:${PORT}`)
    connectDb()
})