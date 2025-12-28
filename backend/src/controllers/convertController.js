import sharp from "sharp";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import User from "../models/User.js";
import Conversion from "../models/Conversion.js";
import { PLAN_FEATURES } from "../config/plans.js";
import pdfPoppler from "pdf-poppler";
import { exec } from "child_process";
import ConversionJob from "../models/ConversionJob.js";

const OUTPUT_DIR = path.join(process.cwd(), "src/output");

// ✅ Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Parse "PNG → JPG"
 */
const parseConversion = (conversionType) => {
  const [from, to] = conversionType.split("→").map(v => v.trim().toLowerCase());
  return { from, to };
};

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

    if (file.size > features.maxFileSizeMB * 1024 * 1024) {
      return res.status(403).json({
        message: `Max file size for ${plan} plan is ${features.maxFileSizeMB}MB`,
      });
    }

    // ✅ Job created (kept as-is)
    await ConversionJob.create({
      userId: user._id,
      conversionType,
      originalFileName: file.originalname,
      status: "processing",
    });

    const { from, to } = parseConversion(conversionType);

    const outputId = uuid();
    let outputFileName = `${outputId}.${to}`;
    let outputPath = path.join(OUTPUT_DIR, outputFileName);

    /* =======================
       IMAGE → IMAGE
    ======================= */
    if (["png", "jpg", "jpeg", "webp", "heic"].includes(from)) {
      await sharp(file.path).toFormat(to).toFile(outputPath);
    }

    /* =======================
       PDF → JPG
    ======================= */
    else if (from === "pdf" && to === "jpg") {
      await pdfPoppler.convert(file.path, {
        format: "jpeg",
        out_dir: OUTPUT_DIR,
        out_prefix: outputId,
        page: 1,
      });

      outputFileName = `${outputId}-1.jpg`;
      outputPath = path.join(OUTPUT_DIR, outputFileName);
    }

    /* =======================
       DOCX → PDF
    ======================= */
    else if (from === "docx" && to === "pdf") {
      const before = new Set(fs.readdirSync(OUTPUT_DIR));

      await new Promise((resolve, reject) => {
        exec(
          `"soffice" --headless --convert-to pdf --outdir "${OUTPUT_DIR}" "${file.path}"`,
          (err) => (err ? reject(err) : resolve())
        );
      });

      await new Promise(r => setTimeout(r, 500));

      const after = fs.readdirSync(OUTPUT_DIR);
      const newPdf = after.find(
        f => f.endsWith(".pdf") && !before.has(f)
      );

      if (!newPdf) {
        throw new Error("PDF not generated");
      }

      outputFileName = `${outputId}.pdf`;
      outputPath = path.join(OUTPUT_DIR, outputFileName);

      fs.renameSync(
        path.join(OUTPUT_DIR, newPdf),
        outputPath
      );
    }

    else {
      return res.status(400).json({ message: "Unsupported conversion" });
    }

    // ✅ Verify output exists (prevents download error)
    if (!fs.existsSync(outputPath)) {
      throw new Error("Output file not found after conversion");
    }

    // Deduct credit
    user.credits -= 1;
    await user.save();

    // Save history
    await Conversion.create({
      userId: user._id,
      originalFileName: file.originalname,
      conversionType,
      outputFileName,
      creditsUsed: 1,
    });

    // Cleanup uploaded file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    console.log("✅ Output file saved:", outputPath);

    return res.json({
      success: true,
      creditsLeft: user.credits,
      fileName: outputFileName,
      downloadUrl: `/api/download/${outputFileName}`,
    });

  } catch (err) {
    console.error("Conversion error:", err);
    return res.status(500).json({ message: "Conversion failed" });
  }
};
