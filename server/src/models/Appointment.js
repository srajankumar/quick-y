import mongoose from "mongoose";

// Define a MongoDB schema for driver information
const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  disease: { type: String, required: true },
  age: { type: String, required: true },
  clinic: { type: String, required: true },

  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

// Create a DriverInfo model based on the schema
export const AppointmentModel = mongoose.model(
  "appointment",
  AppointmentSchema
);
