import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    images: {
        type: String
    },
}, { timestamps: true })

const messagesModel = mongoose.model("Message", MessageSchema)
export default messagesModel