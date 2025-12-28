import express from "express";
import Conversion from "../models/Conversion.js";
import { requireAuth } from "../middlewares/clerkAuth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {


  try {
    const conversions = await Conversion.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });
    res.json({
      history: conversions,
    });
  } catch (err) {
    console.error("Error fetching conversion history:", err);
    res.status(500).json({ message: "failed to load history" });
  }
});

export default router;
