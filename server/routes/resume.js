import express from "express";
import Resume  from "../models/Resume.js";

const router = express.Router();

// ── Default resume data (mirrors ResumeMaker DEFAULT_DATA) ────────────────────
const DEFAULT_RESUME = {
  templateId:  "executive",
  name:        "Alex Morgan",
  title:       "Senior Product Designer",
  tagline:     "I design digital experiences that people love to use.",
  about:       "I'm a product designer with 5+ years of experience crafting intuitive interfaces for startups and Fortune 500s. I believe great design solves real problems beautifully.",
  email:       "",
  phone:       "",
  location:    "",
  website:     "",
  github:      "",
  linkedin:    "",
  accentColor: "#2E9E6E",
  skills:       [],
  achievements: [],
  experience:   [],
  education:    [],
  projects:     [],
};

// ── Allowed top-level fields the client may update ────────────────────────────
const UPDATABLE_FIELDS = [
  "templateId", "name", "title", "tagline", "about",
  "email", "phone", "location", "website", "github", "linkedin",
  "accentColor", "skills", "achievements", "experience", "education", "projects",
];

function pickFields(body) {
  return UPDATABLE_FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});
}

// ─── GET /api/resumes
//     Admin: list all resumes, newest-first, paginated
// ─────────────────────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    const [resumes, total] = await Promise.all([
      Resume.find({})
        .sort({ lastEditedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Resume.countDocuments(),
    ]);

    res.json({ resumes, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── GET /api/resumes/stats
//     Admin: quick stats for the dashboard
// ─────────────────────────────────────────────────────────────────────────────
router.get("/stats", async (req, res) => {
  try {
    const total  = await Resume.countDocuments();
    const recent = await Resume.countDocuments({
      lastEditedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    // template breakdown
    const byTemplate = await Resume.aggregate([
      { $group: { _id: "$templateId", count: { $sum: 1 } } },
    ]);

    res.json({ total, recent, byTemplate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── GET /api/resumes/session/:sessionId
//     Load (or auto-create) the resume for a browser session
// ─────────────────────────────────────────────────────────────────────────────
router.get("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    let resume = await Resume.findOne({ sessionId });

    if (!resume) {
      resume = await Resume.create({ sessionId, ...DEFAULT_RESUME });
    }

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── GET /api/resumes/:id
//     Fetch one resume by Mongo _id (admin view)
// ─────────────────────────────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── PUT /api/resumes/session/:sessionId
//     Full upsert — replaces all fields sent by the ResumeMaker frontend
// ─────────────────────────────────────────────────────────────────────────────
router.put("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const update = { ...pickFields(req.body), lastEditedAt: new Date() };

    const resume = await Resume.findOneAndUpdate(
      { sessionId },
      { $set: update },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── PATCH /api/resumes/session/:sessionId/template
//     Lightweight: update only the chosen template
// ─────────────────────────────────────────────────────────────────────────────
router.patch("/session/:sessionId/template", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { templateId } = req.body;

    const VALID = ["executive", "editorial", "minimal", "brutalist"];
    if (!VALID.includes(templateId)) {
      return res.status(400).json({ message: `Invalid templateId: ${templateId}` });
    }

    const resume = await Resume.findOneAndUpdate(
      { sessionId },
      { $set: { templateId, lastEditedAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ ok: true, resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── DELETE /api/resumes/:id
//     Admin: delete a resume by Mongo _id
// ─────────────────────────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resume.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Resume not found" });
    res.json({ ok: true, message: "Resume deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;