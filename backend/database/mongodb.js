import mongoose from 'mongoose';
import { DB_URI , NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("Please define the DB_URI inside .env.<production/development>.local");
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
    }catch(error){
        console.error("MongoDB connection failed", error);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

export default connectToDatabase;