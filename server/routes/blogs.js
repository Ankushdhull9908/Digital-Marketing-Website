import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ── GET all blogs (public: active only, admin: all with ?all=true) ────────────
router.get("/", async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { isActive: true };
    const limit  = req.query.limit ? parseInt(req.query.limit) : undefined;

    let query = Blog.find(filter).sort({ publishedAt: -1, order: 1 });
    if (limit) query = query.limit(limit);

    const blogs = await query;
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── GET single blog by ID ────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── POST create blog (admin) ─────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const {
      title, category, author, excerpt,
      content, image, tags, isActive,
      isFeatured, order, publishedAt,
    } = req.body;

    // Auto-generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const blog = new Blog({
      title, slug, category, author, excerpt,
      content, image, tags, isActive,
      isFeatured, order,
      publishedAt: publishedAt || Date.now(),
    });

    await blog.save();
    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// ── PUT update blog (admin) ──────────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    // Regenerate slug if title changed
    if (req.body.title) {
      req.body.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// ── DELETE blog (admin) ──────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;