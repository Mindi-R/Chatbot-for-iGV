import mongoose from "mongoose";
import Host from "../models/host.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export const signUp = async ( req , res , next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const { username , email , password , boardingAddressForApproval , boardingImageForApproval } = req.body;
        
        // Check if the user already exists
        const existingUser = await Host.findOne({ email });

        if (existingUser){
            return res.json({success: false, message: 'User already exists!'});
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);  

        // Create a new host
        const newHosts = await Host.create([{
            username,
            email,
            password: hashedPassword,
            boardingAddressForApproval,
            boardingImageForApproval,
            status: 'pending',
        }], { session });

        const token = createToken(newHosts._id);

        await session.commitTransaction();
        session.endSession();

        return res.json({ sucess: true, message: 'Host created successfully. Await Approval', data:{ token, host:newHosts[0] }});

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        res.json({success:false, message:error.message});
    }
}

export const signIn = async ( req , res , next) => {
    try{
        const { email , password } = req.body;

        // Check if the host exists
        const host = await Host.findOne({ email });

        if(!host){
            return res.json({success:false, message:"User not found!"});
        }

        // Check if the host is approved
        if(host.status !== 'approved'){
            return res.json({success:false, message:"Host not approved yet!"});
        }

        // Check if the host is rejected
        if(host.status === 'rejected'){
            return res.json({success:false, message:"Host is rejected!"});
        }

        // Check if the host is pending
        if(host.status === 'pending'){
            return res.json({success:false, message:"Host is pending!"});
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, host.password);

        // If the password is incorrect
        if(!isPasswordCorrect){
            return res.json({success:false, message:"Invalid credentials!"});
        }

        // Generate a JWT token
        const token = createToken(host._id);

        return res.json({success:true, message:"Logged in successfully!", data:{ token, host }});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}

// eslint-disable-next-line no-unused-vars
export const signOut = async ( req , res , next) => {}