import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to MongoDb successfully: ", conn.connection.host)
    } catch (error) {
        console.error("Error while connecting to mongoDb: ", error)
        process.exit(1)
    }
}

export default connectDb