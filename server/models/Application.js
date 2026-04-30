// models/Application.js
import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    job:            { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    applicant:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applicantName:  { type: String },
    applicantEmail: { type: String },
    coverLetter:    { type: String, default: "" },
    resumeUrl:      { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
    recruiterNote: { type: String, default: "" },
  },
  { timestamps: true }
);

// applicationSchema.index({ job: 1, applicant: 1 }, { unique: true }); // commented out

export default mongoose.model("Application", applicationSchema);