import { Request, Response } from "express";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
import { Types } from "mongoose";
import userModel from "../models/userModel";
interface IProduct {
  _id: Types.ObjectId;
  image: string;
  title: string;
  price: number;
  salePrice: number;
}

interface ICartItem {
  productId: IProduct;
  quantity: number;
  _id: Types.ObjectId;
}

interface TransformedCartItem {
  productId: Types.ObjectId;
  title: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
}

interface CartResponse {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: TransformedCartItem[];
}

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

export const fetchCartController = async (
  req: Request<{}, {}, {}, { userId: string }>,
  res: Response
): Promise<void> => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.query.userId })
      .populate<{ items: ICartItem[] }>({
        path: "items.productId",
        select: "image title price salePrice",
      });

    if (!cart) {
      res.status(400).send("Cart not found in database");
      return;
    }

    const items: TransformedCartItem[] = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      image: item.productId.image,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    const response: CartResponse = {
      _id: cart._id,
      userId: cart.userId,
      items,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const updateCartItemQuantityController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      res.status(400).send("Missing required fields");
      return;
    }

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      res.status(400).send("Cart not found in database");
      return;
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      res.status(400).send("Product not found in cart");
      return;
    } else {
      if (quantity === "plus") {
        cart.items[findCurrentProductIndex].quantity += 1;
        await cart.save();
      } else {
        cart.items[findCurrentProductIndex].quantity = cart.items[
          findCurrentProductIndex
        ].quantity -= 1;
        await cart.save();
      }
      res.status(200).json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const deleteCartItemController = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.body;

    if (!email || !productId) {
      res.status(400).send("Missing required fields");
      return;
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send("User not found in database");
    }

    const cart = await cartModel.findOne({ userId: user?._id });
    if (!cart) {
      res.status(400).send("Cart not found in database");
      return;
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      res.status(400).send("Product not found in cart");
      return;
    } else {
      cart.items.splice(findCurrentProductIndex, 1);
      await cart.save();
      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
