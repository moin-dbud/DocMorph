import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    outputFileName: {
      type: String,
      required: true,
    },

    conversionType: {
      type: String,
      required: true,
    },

    creditsUsed: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversion", conversionSchema);