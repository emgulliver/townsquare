import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error("MongoDB connection URI is missing");
    }

    await mongoose.connect(uri);

    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", (err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
