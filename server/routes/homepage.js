import express from "express";
import Homepage from "../models/Homepage.js";

const router = express.Router();

// ─── GET: full homepage content ───────────────────────────────────────────────
// GET /api/homepage
router.get("/", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDER SECTION
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/homepage/slider
router.get("/slider", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    res.json(doc.slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/homepage/slider/images  — add a new slide
router.post("/slider/images", async (req, res) => {
  try {
    const { imageUrl, altText, order } = req.body;
    if (!imageUrl) return res.status(400).json({ message: "imageUrl is required" });
    const doc = await Homepage.getSingleton();
    doc.slider.images.push({ imageUrl, altText: altText || "", order: order || doc.slider.images.length });
    await doc.save();
    res.status(201).json(doc.slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/homepage/slider/images/:imageId  — update a slide
router.put("/slider/images/:imageId", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    const img = doc.slider.images.id(req.params.imageId);
    if (!img) return res.status(404).json({ message: "Slide not found" });
    Object.assign(img, req.body);
    await doc.save();
    res.json(doc.slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/homepage/slider/images/:imageId
router.delete("/slider/images/:imageId", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    doc.slider.images = doc.slider.images.filter(
      (img) => img._id.toString() !== req.params.imageId
    );
    await doc.save();
    res.json(doc.slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/homepage/slider/toggle  — toggle slider section on/off
router.patch("/slider/toggle", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    doc.slider.isActive = !doc.slider.isActive;
    await doc.save();
    res.json({ isActive: doc.slider.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// OUR PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/homepage/our-projects
router.get("/our-projects", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    res.json(doc.ourProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/homepage/our-projects/meta  — update title/isActive
router.put("/our-projects/meta", async (req, res) => {
  try {
    const { sectionTitle, isActive } = req.body;
    const doc = await Homepage.getSingleton();
    if (sectionTitle !== undefined) doc.ourProjects.sectionTitle = sectionTitle;
    if (isActive    !== undefined) doc.ourProjects.isActive      = isActive;
    await doc.save();
    res.json(doc.ourProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/homepage/our-projects/projects  — add a project
router.post("/our-projects/projects", async (req, res) => {
  try {
    const { title, imageUrl, industryId, row, order } = req.body;
    if (!title || !imageUrl) return res.status(400).json({ message: "title and imageUrl are required" });
    const doc = await Homepage.getSingleton();
    doc.ourProjects.projects.push({ title, imageUrl, industryId, row: row || "top", order: order || doc.ourProjects.projects.length });
    await doc.save();
    res.status(201).json(doc.ourProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/homepage/our-projects/projects/:projectId
router.put("/our-projects/projects/:projectId", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    const proj = doc.ourProjects.projects.id(req.params.projectId);
    if (!proj) return res.status(404).json({ message: "Project not found" });
    Object.assign(proj, req.body);
    await doc.save();
    res.json(doc.ourProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/homepage/our-projects/projects/:projectId
router.delete("/our-projects/projects/:projectId", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    doc.ourProjects.projects = doc.ourProjects.projects.filter(
      (p) => p._id.toString() !== req.params.projectId
    );
    await doc.save();
    res.json(doc.ourProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// CLIENT VIDEOS (TESTIMONIALS) SECTION
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/homepage/client-videos
router.get("/client-videos", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    // By default only return active videos for public consumption
    const activeOnly = req.query.all !== "true";
    const videos = activeOnly
      ? doc.clientVideos.videos.filter((v) => v.isActive)
      : doc.clientVideos.videos;
    res.json({ ...doc.clientVideos.toObject(), videos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/homepage/client-videos/meta
router.put("/client-videos/meta", async (req, res) => {
  try {
    const { sectionTitle, subtitle, isActive } = req.body;
    const doc = await Homepage.getSingleton();
    if (sectionTitle !== undefined) doc.clientVideos.sectionTitle = sectionTitle;
    if (subtitle     !== undefined) doc.clientVideos.subtitle     = subtitle;
    if (isActive     !== undefined) doc.clientVideos.isActive     = isActive;
    await doc.save();
    res.json(doc.clientVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/homepage/client-videos/videos  — add a video
router.post("/client-videos/videos", async (req, res) => {
  try {
    const { clientName, clientRole, company, videoUrl, thumbnail, order } = req.body;
    if (!clientName || !videoUrl) return res.status(400).json({ message: "clientName and videoUrl are required" });
    const doc = await Homepage.getSingleton();
    doc.clientVideos.videos.push({
      clientName, clientRole: clientRole || "", company: company || "",
      videoUrl, thumbnail: thumbnail || "",
      order: order ?? doc.clientVideos.videos.length,
    });
    await doc.save();
    res.status(201).json(doc.clientVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/homepage/client-videos/videos/:videoId
router.put("/client-videos/videos/:videoId", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    const vid = doc.clientVideos.videos.id(req.params.videoId);
    if (!vid) return res.status(404).json({ message: "Video not found" });
    Object.assign(vid, req.body);
    await doc.save();
    res.json(doc.clientVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/homepage/client-videos/videos/:videoId/toggle
router.patch("/client-videos/videos/:videoId/toggle", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    const vid = doc.clientVideos.videos.id(req.params.videoId);
    if (!vid) return res.status(404).json({ message: "Video not found" });
    vid.isActive = !vid.isActive;
    await doc.save();
    res.json({ isActive: vid.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/homepage/client-videos/videos/:videoId
router.delete("/client-videos/videos/:videoId", async (req, res) => {
  try {
    const doc = await Homepage.getSingleton();
    doc.clientVideos.videos = doc.clientVideos.videos.filter(
      (v) => v._id.toString() !== req.params.videoId
    );
    await doc.save();
    res.json(doc.clientVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
