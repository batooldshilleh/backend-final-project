import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

export async function connectDB() {
  if (isConnected) return mongoose.connection;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
