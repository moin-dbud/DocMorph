import express from "express";
import { requireAuth } from "../middlewares/clerkAuth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const user = req.user;

  res.json({
    plan: user.plan,
    credits: user.credits,
    planUpdatedAt: user.planUpdatedAt,
  });
});

export default router;
