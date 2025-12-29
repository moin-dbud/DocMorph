import express from "express";
import { Resend } from "resend";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Save to DB
    const saved = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    // 2️⃣ Send email to admin
    await resend.emails.send({
      from: "DocMorph <no-reply@docmorph.ai>",
      to: process.env.SUPPORT_EMAIL,
      subject: subject || "New Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || "—"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;
