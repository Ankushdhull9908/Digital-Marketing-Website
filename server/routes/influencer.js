
import express from "express";
const router   = express.Router();
import Influencer from "../models/Influencer.js";
import BrandCampaign from "../models/BrandCampaign.js";
import InfluencerApplication from "../models/InfluencerApplication.js";


// ─── INFLUENCER CRUD ──────────────────────────────────────────────────────

// Create influencer profile
router.post("/influencers", async (req, res) => {
  try {
    const doc = await Influencer.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all influencers (dashboard admin view)
router.get("/influencers", async (req, res) => {
  try {
    const docs = await Influencer.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single influencer by id
router.get("/influencers/:id", async (req, res) => {
  try {
    const doc = await Influencer.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update influencer
router.put("/influencers/:id", async (req, res) => {
  try {
    const doc = await Influencer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete influencer
router.delete("/influencers/:id", async (req, res) => {
  try {
    await Influencer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── BRAND CAMPAIGN CRUD ─────────────────────────────────────────────────

// Create brand campaign
router.post("/campaigns", async (req, res) => {
  try {
    const doc = await BrandCampaign.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all campaigns (influencer browses these)
router.get("/campaigns", async (req, res) => {
  try {
    const docs = await BrandCampaign.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all campaigns including inactive (dashboard admin)
router.get("/campaigns/all", async (req, res) => {
  try {
    const docs = await BrandCampaign.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single campaign
router.get("/campaigns/:id", async (req, res) => {
  try {
    const doc = await BrandCampaign.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update campaign
router.put("/campaigns/:id", async (req, res) => {
  try {
    const doc = await BrandCampaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete campaign
router.delete("/campaigns/:id", async (req, res) => {
  try {
    await BrandCampaign.findByIdAndDelete(req.params.id);
    await InfluencerApplication.deleteMany({ campaign: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── APPLICATIONS ────────────────────────────────────────────────────────

// Influencer applies to a campaign
// POST /api/influencer/campaigns/:campaignId/apply
// body: { influencerId, message }
router.post("/campaigns/:campaignId/apply", async (req, res) => {
  try {
    const { influencerId, message } = req.body;
    const app = await InfluencerApplication.create({
      influencer: influencerId,
      campaign:   req.params.campaignId,
      message,
    });
    res.status(201).json(app);
  } catch (err) {
    // duplicate key = already applied
    if (err.code === 11000) return res.status(409).json({ error: "Already applied" });
    res.status(400).json({ error: err.message });
  }
});

// Get all campaigns an influencer has applied to (Influencer dashboard view)
// GET /api/influencer/my-applications?influencerId=xxx
router.get("/my-applications", async (req, res) => {
  try {
    const { influencerId } = req.query;
    const apps = await InfluencerApplication.find({ influencer: influencerId })
      .populate("campaign")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all influencers who applied to a specific campaign (Brand dashboard view)
// GET /api/influencer/campaigns/:campaignId/applications
router.get("/campaigns/:campaignId/applications", async (req, res) => {
  try {
    const apps = await InfluencerApplication.find({ campaign: req.params.campaignId })
      .populate("influencer")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Brand updates application status (shortlist / reject etc.)
// PATCH /api/influencer/applications/:appId/status
router.patch("/applications/:appId/status", async (req, res) => {
  try {
    const app = await InfluencerApplication.findByIdAndUpdate(
      req.params.appId,
      { status: req.body.status },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete application
router.delete("/applications/:appId", async (req, res) => {
  try {
    await InfluencerApplication.findByIdAndDelete(req.params.appId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;