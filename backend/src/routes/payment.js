import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { requireAuth } from "../middlewares/clerkAuth.js";
import Payment from "../models/Payment.js"
import { paymentLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();
console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};


/**
 * Create order
 */
router.post("/create-order", requireAuth, paymentLimiter, async (req, res) => {
  const razorpay = getRazorpayInstance();

  const { plan } = req.body;

  const plans = {
    pro: { amount: 19900, credits: 300 },
    premium: { amount: 49900, credits: 1000 },
  };

  if (!plans[plan]) {
    return res.status(400).json({ message: "Invalid plan" });
  }

  const order = await razorpay.orders.create({
    amount: plans[plan].amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      userId: req.user._id.toString(),
      plan,
    }
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    credits: plans[plan].credits,
  });
});

/**
 * Verify payment
 */
router.post("/verify", requireAuth, paymentLimiter, async (req, res) => {
  res.json({
    success: true,
    message: "Payment received. Credits will be added shortly.",
  });
});


router.get("/history", requireAuth, async (req, res) => {
  const payments = await Payment.find({
    userId: req.user._id,
  }).sort({ createdAt: -1 });

  console.log("History for:", req.user.clerkUserId);
  console.log("Payments found:", payments.length);

  res.json({ payments });
});


export default router;
