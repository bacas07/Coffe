import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
            await mongoose.connect(process.env.MONGO_URL);
            console.log('-> Server connected to database');
    } catch (e) {
        console.error('Server cannot connect to database');
    }
}

export default connectDB;