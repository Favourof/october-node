import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const connectDB = async () => {
  //   console.log(process.env.MONGODB_URI);

  try {
    const db = await mongoose.connect(envConfig.mongodb.mongodbUrl);
    if (db) {
      console.log("Mongodb connected Successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
};
