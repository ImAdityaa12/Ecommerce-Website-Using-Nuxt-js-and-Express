import { Request, Response } from "express";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
export const addToCartController = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      res.status(400).send("Missing required fields");
      return;
    }
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(400).send("Product not found in databse");
      return;
    }
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({
        userId,
        items: [],
      });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const fetchCartController = async (req: Request, res: Response) => {
  try {
    const cart = await cartModel.findOne({ userId: req.query.userId });
    const allPrducts = await productModel.find();
    if (!cart) {
      res.status(404).send("Cart not found please add some items to cart");
      return;
    }
    const validProducts = cart.items.filter((item) =>
      allPrducts.some(
        (product) => product._id.toString() === item.productId.toString()
      )
    );
    res.status(200).json({
      items: validProducts,
      userId: req.query.userId,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};
