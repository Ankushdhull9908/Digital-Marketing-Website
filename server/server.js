import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import packageRoutes from "./routes/packages.js";
import clientRoutes from "./routes/clients.js";
import faqRoutes from "./routes/faqs.js";
import contactRoutes from "./routes/contact.js";
import TestimonialRoutes from './routes/Testimonials.js'
import JobRoutes from './routes/Jobs.js'
import influencerRoutes from './routes/influencer.js'

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", TestimonialRoutes);
app.use("/api/jobs",JobRoutes );
app.use("/api/influencer", influencerRoutes);

// test
app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
