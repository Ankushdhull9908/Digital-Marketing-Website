import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      required: true, // URL or path to the client logo image
    },
    websiteUrl: {
      type: String,
      default: null, // optional clickable link
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0, // for controlling display order in the marquee/grid
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
