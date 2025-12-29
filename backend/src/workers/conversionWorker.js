import ConversionJob from "../models/ConversionJob.js";
import Conversion from "../models/Conversion.js";
import User from "../models/User.js";
import { performConversion } from "../utils/performConversion.js";

export const processJob = async (job) => {
  try {
    job.status = "processing";
    await job.save();

    // 🔥 Actual conversion happens here
    const outputFileName = await performConversion(job);

    job.status = "completed";
    job.outputFileName = outputFileName;
    await job.save();

    await Conversion.create({
      userId: job.userId,
      conversionType: job.conversionType,
      outputFileName,
      creditsUsed: 1,
    });

    await User.findByIdAndUpdate(job.userId, {
      $inc: { credits: -1 },
    });

    console.log("✅ Conversion completed:", job._id);
  } catch (err) {
    job.status = "failed";
    job.error = err.message;
    await job.save();

    console.error("❌ Conversion failed:", job._id, err.message);
  }
};
