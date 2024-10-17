import express, { Request, Response } from "express";
import { handleImageUpload } from "../controllers/admin/productsController";
import { upload } from "../utils/cloudinary";
const router = express.Router();
router.get("/", async (req, res) => {
  res.json("admin route");
});
router.post("/upload", upload.single("image"), handleImageUpload);
export default router;
