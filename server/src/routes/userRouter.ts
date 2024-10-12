import express, { Request, Response } from "express";
import {
  loginController,
  logoutController,
  registerContoller,
} from "../controllers/authController";
// import {
//   registerContoller,
//   loginController,
//   logoutController,
// } from "../controllers/authController";
const router = express.Router();
router.post("/register", registerContoller);
router.post("/login", loginController);
router.get("/logout", logoutController);
export default router;
