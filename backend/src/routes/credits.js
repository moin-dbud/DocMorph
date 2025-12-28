import express from "express";
import { requireAuth } from "../middlewares/clerkAuth.js";

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  res.json({
    success: true,
    credits: req.user.credits,
    plan: req.user.plan,
  });
});

export default router;
