// config/cloudinary.js
// ─────────────────────────────────────────────────────────────────────────────
// Cloudinary configuration.
// Set these three environment variables in your .env file:
//
//   CLOUDINARY_CLOUD_NAME=your_cloud_name
//   CLOUDINARY_API_KEY=your_api_key
//   CLOUDINARY_API_SECRET=your_api_secret
//
// That's all you need to touch. Everything else is wired up automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
