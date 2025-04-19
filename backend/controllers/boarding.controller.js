import boardingModel from "../models/boarding.model.js";
import jwt from "jsonwebtoken";

const addBoarding = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hostId = decoded.id;

    const { address, cost, type, availableCount, description, facilities } = req.body;

    const images = req.files.map(file => file.path); // Cloudinary URLs

    const boardingDetails = {
      hostId,
      address,
      cost,
      type,
      availableCount,
      description,
      facilities,
      images
    };

    const newBoarding = new boardingModel(boardingDetails);
    await newBoarding.save();

    res.json({ success: true, message: "Boarding place added successfully", data: newBoarding });
  } catch (error) {
    console.error("Error adding boarding:", error);
    res.json({ success: false, message: error.message });
  }
};

const listBoarding = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hostId = decoded.id;

    const boardings = await boardingModel.find({ hostId });

    if (boardings.length === 0) {
      return res.json({ success: false, message: "No boardings found" });
    }

    res.json({ success: true, data: boardings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addBoarding, listBoarding };
