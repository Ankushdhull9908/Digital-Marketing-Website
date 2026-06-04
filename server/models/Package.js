import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Single price for simple use (kept for backward compat)
    price: {
      type: Number,
      default: 0,
    },
    // Multi-cycle prices matching the UI tabs
    prices: {
      Monthly:    { type: Number, default: 0 },
      Quarterly:  { type: Number, default: 0 },
      HalfYearly: { type: Number, default: 0 },
      Yearly:     { type: Number, default: 0 },
    },
    currency: {
      type: String,
      default: "INR",
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly", "one-time"],
      default: "monthly",
    },
    suffix: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    features: [{ type: String }],
    featured: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);