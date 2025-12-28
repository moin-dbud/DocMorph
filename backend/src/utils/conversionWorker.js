import ConversionJob from "../models/ConversionJob.js";
import { performConversion } from "./performConversion.js";

export const processConversionJob = async (jobId) => {
  const job = await ConversionJob.findById(jobId);
  if (!job) return;

  try {
    job.status = "processing";
    job.progress = 10;
    await job.save();

    const result = await performConversion(job, (p) => {
      job.progress = p;
      job.save();
    });

    job.status = "completed";
    job.progress = 100;
    job.outputFileName = result.outputFileName;
    await job.save();
  } catch (err) {
    job.status = "failed";
    job.error = err.message;
    await job.save();
  }
};
