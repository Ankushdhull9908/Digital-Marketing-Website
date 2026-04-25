import express from "express";
import FAQ from "../models/FAQ.js";

const router = express.Router();

// GET all active FAQs (for homepage FAQ section)
// Optional: filter by category using ?category=seo
router.get("/", async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;

    const faqs = await FAQ.find(filter).sort({ order: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST create a new FAQ (admin)
router.post("/", async (req, res) => {
  try {
    const { question, answer, category, order } = req.body;
    const faq = new FAQ({ question, answer, category, order });
    await faq.save();
    res.status(201).json({ message: "FAQ created", faq });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// PUT update a FAQ (admin)
router.put("/:id", async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json({ message: "FAQ updated", faq });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// DELETE a FAQ (admin)
router.delete("/:id", async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json({ message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
