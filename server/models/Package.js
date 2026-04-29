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
    // Displayed after price, e.g. "/ month" or "/- " (leave empty for one-time)
    suffix: {
      type: String,
      default: "",
      trim: true,
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
    // Marks this card as "Popular" — renders the orange featured badge
    featured: {
      type: Boolean,
      default: false,
    },
    // Optional short badge label e.g. "HOT", "Best Value" (separate from featured)
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