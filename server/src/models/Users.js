import mongoose from "mongoose";

// Define a MongoDB schema for user data
const UserSchema = new mongoose.Schema(
  {
    // Name of the user
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    // Password of the user
    password: {
      type: String,
      required: [true, "Please add a password"],
      // Password length constraints
      minLength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      default: "+91",
    },
    role: {
      type: String,
      required: [true, "Please add a name"],
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// Create a User model based on the schema
export const UserModel = mongoose.model("users", UserSchema);
