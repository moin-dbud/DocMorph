import ConversionJob from "../models/ConversionJob.js";
import { processJob } from "./conversionWorker.js";

const INTERVAL = 3000; // 3 seconds

export const startWorker = () => {
  setInterval(async () => {
    const job = await ConversionJob.findOne({
      status: "queued",
    });

    if (job) {
      await processJob(job);
    }
  }, INTERVAL);
};
