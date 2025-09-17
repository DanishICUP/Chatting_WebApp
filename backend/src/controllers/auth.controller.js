import validator from 'validator'
import userModel from '../models/User.model.js'
import bcrypt from 'bcrypt'
import generateToken from '../lib/generateToken.js'
// import { sendWelcomeEmail } from '../emails/emailHandler.js'
import 'dotenv/config'
import cloudinary from '../lib/cloudinary.js'



export const signup = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        if (!fullname && !email && !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password should be atleast 6 characters" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "invalid email formate" })
        }
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "user already register" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            fullname,
            email,
            password: hashPassword
        })

        if (newUser) {
            await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilepic: newUser.profilepic
            })

            // try {
            //     await sendWelcomeEmail(newUser.email, newUser.fullname, process.env.CLIENT_URL)
            // } catch (err) {
            //     console.log("faild to send email", err)
            // }
        } else {
            return res.status(400).json({ success: false, message: "invalid user credientials" })
        }

    } catch (error) {
        console.log("Error in user Registration controller", error)
        return res.status(500).json({ success: false, message: "internal server Error " })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "invalid credentials" })
        }

        const comparePasword = await bcrypt.compare(password, user.password)
        if (!comparePasword) {
            return res.status(400).json({ success: false, message: "invalid credentials" })
        }

        generateToken(user._id, res)

        return res.status(200).json({
            success: true,
            message: "user LoggedIn",
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic
        })
    } catch (error) {
        console.log("Errro in while user loggedIn", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export const logout = async (_, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        return res.status(200).json({ success: true, message: "Logout Successfully" })
    } catch (error) {
        console.log("Errro in while user Logout", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body
        const userId = req.user._id

        if (!profilepic) {
            return res.status(400).json({ success: false, message: "profile pic are required" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic)

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { profilepic: uploadResponse.secure_url },
            { new: true }
        )

        return res.status(201).json({
            success: true,
            message: "prodile picture uploaded successfully",
            updatedUser
        })

    } catch (error) {
        console.log("Errro in while user upload profile picture", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}