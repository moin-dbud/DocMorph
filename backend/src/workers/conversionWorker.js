import fs from "fs";
import path from "path";
import sharp from "sharp";
import { exec } from "child_process";
import pdfPoppler from "pdf-poppler";
import { v4 as uuid } from "uuid";

import ConversionJob from "../models/ConversionJob.js";
import Conversion from "../models/Conversion.js";
import User from "../models/User.js";

const OUTPUT_DIR = path.join(process.cwd(), "src/output");

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

const processJob = async (job) => {
  try {
    job.status = "processing";
    await job.save();

    const user = await User.findById(job.userId);
    if (!user || user.credits <= 0) {
      throw new Error("User has insufficient credits");
    }

    const { from, to } = parseConversion(job.conversionType);

    const outputId = uuid();
    let outputFileName = `${outputId}.${to}`;
    let outputPath = path.join(OUTPUT_DIR, outputFileName);

    /* IMAGE → IMAGE */
    if (["png", "jpg", "jpeg", "webp", "heic"].includes(from)) {
      await sharp(job.inputPath).toFormat(to).toFile(outputPath);
    }

    /* PDF → JPG */
    else if (from === "pdf" && to === "jpg") {
      await pdfPoppler.convert(job.inputPath, {
        format: "jpeg",
        out_dir: OUTPUT_DIR,
        out_prefix: outputId,
        page: 1,
      });

      outputFileName = `${outputId}-1.jpg`;
      outputPath = path.join(OUTPUT_DIR, outputFileName);
    }

    /* DOCX → PDF */
    else if (from === "docx" && to === "pdf") {
      const before = new Set(fs.readdirSync(OUTPUT_DIR));

      await new Promise((resolve, reject) => {
        exec(
          `"soffice" --headless --convert-to pdf --outdir "${OUTPUT_DIR}" "${job.inputPath}"`,
          (err) => (err ? reject(err) : resolve())
        );
      });

      await new Promise(r => setTimeout(r, 500));

      const after = fs.readdirSync(OUTPUT_DIR);
      const newPdf = after.find(
        f => f.endsWith(".pdf") && !before.has(f)
      );

      if (!newPdf) throw new Error("PDF not generated");

      fs.renameSync(
        path.join(OUTPUT_DIR, newPdf),
        outputPath
      );
    }

    else {
      throw new Error("Unsupported conversion");
    }

    if (!fs.existsSync(outputPath)) {
      throw new Error("Output file not created");
    }

    // Deduct credit
    user.credits -= 1;
    await user.save();

    // Save history
    await Conversion.create({
      userId: user._id,
      originalFileName: job.originalFileName,
      conversionType: job.conversionType,
      outputFileName,
      creditsUsed: 1,
    });

    job.status = "completed";
    job.outputFileName = outputFileName;
    await job.save();

    fs.unlinkSync(job.inputPath);

    console.log(`✅ Job ${job._id} completed`);
  } catch (err) {
    job.status = "failed";
    job.error = err.message;
    await job.save();

    console.error(`❌ Job ${job._id} failed:`, err.message);
  }
};

/**
 * Poll DB every 3 seconds
 */
setInterval(async () => {
  const job = await ConversionJob.findOne({ status: "queued" }).sort({ createdAt: 1 });

  if (job) {
    await processJob(job);
  }
}, 3000);

console.log("🔥 Conversion worker started");
