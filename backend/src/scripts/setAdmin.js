import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import { updateClerkRole } from "../utils/clerk.js";

const run = async () => {
  await connectDB();

  const admins = await User.find({ role: "admin" });

  for (const admin of admins) {
    await updateClerkRole(admin.clerkUserId, "admin");
    console.log(`✅ Synced admin: ${admin.clerkUserId}`);
  }

  process.exit(0);
};

run();
