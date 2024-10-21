import express from "express";
import {
  addToCartController,
  fetchCartController,
} from "../controllers/cartController";
const router = express.Router();
router.get("/", fetchCartController);
router.post("/addToCart", addToCartController);
export default router;
