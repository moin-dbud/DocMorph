import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // TODO: send email (Resend / Nodemailer)
  console.log("📩 Contact message:", { name, email, subject, message });

  res.json({ success: true });
});

export default router;
