import express from "express";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * Razorpay Webhook Handler
 * URL: POST /api/webhooks/razorpay
 */
router.post("/razorpay", async (req, res) => {
  try {
    /* ----------------------------------------------------
       1. Verify Razorpay Signature (CRITICAL)
    ---------------------------------------------------- */

    const razorpaySignature = req.headers["x-razorpay-signature"];

    if (!razorpaySignature) {
      return res.status(400).json({ message: "Missing Razorpay signature" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("❌ Invalid Razorpay webhook signature");
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    /* ----------------------------------------------------
       2. Parse Event Payload
    ---------------------------------------------------- */

    const payload = JSON.parse(req.body.toString());
    const event = payload.event;

    console.log("📩 Razorpay Webhook Event:", event);

    /* ----------------------------------------------------
       3. Handle Payment Captured
    ---------------------------------------------------- */

    if (event === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;

      const {
        id: razorpayPaymentId,
        order_id: razorpayOrderId,
        amount,
        notes,
      } = paymentEntity;

      const { userId, plan } = notes || {};

      if (!userId || !plan) {
        console.error("❌ Missing userId or plan in payment notes");
        return res.status(400).json({ message: "Invalid payment metadata" });
      }

      /* ------------------------------------------------
         Prevent double credit (idempotency)
      ------------------------------------------------ */

      const alreadyProcessed = await Payment.findOne({
        razorpayPaymentId,
      });

      if (alreadyProcessed) {
        console.log("⚠️ Payment already processed:", razorpayPaymentId);
        return res.json({ success: true });
      }

      /* ------------------------------------------------
         Credit Mapping
      ------------------------------------------------ */

      const creditsByPlan = {
        pro: 300,
        premium: 1000,
      };

      const credits = creditsByPlan[plan];

      if (!credits) {
        console.error("❌ Invalid plan:", plan);
        return res.status(400).json({ message: "Invalid plan" });
      }

      /* ------------------------------------------------
         Save Payment
      ------------------------------------------------ */

      await Payment.create({
        userId,
        razorpayOrderId,
        razorpayPaymentId,
        plan,
        credits,
        amount, // amount in paise
        status: "paid",
      });

      /* ------------------------------------------------
         Update User Credits
      ------------------------------------------------ */

      await User.findByIdAndUpdate(userId, {
        $inc: { credits },
        $set: { plan },
      });

      console.log(
        `✅ Payment captured | User: ${userId} | Credits: +${credits}`
      );
    }

    /* ----------------------------------------------------
       4. Handle Payment Failed (Optional but useful)
    ---------------------------------------------------- */

    if (event === "payment.failed") {
      const paymentEntity = payload.payload.payment.entity;

      await Payment.create({
        razorpayPaymentId: paymentEntity.id,
        razorpayOrderId: paymentEntity.order_id,
        amount: paymentEntity.amount,
        status: "failed",
      });

      console.log("❌ Payment failed:", paymentEntity.id);
    }

    /* ----------------------------------------------------
       5. Acknowledge Razorpay
    ---------------------------------------------------- */

    res.json({ success: true });
  } catch (err) {
    console.error("🔥 Razorpay webhook error:", err);
    res.status(500).json({ message: "Webhook processing failed" });
  }
});

export default router;