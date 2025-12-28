import express from "express";
import { requireAuth } from "../middlewares/clerkAuth.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import { generateInvoice } from "../utils/invoiceGenerator.js";

const router = express.Router();

router.get("/:paymentId", requireAuth, async (req, res) => {
  const { paymentId } = req.params;

  const payment = await Payment.findById(paymentId);
  if (!payment) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  // Security check
  if (payment.clerkUserId !== req.user.clerkUserId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  generateInvoice(res, payment, req.user);
});

export default router;
