import { getAuth } from "@clerk/express";
import clerkClient from "../utils/clerk.js";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    // ✅ Get auth from Clerk middleware
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Fetch user from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    const email =
      clerkUser.emailAddresses?.[0]?.emailAddress || "unknown@email.com";

    // ✅ Find or create user in DB
    let user = await User.findOne({ clerkUserId: userId });

    console.log("Clerk user email:", email);

    if (!user) {
      user = await User.create({
        clerkUserId: userId,
        email,
        plan: "free",
        credits: 5,
        role: "user",
      });
    } else if (user.email === "unknown@email.com" && email !== "unknown@email.com") {
      user.email = email;
      await user.save();
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Clerk auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};