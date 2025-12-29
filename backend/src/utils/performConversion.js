import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fromPath } from "pdf2pic";
import { v4 as uuid } from "uuid";

const OUTPUT_DIR = path.join(process.cwd(), "src/output");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Parse "PDF → JPG"
 */
const parseConversion = (conversionType) => {
  const [from, to] = conversionType
    .split("→")
    .map((v) => v.trim().toLowerCase());
  return { from, to };
};

export const performConversion = async (job) => {
  const { conversionType, originalFileName } = job;
  const { from, to } = parseConversion(conversionType);

  const inputPath = path.join(
    process.cwd(),
    "src/uploads",
    originalFileName
  );

  const outputId = uuid();

  /* =======================
     IMAGE → IMAGE
  ======================= */
  if (["jpg", "jpeg", "png", "webp"].includes(from)) {
    const outputFileName = `${outputId}.${to}`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    await sharp(inputPath).toFormat(to).toFile(outputPath);
    return outputFileName;
  }

  /* =======================
     PDF → JPG
  ======================= */
  if (from === "pdf" && to === "jpg") {
    const converter = fromPath(inputPath, {
      density: 200,
      saveFilename: outputId,
      savePath: OUTPUT_DIR,
      format: "jpg",
      width: 2480,
      height: 3508,
    });

    // Convert first page only (free-tier safe)
    const result = await converter(1);

    return path.basename(result.path);
  }

  throw new Error("Unsupported conversion type");
};
