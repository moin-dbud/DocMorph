import express from "express";
import { requireAuth } from "../../middlewares/clerkAuth.js";
import User from "../../models/User.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = express.Router();

/**
 * GET /api/admin/users
 * List all users
 */
router.get("/", requireAuth, isAdmin, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

/**
 * POST /api/admin/users/credits
 * Grant credits manually
 */
router.post("/credits", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { userId, credits } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.credits += Number(credits);
  await user.save();

  res.json({
    success: true,
    credits: user.credits,
  });
});

/**
 * POST /api/admin/users/role
 * Change role (user/admin)
 */
router.post("/role", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { userId, role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json({ success: true });
});

export default router;
