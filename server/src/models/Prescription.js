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
    },
    prescription: {
      type: String,
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
