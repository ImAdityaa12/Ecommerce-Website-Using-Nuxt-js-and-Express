import { Request, Response } from "express";
import productModel from "../models/productModel";
import userModel from "../models/userModel";
import { getCurrentUserEmail } from "../utils/currentUserEmail";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YWd1cHRhMTI5MUBnbWFpbC5jb20iLCJpZCI6IjY3MjdhMzg2MzI2NTdjNWU3NjUxZDhhYiIsImlhdCI6MTczMDY1ODk0M30._yOPYiZvCTOSI7O6NZAMnMyspsfMkEgOERufAnQ8grM";
    const user = await userModel.findOne({ _id: getCurrentUserEmail(token) });
    const category = req.query.category as string;
    const brands = req.query.brands as string;
    const cleanCategory = category?.replace(/"/g, "");
    const cleanBrands = brands?.replace(/"/g, "");
    if (!cleanCategory && !cleanBrands) {
      const allProduct = await productModel.find().sort({ price: 1 });
      const userLikedProducts = allProduct.map((product) =>
        user?.savedProduct.includes(product._id)
          ? {
              product,
              isLiked: true,
            }
          : {
              product,
              isLiked: false,
            }
      );
      res.status(200).json(userLikedProducts);
      return;
    } else if (cleanCategory && !cleanBrands) {
      const filteredProduct = await productModel
        .find({
          category: { $regex: cleanCategory, $options: "i" },
        })
        .sort({ price: 1 });
      res.json({ filteredProduct });
    } else if (!cleanCategory && cleanBrands) {
      const filteredProduct = await productModel
        .find({
          brand: { $regex: cleanBrands, $options: "i" },
        })
        .sort({ price: 1 });
      res.json({ filteredProduct });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching products" });
  }
};

export const getProductDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json("Some error occured");
  }
};
export const saveProductController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    const user = await userModel.findOne({ _id: userId });
    // console.log(
    //   getCurrentUserEmail(
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YWd1cHRhMTI5MUBnbWFpbC5jb20iLCJpZCI6IjY3MjdhMzg2MzI2NTdjNWU3NjUxZDhhYiIsImlhdCI6MTczMDY1ODk0M30._yOPYiZvCTOSI7O6NZAMnMyspsfMkEgOERufAnQ8grM"
    //   )
    // );
    if (!user) {
      res.status(400).json("User not found in database");
      return;
    }
    if (product && product._id) {
      if (user.savedProduct.includes(product._id)) {
        user.savedProduct.splice(user.savedProduct.indexOf(product._id), 1);
      } else {
        user.savedProduct.push(product._id);
      }
      await user.save();
      res.status(200).json({ user });
      return;
    } else {
      res.status(404).json("Product not found");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Some error occurred");
    return;
  }
};
