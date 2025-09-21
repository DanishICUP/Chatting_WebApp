import cloudinary from "../lib/cloudinary.js"
import { getRecieverSocketId, io } from "../lib/socket.js"
import messagesModel from "../models/Message.model.js"
import userModel from "../models/User.model.js"

export const GetAllContacts = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filterUser = await userModel.find({ _id: { $ne: loggedInUser } }).select('-password')

        return res.status(200).json(filterUser)
    } catch (error) {
        console.log("error while Get contact user ", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export const GetChatPartner = async (req, res) => {
    try {
        const loggedinUserId = req.user._id

        const messages = await messagesModel.find({
            $or: [
                { senderId: loggedinUserId }, { receiverId: loggedinUserId }
            ]
        })
        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedinUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            ),
        ];
        const chatPartners = await userModel.find({ _id: { $in: chatPartnerIds } }).select("-password");
        return res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error in getChatPartners: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const GetMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id
        const { id: usertochat } = req.params

        // chat you and me
        // i sent you message
        // you sent me message

        const messages = await messagesModel.find({
            $or: [
                { senderId: myId, receiverId: usertochat },
                { senderId: usertochat, receiverId: myId },
            ]
        })

        return res.status(200).json(messages)

    } catch (error) {
        console.log("error while Get contact user ", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, images } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl;

        if (images) {
            const uploadResponse = await cloudinary.uploader.upload(images)
            imageUrl = uploadResponse.secure_url
        }

        const newMessages = messagesModel({
            senderId,
            receiverId,
            images: imageUrl,
            text
        })

        await newMessages.save()

        // real time functionality later implement socket io 
        const recieverSocketId = getRecieverSocketId(receiverId)
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessages", newMessages)
        }

        return res.status(201).json(newMessages)

    } catch (error) {
        console.log("error while send messages ", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}