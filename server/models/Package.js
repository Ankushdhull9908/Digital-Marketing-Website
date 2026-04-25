import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
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
    description: {
      type: String,
      trim: true,
    },
    features: [
      {
        type: String,
      },
    ],
    badge: {
      type: String, // e.g. "HOT", "Popular", "Best Value"
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0, // for controlling display order
    },
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);
