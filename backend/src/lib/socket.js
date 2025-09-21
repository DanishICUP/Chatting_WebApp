import { Server } from "socket.io";
import http from "http";
import express from "express";
import { UserSocketAuthMiddelware } from "../middleware/socket.authUser.js";


const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    },
});

io.use(UserSocketAuthMiddelware)

export function getRecieverSocketId(userId){
    return useSocketMap[userId]
}

const useSocketMap = {}

io.on('connection', (socket) => {
    console.log("A user Connected ", socket.user.fullname)

    const userId = socket.userId
    useSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(useSocketMap))

    socket.on("disconnect", () => {
        console.log("A user disconnected ", socket.user.fullname)
        delete useSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(useSocketMap))
    })
})

export { io, app, server }