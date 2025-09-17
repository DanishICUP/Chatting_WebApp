import express from 'express'
import { GetAllContacts, GetChatPartner, GetMessagesByUserId, sendMessages } from '../controllers/messages.controller.js'
import { protectRoutes } from '../middleware/auth.middleware.js'
import { arcjectProtection } from '../middleware/arcjectProtection.middleware.js'

const MessagesRoutes = express.Router()

MessagesRoutes.use(arcjectProtection, protectRoutes)

MessagesRoutes.get("/contacts", GetAllContacts)
MessagesRoutes.get("/chats", GetChatPartner)
MessagesRoutes.get("/:id", GetMessagesByUserId)
MessagesRoutes.post("/send/:id", sendMessages)


export default MessagesRoutes