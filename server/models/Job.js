// models/Job.js
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    company:     { type: String, required: true, trim: true },
    location:    { type: String, default: "Remote", trim: true },
    category:    { type: String, enum: ["Frontend","Backend","Fullstack","Design","Marketing"], required: true },
    description: { type: String, default: "" },
    type:        { type: String, default: "Full-time" },
    salary:      { type: String, default: "" },
    postedBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // removed required
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);