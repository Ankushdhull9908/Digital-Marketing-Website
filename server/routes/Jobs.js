import express from "express";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const router = express.Router();

router.get("/mine", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/my-applications", async (req, res) => {
  try {
    const apps = await Application.find()
      .sort({ createdAt: -1 })
      .populate("job", "title company location category isActive");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/applications/:appId/status", async (req, res) => {
  try {
    const app = await Application.findById(req.params.appId).populate("job");
    if (!app) return res.status(404).json({ error: "Application not found" });

    if (req.body.status !== undefined)        app.status        = req.body.status;
    if (req.body.recruiterNote !== undefined) app.recruiterNote = req.body.recruiterNote;
    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== "All") filter.category = category;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, company, location, category, description, type, salary } = req.body;
    if (!title || !company || !category) {
      return res.status(400).json({ error: "title, company and category are required" });
    }
    const job = await Job.create({
      title, company, location, category, description, type, salary,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const fields = ["title","company","location","category","description","type","salary","isActive"];
    fields.forEach(f => { if (req.body[f] !== undefined) job[f] = req.body[f]; });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    await Application.deleteMany({ job: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/apply", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) return res.status(404).json({ error: "Job not found or closed" });

    const { coverLetter, resumeUrl, applicantName, applicantEmail } = req.body;
    const application = await Application.create({
      job:            req.params.id,
      applicantName:  applicantName  || "",
      applicantEmail: applicantEmail || "",
      coverLetter:    coverLetter    || "",
      resumeUrl:      resumeUrl      || "",
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id/applications", async (req, res) => {
  try {
    const apps = await Application.find({ job: req.params.id })
      .sort({ createdAt: -1 })
      .populate("applicant", "name email");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;