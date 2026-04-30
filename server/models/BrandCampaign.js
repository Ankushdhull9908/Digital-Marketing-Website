import mongoose from "mongoose";

const BrandCampaignSchema = new mongoose.Schema({
  company:          { type: String, required: true, trim: true },
  contact:          { type: String, trim: true },
  email:            { type: String, required: true, trim: true, lowercase: true },
  phone:            { type: String, trim: true },
  website:          { type: String, trim: true },
  niche:            { type: String },            // single niche from dropdown
  niches:           [{ type: String }],          // multi-select content categories
  influencerTier:   { type: String },
  platformPref:     { type: String },
  audienceLocation: { type: String },
  budget:           { type: String },
  timeline:         { type: String },
  description:      { type: String },
  deliverables:     { type: String },
  collabType:       { type: String },
  specialNotes:     { type: String },
  isActive:         { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("BrandCampaign", BrandCampaignSchema);