// server.js
import express from "express";
import cors    from "cors";
import connectDB from "./config/db.js";
import authRoutes        from "./routes/auth.js";
import packageRoutes     from "./routes/packages.js";
import clientRoutes      from "./routes/clients.js";
import faqRoutes         from "./routes/faqs.js";
import contactRoutes     from "./routes/contact.js";
import TestimonialRoutes from "./routes/Testimonials.js";
import JobRoutes         from "./routes/Jobs.js";
import influencerRoutes  from "./routes/influencer.js";
import homepageRoutes    from "./routes/homepage.js";
import uploadRoutes      from "./routes/upload.js";
import resumeRoutes      from "./routes/resume.js"; // ← NEW
import blogRoutes from "./routes/blogs.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

connectDB();

app.use("/api/auth",         authRoutes);
app.use("/api/packages",     packageRoutes);
app.use("/api/clients",      clientRoutes);
app.use("/api/faqs",         faqRoutes);
app.use("/api/contact",      contactRoutes);
app.use("/api/testimonials", TestimonialRoutes);
app.use("/api/jobs",         JobRoutes);
app.use("/api/influencer",   influencerRoutes);
app.use("/api/homepage",     homepageRoutes);
app.use("/api/upload",       uploadRoutes);
app.use("/api/resumes",      resumeRoutes); // ← NEW
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => res.send("API running..."));

app.listen(5000, () => console.log("Server running on port 5000 🚀"));