import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/users.js";
import { PrescriptionModel } from "../models/Prescription.js";

const router = express.Router();
export { router as prescriptionRouter };

// Retrieve all Prescription from the database
router.get("/", async (req, res) => {
  try {
    const response = await PrescriptionModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
router.post("/prescribe", async (req, res) => {
  try {
    console.log("Request Payload:", req.body);

    const { waitingtime, prescription, userOwner } = req.body;

    // Fetch the user's information from the "users" collection
    const user = await UserModel.findById(userOwner);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Create the Prescription with the user's role
    const appointment = new PrescriptionModel({
      waitingtime,
      prescription,
      userOwner: user._id,
      // Assuming the user model has a "role" field
    });

    // Log appointment information
    console.log("Appointment:", appointment);

    await appointment.save();

    console.log("Prescription Uploaded successfully!");

    res.status(201).json({ message: "Prescription Uploaded successfully!" });
  } catch (error) {
    console.error("Error Uploading Prescription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
