import express from "express";
import { requireAuth } from "../../middlewares/clerkAuth.js";
import Payment from "../../models/Payment.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "email plan credits",
      });

    return res.json({
      success: true,
      payments,
    });
  } catch (err) {
    console.error("Admin payments error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load payments",
    });
  }
});

export default router;