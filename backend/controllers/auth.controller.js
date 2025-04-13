import mongoose from "mongoose";
import Host from "../models/host.model.js";
import bycrypt from "bcryptjs";
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
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);  

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

        res.status(201).json({
            sucess: true,
            message: 'Host created successfully. Await Approval',
            data:{
                token,
                host:newHosts[0]               
            }
        })

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        return next(error);
    }

}

export const signIn = async ( req , res , next) => {
    try{
        const { email , password } = req.body;

        // Check if the host exists
        const host = await Host.findOne({ email });

        if(!host){
            const error = new Error('Host not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if the host is approved
        if(host.status !== 'approved'){
            const error = new Error('Host not approved yet');
            error.statusCode = 403;
            throw error;
        }
        // Check if the host is rejected
        if(host.status === 'rejected'){
            const error = new Error('Host rejected');
            error.statusCode = 403;
            throw error;
        }
        // Check if the host is pending
        if(host.status === 'pending'){
            const error = new Error('Host pending');
            error.statusCode = 403;
            throw error;
        }

        // Check if the password is correct
        const isPasswordCorrect = await bycrypt.compare(password, host.password);

        // If the password is incorrect
        if(!isPasswordCorrect){
            const error = new Error('Invalid password!');
            error.statusCode = 401;
            throw error;
        }

        // Generate a JWT token
        const token = jwt.sign({ hostId: host._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: 'Host signed in successfully',
            data: {
                token,
                host
            }
        });

    }catch(error){
        return next(error);
    }
}

// eslint-disable-next-line no-unused-vars
export const signOut = async ( req , res , next) => {}