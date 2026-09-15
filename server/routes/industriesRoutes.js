import express from "express";
import Industry from "../models/Industry.js";

// ASSUMPTION: no `protect`/`admin` middleware wired up yet, matching the
// rest of your routes right now. Add `protect, admin` in front of the
// POST/PUT/DELETE handlers once your auth is ready.

const router = express.Router();

// GET /api/industries
// Public. Returns active industries sorted by display order.
// Pass ?all=true (admin dashboard) to get every industry regardless of isActive.
router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { isActive: true };
    const industries = await Industry.find(filter).sort({ order: 1 });
    res.json(industries);
  } catch (err) {
    next(err);
  }
});

// GET /api/industries/:id
router.get("/:id", async (req, res, next) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) return res.status(404).json({ message: "Industry not found" });
    res.json(industry);
  } catch (err) {
    next(err);
  }
});

// POST /api/industries
// Admin. Creates a new industry section.
router.post("/", async (req, res, next) => {
  try {
    const { slug, label, iconName, accent, description, tags, images, videos, order, isActive } = req.body;

    if (!slug || !label || !description) {
      return res.status(400).json({ message: "slug, label, and description are required" });
    }
    if (!Array.isArray(images) || images.length < 3) {
      return res.status(400).json({ message: "At least 3 images are required (feature + 2 side tiles)" });
    }

    const industry = await Industry.create({
      slug, label, iconName, accent, description,
      tags: tags || [], images, videos: videos || [], order, isActive,
    });

    res.status(201).json(industry);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "An industry with that slug already exists" });
    }
    next(err);
  }
});

// PUT /api/industries/:id
// Admin. Updates an existing industry.
router.put("/:id", async (req, res, next) => {
  try {
    const { slug, label, iconName, accent, description, tags, images, videos, order, isActive } = req.body;

    if (images && images.length < 3) {
      return res.status(400).json({ message: "At least 3 images are required (feature + 2 side tiles)" });
    }

    const update = {};
    if (slug !== undefined) update.slug = slug;
    if (label !== undefined) update.label = label;
    if (iconName !== undefined) update.iconName = iconName;
    if (accent !== undefined) update.accent = accent;
    if (description !== undefined) update.description = description;
    if (tags !== undefined) update.tags = tags;
    if (images !== undefined) update.images = images;
    if (videos !== undefined) update.videos = videos;
    if (order !== undefined) update.order = order;
    if (isActive !== undefined) update.isActive = isActive;

    const industry = await Industry.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!industry) return res.status(404).json({ message: "Industry not found" });
    res.json(industry);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "An industry with that slug already exists" });
    }
    next(err);
  }
});

// DELETE /api/industries/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) return res.status(404).json({ message: "Industry not found" });
    res.json({ message: "Industry deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;