import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST submit contact form (from Contact.jsx)
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: "Full name, email, and message are required." });
    }

    const contact = new Contact({ fullName, email, phone, subject, message });
    await contact.save();

    res.status(201).json({ message: "Message received! We'll get back to you within 24 hours." });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// GET all contact submissions (admin)
// Optional: filter by status using ?status=new
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PATCH update status of a contact submission (admin marks as seen/replied)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "seen", "replied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Use: new, seen, or replied." });
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return res.status(404).json({ message: "Contact submission not found" });

    res.json({ message: "Status updated", contact });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
