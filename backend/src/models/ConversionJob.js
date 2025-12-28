import mongoose from "mongoose";

const conversionJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversionType: String,
  originalFileName: String,
  outputFileName: String,

  status: {
    type: String,
    enum: ["queued", "processing", "completed", "failed"],
    default: "queued",
  },

  progress: {
    type: Number,
    default: 0, // 0–100
  },

  error: String,
}, { timestamps: true });

export default mongoose.model("ConversionJob", conversionJobSchema);
