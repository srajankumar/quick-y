import mongoose from "mongoose";

// Define a MongoDB schema for driver information
const PrescriptionSchema = new mongoose.Schema({
  waitingtime: {
    type: Number,
    required: true,
  },
  prescription: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

// Create a DriverInfo model based on the schema
export const PrescriptionModel = mongoose.model(
  "prescription",
  PrescriptionSchema
);
