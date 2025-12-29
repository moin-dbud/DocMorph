import User from "../models/User.js";
import ConversionJob from "../models/ConversionJob.js";
import { PLAN_FEATURES } from "../config/plans.js";

/**
 * Start a conversion job (ASYNC)
 * Controller responsibility:
 *  - Validate user & plan
 *  - Create job
 *  - Return jobId
 */
export const convertFile = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { conversionType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user || user.credits <= 0) {
      return res.status(403).json({ message: "Insufficient credits" });
    }

    const plan = user.plan || "free";
    const features = PLAN_FEATURES[plan];

    // File size check
    if (file.size > features.maxFileSizeMB * 1024 * 1024) {
      return res.status(403).json({
        message: `Max file size for ${plan} plan is ${features.maxFileSizeMB}MB`,
      });
    }

    // ✅ Create conversion job (DO NOT process here)
    const job = await ConversionJob.create({
      userId: user._id,
      originalFileName: file.originalname,
      conversionType,
      status: "queued",
    });

    return res.json({
      success: true,
      jobId: job._id,
      message: "Conversion started",
    });

  } catch (err) {
    console.error("Conversion start error:", err);
    return res.status(500).json({ message: "Failed to start conversion" });
  }
};
