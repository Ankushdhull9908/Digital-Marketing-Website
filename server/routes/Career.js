import express from "express";
import CareerOpening from "../models/CareerOpening.js";

const router = express.Router();

// GET /api/career            -> public: active openings only (for the Career page)
// GET /api/career?all=true   -> admin: everything, including hidden/draft openings
router.get("/", async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { isActive: true };
    const openings = await CareerOpening.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(openings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/career (admin) - create a new opening
router.post("/", async (req, res) => {
  try {
    const opening = await CareerOpening.create(req.body);
    res.status(201).json(opening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/career/:id (admin) - update an opening (also used to toggle isActive)
router.put("/:id", async (req, res) => {
  try {
    const opening = await CareerOpening.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!opening) return res.status(404).json({ message: "Opening not found" });
    res.json(opening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/career/:id (admin)
router.delete("/:id", async (req, res) => {
  try {
    const opening = await CareerOpening.findByIdAndDelete(req.params.id);
    if (!opening) return res.status(404).json({ message: "Opening not found" });
    res.json({ message: "Opening deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;