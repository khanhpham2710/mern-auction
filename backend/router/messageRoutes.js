import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessage);

export default router;