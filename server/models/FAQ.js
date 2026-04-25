import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "general", // e.g. "general", "seo", "pricing", "web"
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

export default mongoose.model("FAQ", faqSchema);
