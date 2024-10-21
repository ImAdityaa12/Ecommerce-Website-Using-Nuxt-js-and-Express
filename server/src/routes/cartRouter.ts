import express from "express";
import { addToCartController } from "../controllers/cartController";
const router = express.Router();
router.post("/addToCart", addToCartController);
export default router;
