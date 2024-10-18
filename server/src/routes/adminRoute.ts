import express from "express";
import {
  addNewProductController,
  deleteProductController,
  getFilteredProductsController,
  getProductDetailsController,
  getProductsController,
  handleImageUploadController,
  updateProductController,
} from "../controllers/admin/productsController";
import { upload } from "../utils/cloudinary";
const router = express.Router();
router.get("/", async (req, res) => {
  res.json("admin route");
});
router.post(
  "/upload/image",
  upload.single("image"),
  handleImageUploadController
);
router.get("/getProducts", getProductsController);
router.post("/addNewProduct", addNewProductController);
router.delete("/deleteProduct/:id", deleteProductController);
router.put("/updateProduct/:id", updateProductController);
router.get("/filter", getFilteredProductsController);
router.get("/detail", getProductDetailsController);
export default router;
