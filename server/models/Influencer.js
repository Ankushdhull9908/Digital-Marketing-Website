
import mongoose from "mongoose";

const InfluencerSchema = new mongoose.Schema({
  name:               { type: String, required: true, trim: true },
  handle:             { type: String, required: true, trim: true },
  email:              { type: String, required: true, trim: true, lowercase: true },
  phone:              { type: String, trim: true },
  location:           { type: String, trim: true },
  bio:                { type: String, trim: true },
  platforms:          [{ type: String }],
  followers:          { type: Number, default: 0 },
  avgViews:           { type: Number, default: 0 },
  highestView:        { type: Number, default: 0 },
  engRate:            { type: String },
  audienceAge:        { type: String },
  audienceGender:     { type: String },
  niches:             [{ type: String }],
  collabType:         { type: String },
  ratePerPost:        { type: String },
  pastCollaborations: { type: String },
  isActive:           { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Influencer", InfluencerSchema);