
import mongoose from "mongoose";

const InfluencerApplicationSchema = new mongoose.Schema({
  // The influencer who applied
  influencer: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer", required: true },
  // The brand campaign they applied to
  campaign:   { type: mongoose.Schema.Types.ObjectId, ref: "BrandCampaign", required: true },
  // Cover message from influencer
  message:    { type: String, trim: true },
  // Brand can update this
  status:     { type: String, enum: ["pending", "reviewed", "shortlisted", "rejected"], default: "pending" },
}, { timestamps: true });

// Prevent duplicate applications
InfluencerApplicationSchema.index({ influencer: 1, campaign: 1 }, { unique: true });

export default mongoose.model("InfluencerApplication", InfluencerApplicationSchema);