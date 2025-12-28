import express from "express";
import { requireAuth } from "../../middlewares/clerkAuth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import User from "../../models/User.js";
import Payment from "../../models/Payment.js";
import Conversion from "../../models/Conversion.js";

const router = express.Router();

router.get("/", requireAuth, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;
    const totalConversions = await Conversion.countDocuments();

    res.json({
      totalUsers,
      totalRevenue,
      totalConversions,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
});

export default router;