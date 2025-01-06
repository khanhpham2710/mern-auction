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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */


router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/resend-otp", resendOTP);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);


router.get("/me", isAuthenticated, getProfile);
router.put("/edit", isAuthenticated, editProfile);
router.get("/logout", isAuthenticated, logout);
router.post("/refresh", refresh);
router.get("/leaderboard", fetchLeaderboard);
router.post("/forgot", forgotPassword);
router.put("/reset/:token", resetPassword);

export default router;
