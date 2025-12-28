import PDFDocument from "pdfkit";

export function generateInvoice(res, payment, user) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice_${payment._id}.pdf`
  );

  doc.pipe(res);

  // Header
  doc
    .fontSize(20)
    .text("DocMorph Invoice", { align: "center" })
    .moveDown();

  doc
    .fontSize(10)
    .text("DocMorph Technologies", { align: "center" })
    .text("support@docmorph.com", { align: "center" })
    .moveDown(2);

  // Invoice Info
  doc.fontSize(12);
  doc.text(`Invoice ID: ${payment._id}`);
  doc.text(`Date: ${payment.createdAt.toDateString()}`);
  doc.text(`Payment ID: ${payment.razorpayPaymentId}`);
  doc.moveDown();

  // Customer Info
  doc.text(`Billed To: ${user.email}`);
  doc.moveDown();

  // Plan Details
  doc.text(`Plan: ${payment.plan.toUpperCase()}`);
  doc.text(`Credits Added: ${payment.creditsAdded}`);
  doc.text(`Amount Paid: ₹${payment.amount}`);
  doc.moveDown(2);

  // Footer
  doc
    .fontSize(10)
    .text("Thank you for using DocMorph 🚀", { align: "center" });

  doc.end();
}
