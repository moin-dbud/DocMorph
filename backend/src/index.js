import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();
console.log("ENV CHECK:", process.env.RAZORPAY_KEY_ID);
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import downloadRoutes from "./routes/download.js";
import creditRoutes from "./routes/credits.js";
import convertRoutes from "./routes/convertRoutes.js"; 
import historyRoutes from "./routes/history.js";
import paymentRoutes from "./routes/payment.js";
import billingRoutes from "./routes/billing.js";
import invoiceRoutes from "./routes/invoice.js";
import adminUsersRoutes from "./routes/admin/users.js";
import adminPaymentsRoutes from "./routes/admin/payments.js";
import adminConversionsRoutes from "./routes/admin/conversions.js";
import adminStatsRoutes from "./routes/admin/stats.js";
import contactRoutes from "./routes/contact.js";
import adminMessagesRoutes from "./routes/admin/messages.js";




const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5000",
    credentials: true,
}));

app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/contact", contactRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/admin/users", adminUsersRoutes);
app.use("/api/admin/payments", adminPaymentsRoutes);
app.use("/api/admin/conversions", adminConversionsRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/messages", adminMessagesRoutes);





connectDB();

app.get("/", (req, res) => {
  res.send("DocMorph backend is running 🚀");
});

app.use("/api/credits", creditRoutes);
app.use("/api/convert", convertRoutes); // POST /api/convert

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});