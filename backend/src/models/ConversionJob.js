import mongoose from "mongoose";

const conversionJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: String,

    conversionType: {
      type: String,
      required: true,
    },

    outputFileName: String,

    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
    },

    error: String,
  },
  { timestamps: true }
);

export default mongoose.model("ConversionJob", conversionJobSchema);
