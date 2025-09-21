import jwt from 'jsonwebtoken'
import userModel from '../models/User.model.js'

export const UserSocketAuthMiddelware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized - Invalid Token"));
        }

        const user = await userModel.findById(decoded.userId).select('-password')
        if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error("User not found"));
        }

        // attach user info to socket
        socket.user = user
        socket.userId = user._id.toString()

        console.log(`Socket authenticated for user: ${user.fullname} (${user._id})`);

        next()

    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
}