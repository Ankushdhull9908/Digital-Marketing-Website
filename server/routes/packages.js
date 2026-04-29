import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

// GET all active packages (for homepage display), sorted by order
router.get("/", async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { isActive: true };
    const packages = await Package.find(filter).sort({ order: 1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET single package by ID
router.get("/:id", async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST create a new package (admin)
router.post("/", async (req, res) => {
  try {
    const {
      title,
      price,
      currency,
      billingCycle,
      suffix,
      description,
      features,
      featured,
      badge,
      order,
    } = req.body;

    const pkg = new Package({
      title,
      price,
      currency,
      billingCycle,
      suffix,
      description,
      features,
      featured,
      badge,
      order,
    });

    await pkg.save();
    res.status(201).json({ message: "Package created", package: pkg });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// PUT update a package (admin)
router.put("/:id", async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json({ message: "Package updated", package: pkg });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// DELETE a package (admin)
router.delete("/:id", async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;