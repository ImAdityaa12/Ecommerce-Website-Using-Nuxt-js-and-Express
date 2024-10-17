import express from "express";
import {
  addNewProductController,
  deleteProductController,
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
router.post("/addNewProduct", addNewProductController);
router.post("/deleteProduct", deleteProductController);
router.post("/updateProduct", updateProductController);
export default router;
