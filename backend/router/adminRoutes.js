import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  deleteAuctionItem,
  deletePaymentProof,
  fetchAllUsers,
  getAllPaymentProofs,
  getPaymentProofDetail,
  monthlyRevenue,
  updateProofStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(isAuthenticated);
router.use(isAuthorized("Admin"));

router.delete(
  "/auctionitem/delete/:id",
  deleteAuctionItem
);

router.get(
  "/paymentproofs/getall",
  getAllPaymentProofs
);

router.get(
  "/paymentproof/:id",
  getPaymentProofDetail
);

router.put(
  "/paymentproof/status/update/:id",
  updateProofStatus
);

router.delete(
  "/paymentproof/delete/:id",
  deletePaymentProof
);

router.get(
  "/users/getall",
  fetchAllUsers
);

router.get(
  "/monthlyincome",
  monthlyRevenue
);

export default router;