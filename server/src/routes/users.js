import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/users.js";

const router = express.Router();
export { router as userRouter };

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    // Extract email, username, and password from the request body
    const { username, password, phone, role } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password and save it to the database
    const newUser = new UserModel({
      username,
      phone,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// User Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user with the provided username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect!" });
    }

    // If the password is valid, create a JWT token and include both user ID and role in the response
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "defaultSecret"
    );

    res.json({ token, userID: user._id, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
