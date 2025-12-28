import express from "express";
import { requireAuth } from "../../middlewares/clerkAuth.js";
import Conversion from "../../models/Conversion.js";

const router = express.Router();

/**
 * GET /api/admin/conversions
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const conversions = await Conversion.find()
      .sort({ createdAt: -1 })
      .populate("userId", "email");

    res.json({
      success: true,
      conversions,
    });
  } catch (err) {
    console.error("Admin conversions error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load conversions",
    });
  }
});

export default router;