import express from "express";
import {
  getAllProductsController,
  getProductDetailsController,
} from "../controllers/productController";
const router = express.Router();
router.get("/", getAllProductsController);
router.get("/product/:id", getProductDetailsController);

export default router;
