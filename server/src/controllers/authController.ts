import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export async function registerContoller(req: any, res: any) {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({ fullName, email, password: hash });
    const token = generateToken(email, user);
    res.cookie("token", token);
    console.log(user);
    return res.status(201).json("User created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred while creating the user.");
  }
}
export async function loginController(req: any, res: any) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = generateToken(email, user);
          res.cookie("token", token);
          return res.status(200).json("Logged in successfully");
        } else {
          return res.status(401).send("Invalid credentials");
        }
      }
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    return res.status(500).send("An error occurred while Logging");
  }
}

export async function logoutController(req: any, res: any) {
  try {
    res.clearCookie("token");
    return res.status(200).json("Logged out successfully");
  } catch (error) {
    return res.status(500).send("An error occurred while Logging out");
  }
}
