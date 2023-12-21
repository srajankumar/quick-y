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
    const { waitingtime, prescription, userOwner } = req.body;

    // Fetch the user's role from the "users" collection
    const user = await UserModel.findById(userOwner);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the Prescrrription with the user's role
    const appointment = new PrescriptionModel({
      waitingtime,
      prescription,
      userOwner,
      userRole: user.role, // Assuming the user model has a "role" field
    });

    await appointment.save();

    res.status(201).json({ message: "Prescription Uploaded successfully!" });
  } catch (error) {
    console.error("Error Uploading Prescription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
