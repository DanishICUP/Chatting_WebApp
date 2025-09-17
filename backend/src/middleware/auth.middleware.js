import jwt from 'jsonwebtoken'
import userModel from '../models/User.model.js'

export const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({success:false,message:"unautorized ! user No token provided"})
        }
        const decodeToken = jwt.verify(token , process.env.JWT_SECRET)
        if (!decodeToken) {
            return res.status(401).json({success:false,message:"unautorized ! user Invalid token provided"})
        }
        const user = await userModel.findById(decodeToken.userId).select('-password')
        if (!user) {
            return res.status(401).json({success:false,message:"unautorized ! user not found"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("error in protect middleware",error)
        return res.status(500).json({success:false,message:"server error"})
    }
}