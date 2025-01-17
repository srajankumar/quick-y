import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { appointmentRouter } from "./routes/appointment.js";
import { prescriptionRouter } from "./routes/prescription.js";

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://quick-y.vercel.app",
    "https://renderup.vercel.app",
  ],
  methods: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello Quick-y Developer!");
});

app.use("/auth", userRouter); // Authentication-related routes
app.use("/appointment", appointmentRouter); // Authentication-related routes
app.use("/prescription", prescriptionRouter); // Authentication-related routes

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

// Define the port for the server, using the provided port or defaulting to 3001
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
