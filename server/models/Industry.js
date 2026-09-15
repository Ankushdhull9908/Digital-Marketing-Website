import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  { src: { type: String, required: true }, caption: { type: String, default: "" } },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    poster: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { _id: false }
);

const industrySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true }, // e.g. "education"
    label: { type: String, required: true }, // e.g. "Schools & Education"
    iconName: { type: String, required: true, default: "Briefcase" }, // must match a key in the frontend ICON_MAP
    accent: { type: String, required: true, default: "#F39221" }, // hex color
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    images: {
      type: [imageSchema],
      validate: (v) => v.length >= 3,
      required: true,
    }, // first 3 used in the bento grid (0 = large feature, 1/2 = side tiles)
    videos: {
      type: [videoSchema],
      default: [],
    }, // shown as the 2x2/4-col video reel grid
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Industry = mongoose.model("Industry", industrySchema);
export default Industry;