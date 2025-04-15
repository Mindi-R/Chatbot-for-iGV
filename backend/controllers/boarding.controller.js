import boardingModel from "../models/boarding.model.js";
import Host from "../models/host.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const addBoarding = async (req, res) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hostId = decoded.id;

        const {address, cost, type, availableCount, description} = req.body;

        const boardingDetails = {
            hostId,
            address,
            cost,
            type,
            availableCount,
            description
        }

        const newBoarding = new boardingModel(boardingDetails);
        await newBoarding.save();

        res.json({ success: true, message: "Boarding place added successfully", data: newBoarding });
    } 
    catch (error) {
        console.error("Error adding boarding:", error);
        res.json({ success: false, message:error.message });
    }
}

export { addBoarding };
