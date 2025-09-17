import express, { Router } from 'express'
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js'
import { protectRoutes } from '../middleware/auth.middleware.js'
import { arcjectProtection } from '../middleware/arcjectProtection.middleware.js'

const authRoutes = express.Router()


authRoutes.use(arcjectProtection)

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)

authRoutes.put('/update-profile', protectRoutes, updateProfile)
authRoutes.get('/check', protectRoutes, (req, res) => res.status(200).json(req.user))


// authRoutes.get('/signup', arcjectProtection, (req, res) => {
//     return res.send("testing")
// })

export default authRoutes