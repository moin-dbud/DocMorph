import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { requireAuth } from "../middlewares/clerkAuth.js";
import Payment from "../models/Payment.js"

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
router.post("/create-order", requireAuth, async (req, res) => {
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
router.post("/verify", requireAuth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = req.body;

    // signature verification (already correct)

    const creditsByPlan = {
      pro: 300,
      premium: 1000,
    };

    const credits = creditsByPlan[plan];

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ 1. Save payment
    await Payment.create({
      userId: req.user._id,      // ✅ FIX
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      plan,
      credits,                   // ✅ FIX
      amount: creditsByPlan[plan],
      status: "paid",
    });

    // ✅ 2. Update user
    req.user.credits += credits;
    req.user.plan = plan;
    await req.user.save();

    res.json({
      success: true,
      credits: req.user.credits,
      plan: req.user.plan,
    });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
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
