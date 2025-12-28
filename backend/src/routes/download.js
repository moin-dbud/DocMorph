import express from "express";
import path from "path";
import fs from "fs";
import { requireAuth } from "../middlewares/clerkAuth.js";

const router = express.Router();

router.get("/:filename", requireAuth, (req, res) => {
  const filename = decodeURIComponent(req.params.filename);
  const filePath = path.join(process.cwd(), "src/output", filename);

  console.log("⬇️ Download request:", filePath);

  if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath);
});


export default router;