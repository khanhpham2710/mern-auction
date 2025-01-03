import express from "express";
import {
  editProfile,
  fetchLeaderboard,
  forgotPassword,
  getProfile,
  login,
  logout,
  refresh,
  register,
  resendOTP,
  resetPassword,
  verifyOTP,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.put("/edit", isAuthenticated, editProfile);
router.get("/logout", isAuthenticated, logout);
router.post("/refresh", refresh);
router.get("/leaderboard", fetchLeaderboard);
router.post("/forgot", forgotPassword);
router.put("/reset/:token", resetPassword);

export default router;