import express from "express";
import { addAddressController } from "../controllers/addressController";
const router = express.Router();
router.post("/add", addAddressController);

export default router;
