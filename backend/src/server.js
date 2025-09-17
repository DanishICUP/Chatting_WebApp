import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import path from 'path'
import connectDb from './lib/db.js'
import cookieParser from 'cookie-parser'
import MessagesRoutes from './routes/message.routes.js'

dotenv.config()

const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', MessagesRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`server is running at port:http://localhost:${PORT}`)
    connectDb()
})