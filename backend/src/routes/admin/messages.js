import express from "express";
import ContactMessage from "../../models/ContactMessage.js";
import {isAdmin} from "../../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", isAdmin, async (req, res) => {
  const messages = await ContactMessage
    .find()
    .sort({ createdAt: -1 });

  res.json({ messages });
});

export default router;
