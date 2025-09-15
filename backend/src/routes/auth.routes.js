import express from 'express'

const authRoutes = express.Router()

authRoutes.get('/signup', (req, res) => {
    res.send('Signup')
})
authRoutes.get('/login', (req, res) => {
    res.send('login')
})
authRoutes.get('/logout', (req, res) => {
    res.send('logout')
})

export default authRoutes