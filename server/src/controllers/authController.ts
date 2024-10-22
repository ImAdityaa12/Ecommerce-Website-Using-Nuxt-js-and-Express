import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({ userName, email, password: hash });
    const token = generateToken(email, user);
    res.cookie("token", token);
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user.");
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await userModel.findOne({ email });

    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(email, user);
    res.cookie("token", token);

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred while logging out" });
  }
};
