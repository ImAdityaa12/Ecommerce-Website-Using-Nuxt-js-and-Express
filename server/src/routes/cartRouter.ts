import express from "express";
import {
  addToCartController,
  fetchCartController,
  updateCartItemQuantityController,
} from "../controllers/cartController";
const router = express.Router();
router.get("/", fetchCartController);
router.post("/addToCart", addToCartController);
router.post("/updateCartItemQuantity", updateCartItemQuantityController);
export default router;
