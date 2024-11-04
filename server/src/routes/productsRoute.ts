import express from "express";
import {
  getAllProductsController,
  getProductDetailsController,
  saveProductController,
} from "../controllers/productController";
const router = express.Router();
router.get("/", getAllProductsController);
router.get("/product/:id", getProductDetailsController);
router.get("/save/:id", saveProductController);

export default router;
