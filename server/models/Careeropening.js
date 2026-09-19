import mongoose from "mongoose";

const careerOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true }, // e.g. Engineering, Design, Marketing
    type: { type: String, default: "Full-Time", trim: true }, // Full-Time, Contract / Remote, etc.
    location: { type: String, default: "", trim: true },
    salary: { type: String, default: "", trim: true },
    summary: { type: String, default: "" },
    requirements: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }, // controls whether it shows on the public Career page
  },
  { timestamps: true }
);

const CareerOpening = mongoose.model("CareerOpening", careerOpeningSchema);

export default CareerOpening;