import express from "express";
import { convertFile } from "../controllers/convertController.js";
import { requireAuth } from "../middlewares/clerkAuth.js";
import { upload } from "../middlewares/upload.js";
import { convertLimiter } from "../middlewares/rateLimiter.js";
import ConversionJob from "../models/ConversionJob.js";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  convertLimiter,
  upload.single("file"),
  convertFile
);

router.get("/status/:jobId", requireAuth, async (req, res) => {
  const job = await ConversionJob.findById(req.params.jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json({
    status: job.status,
    outputFileName: job.outputFileName,
    error: job.error,
  });
});



export default router;
