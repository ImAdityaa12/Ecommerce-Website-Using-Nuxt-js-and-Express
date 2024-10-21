import { Request, Response } from "express";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
interface IProduct {
  _id: Types.ObjectId;
  image: string;
  title: string;
  price: number;
  salePrice: number;
}

// Interface for Cart Item
interface ICartItem {
  productId: IProduct;
  quantity: number;
  _id: Types.ObjectId;
}

// Interface for Cart Document

// Interface for transformed cart item
interface TransformedCartItem {
  productId: Types.ObjectId;
  title: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
}

// Interface for the response data
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

// export const fetchCartController = async (req: Request, res: Response) => {
//   try {
//     const cart: any = await cartModel
//       .findOne({ userId: req.query.userId })
//       .populate({
//         path: "items.productId",
//         select: "image title price salePrice",
//       });
//     if (!cart) {
//       res.status(400).send("Cart not found in databse");
//       return;
//     }
//     const items = cart.items.map((item: any) => ({
//       productId: item.productId._id,
//       title: item.productId.title,
//       image: item.productId.image,
//       price: item.productId.price,
//       salePrice: item.productId.salePrice,
//       quantity: item.quantity,
//     }));
//     res.status(200).json({
//       _id: cart._id,
//       userId: cart.userId,
//       items,
//     });
//     return;
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// };
import { Types } from "mongoose";

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
