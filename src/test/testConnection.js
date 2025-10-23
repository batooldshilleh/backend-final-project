import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const uri = process.env.MONGODB_URI;

async function testConnection() {
  try {
    console.log("⏳ Trying to connect to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

testConnection();
