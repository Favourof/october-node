import User from "../models/user.js";
import bcrypt from "bcrypt";
import { userODM } from "../odm/user.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

export const register = async (req, res) => {
  const saltRounds = Number(envConfig.bcrypt.saltRounds);
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
      user: userODM(user),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All Field are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    // console.log(comparePassword);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { data: existingUser._id },
      envConfig.jwt.jwtSecretKey,
      { expiresIn: envConfig.jwt.expiresIn },
    );

    return res.status(200).json({
      status: true,
      message: "Login Successfully",
      user: userODM(existingUser),
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
