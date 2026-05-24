import mongoose from "mongoose";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const SliderImageSchema = new mongoose.Schema({
  imageUrl:   { type: String, required: true },
  altText:    { type: String, default: "" },
  order:      { type: Number, default: 0 },
  isActive:   { type: Boolean, default: true },
}, { _id: true });

const ProjectSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  imageUrl:   { type: String, required: true },
  industryId: { type: String, default: "services" }, // links to /industries#id
  row:        { type: String, enum: ["top", "bottom"], default: "top" },
  order:      { type: Number, default: 0 },
  isActive:   { type: Boolean, default: true },
}, { _id: true });

const TestimonialVideoSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientRole: { type: String, default: "" },
  company:    { type: String, default: "" },
  videoUrl:   { type: String, required: true }, // YouTube embed / direct video URL
  thumbnail:  { type: String, default: "" },    // optional cover image
  order:      { type: Number, default: 0 },
  isActive:   { type: Boolean, default: true },
}, { _id: true });

// ─── Main Homepage Schema ─────────────────────────────────────────────────────

const HomepageSchema = new mongoose.Schema(
  {
    // Only one document should exist — acts as a singleton CMS record
    _singleton: { type: Boolean, default: true, unique: true },

    // ── Section: Slider / Hero Carousel ──────────────────────────────────────
    slider: {
      isActive: { type: Boolean, default: true },
      images:   { type: [SliderImageSchema], default: [] },
    },

    // ── Section: Our Projects ─────────────────────────────────────────────────
    ourProjects: {
      isActive:     { type: Boolean, default: true },
      sectionTitle: { type: String, default: "Our Projects" },
      projects:     { type: [ProjectSchema], default: [] },
    },

    // ── Section: What Our Clients Say (Videos) ───────────────────────────────
    clientVideos: {
      isActive:     { type: Boolean, default: true },
      sectionTitle: { type: String, default: "What Our Clients Say" },
      subtitle:     { type: String, default: "" },
      videos:       { type: [TestimonialVideoSchema], default: [] },
    },
  },
  { timestamps: true }
);

// ─── Singleton helper ─────────────────────────────────────────────────────────
// Returns the single homepage document, creating it if it doesn't exist yet.
HomepageSchema.statics.getSingleton = async function () {
  let doc = await this.findOne({ _singleton: true });
  if (!doc) {
    doc = await this.create({ _singleton: true });
  }
  return doc;
};

const Homepage = mongoose.model("Homepage", HomepageSchema);
export default Homepage;
