import mongoose from "mongoose";

const userReference = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
  required: true,
};

const PrescriptionSchema = new mongoose.Schema(
  {
    waitingtime: {
      type: Number,
      required: [true, "Waiting time is required"],
    },
    prescription: {
      type: String,
      required: [true, "Prescription text is required"],
    },
    date: {
      type: String,
    },
    userOwner: userReference,
  },
  {
    timestamps: true,
  }
);

export const PrescriptionModel = mongoose.model(
  "Prescription",
  PrescriptionSchema
);
