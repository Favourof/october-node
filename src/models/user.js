import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minLength: [3, "FirstName must be at least 3 Character"],
    maxLength: [16, "FirstName must can not be greater than 16 Character"],
  },
  lastName: {
    type: String,
    trim: true,
    minLength: [3, "lastName must be at least 3 Character"],
    maxLength: [16, "lastName must can not be greater than 16 Character"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"],
    lowercase: true,
    trim: true,
  },
  password: {
    required: [true, "Password is required"],
    type: String,
    minLength: [8, "Password must be at least 8 character Long"],
  },
});

const user = mongoose.model("user", userSchema);
export default user;
