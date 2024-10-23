import { Request, Response } from "express";
import addressModel from "../models/addressModel";
export const addAddressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone) {
      res.status(400).send("Missing required fields");
      return;
    }
    const newAddress = new addressModel({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};
