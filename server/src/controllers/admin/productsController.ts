import { Request, Response } from "express";
import { imageUploadUtil } from "../../utils/cloudinary";
import productModel from "../../models/productModel";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.json({ products });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching products" });
  }
};
export const handleImageUploadController = async (
  req: Request,
  res: Response
) => {
  try {
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);
      res.json({ result });
    }
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading the image" });
  }
};

export const addNewProductController = async (req: Request, res: Response) => {
  try {
    const {
      image,
      title,
      description,
      price,
      brand,
      category,
      salePrice,
      totalStock,
    } = req.body;
    const product = await productModel.create({
      image,
      title,
      description,
      price,
      brand,
      category,
      salePrice,
      totalStock,
    });
    await product.save();
    res.json({ product });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the product" });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    res.json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};
export const updateProductController = async (req: Request, res: Response) => {
  try {
    await productModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};

export const getFilteredProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const category = req.query.category as string;
    const brands = req.query.brands as string;
    const cleanCategory = category?.replace(/"/g, "");
    const cleanBrands = brands?.replace(/"/g, "");
    if (!cleanCategory && !cleanBrands) {
      const filteredProduct = await productModel
        .find({
          category: { $regex: cleanCategory, $options: "i" },
          $and: [{ brand: { $regex: cleanBrands, $options: "i" } }],
        })
        .sort({ price: 1 });
      res.json({ filteredProduct });
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