import { Request, Response } from "express";
import productModel from "../models/productModel";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const brands = req.query.brands as string;
    const cleanCategory = category?.replace(/"/g, "");
    const cleanBrands = brands?.replace(/"/g, "");
    if (!cleanCategory && !cleanBrands) {
      const allProduct = await productModel.find().sort({ price: 1 });
      res.status(200).json(allProduct);
      console.log(allProduct);
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
