import express from "express";
import mongoose from "mongoose";
import { AppointmentModel } from "../models/Appointment.js";
import { UserModel } from "../models/users.js";

const router = express.Router();
export { router as appointmentRouter };

// Retrieve all Appointments from the database
router.get("/", async (req, res) => {
  try {
    const response = await AppointmentModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// // Create a new Appointment using data from the request body
// router.post("/", async (req, res) => {
//   const recipe = new AppointmentModel(req.body);
//   try {
//     const response = await appointment.save();
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

router.post("/create-appointment", async (req, res) => {
  try {
    const { name, disease, age, clinic, sent, userOwner } = req.body;

    // Fetch the user's role from the "users" collection
    const user = await UserModel.findById(userOwner);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the appointment with the user's role
    const appointment = new AppointmentModel({
      name,
      disease,
      age,
      clinic,
      userOwner,
      sent,
      userRole: user.user_role, // Assuming the user model has a "role" field
    });

    await appointment.save();

    res.status(201).json({ message: "Appointment created successfully!" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
