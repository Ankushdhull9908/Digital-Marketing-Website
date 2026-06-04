import mongoose from "mongoose";

// ── Sub-schemas ────────────────────────────────────────────────────────────────

const experienceSchema = new mongoose.Schema({
  company: { type: String, default: "" },
  role:    { type: String, default: "" },
  period:  { type: String, default: "" },
  desc:    { type: String, default: "" },
});

const educationSchema = new mongoose.Schema({
  school: { type: String, default: "" },
  degree: { type: String, default: "" },
  year:   { type: String, default: "" },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  desc:  { type: String, default: "" },
  tags:  { type: [String], default: [] },
  link:  { type: String, default: "" },
});

// ── Main schema ────────────────────────────────────────────────────────────────

const resumeSchema = new mongoose.Schema(
  {
    // ── Session / ownership ───────────────────────────────────────────────────
    sessionId: {
      type:     String,
      required: true,
      index:    true,
    },

    // ── Template selection ────────────────────────────────────────────────────
    templateId: {
      type:    String,
      enum:    ["executive", "editorial", "minimal", "brutalist"],
      default: "executive",
    },

    // ── Personal info ─────────────────────────────────────────────────────────
    name:     { type: String, default: "" },
    title:    { type: String, default: "" },  // job title / headline
    tagline:  { type: String, default: "" },
    about:    { type: String, default: "" },

    // ── Contact ───────────────────────────────────────────────────────────────
    email:    { type: String, default: "", trim: true, lowercase: true },
    phone:    { type: String, default: "" },
    location: { type: String, default: "" },
    website:  { type: String, default: "" },
    github:   { type: String, default: "" },
    linkedin: { type: String, default: "" },

    // ── Appearance ────────────────────────────────────────────────────────────
    accentColor: { type: String, default: "#2E9E6E" },

    // ── Sections ──────────────────────────────────────────────────────────────
    skills:       { type: [String],           default: [] },
    achievements: { type: [String],           default: [] },
    experience:   { type: [experienceSchema], default: [] },
    education:    { type: [educationSchema],  default: [] },
    projects:     { type: [projectSchema],    default: [] },

    // ── Meta ──────────────────────────────────────────────────────────────────
    lastEditedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Bump lastEditedAt on every save
resumeSchema.pre("save", function (next) {
  this.lastEditedAt = new Date();
  next();
});

export default mongoose.model("Resume", resumeSchema);