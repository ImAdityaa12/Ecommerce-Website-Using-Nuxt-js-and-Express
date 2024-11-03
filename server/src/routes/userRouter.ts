import express from "express";
import {
  loginController,
  logoutController,
  registerController,
  userDetailsController,
} from "../controllers/authController";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/details", userDetailsController);
export default router;
