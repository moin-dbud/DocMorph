import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
      planUpdatedAt: Date,
    },
    credits: {
      type: Number,
      default: 5,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
