import express from "express";
import {
  capturePayment,
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController";
const router = express.Router();
router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.post("update/OrderStatus", updateOrderStatus);
export default router;
