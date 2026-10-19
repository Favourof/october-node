import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  //   console.log(process.env.MONGODB_URI);

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    if (db) {
      console.log("Mongodb connected Successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
};
