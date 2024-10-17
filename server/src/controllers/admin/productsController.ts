import { Request, Response } from "express";
import { imageUploadUtil } from "../../utils/cloudinary";
import productModel from "../../models/productModel";

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
    const { id } = req.body;
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
    await productModel.findByIdAndUpdate(req.body.id, {
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
