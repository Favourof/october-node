import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All Field are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: true,
      message: "Account Created Successfully",
      user: { firstName, lastName, email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
