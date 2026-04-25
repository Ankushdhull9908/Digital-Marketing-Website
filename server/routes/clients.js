import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// GET all active clients (for homepage logo marquee)
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true }).sort({ order: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST add a new client logo (admin)
router.post("/", async (req, res) => {
  try {
    const { name, logoUrl, websiteUrl, order } = req.body;
    const client = new Client({ name, logoUrl, websiteUrl, order });
    await client.save();
    res.status(201).json({ message: "Client added", client });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// PUT update a client (admin)
router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client updated", client });
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

// DELETE a client logo (admin)
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
