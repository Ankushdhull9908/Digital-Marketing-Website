// routes/upload.js
// ─────────────────────────────────────────────────────────────────────────────
// Single endpoint:  POST /api/upload
//
// Accepts either:
//   • multipart/form-data  with field "file"   (via multer, no disk storage)
//   • application/json     with field "data"   (base64 data-URI string)
//
// Returns:  { url, publicId }
//
// Install dependencies (if not already present):
//   npm install cloudinary multer
// ─────────────────────────────────────────────────────────────────────────────

import express        from "express";
import multer         from "multer";
import streamifier    from "streamifier";
import cloudinary     from "../config/cloudinary.js";

const router  = express.Router();

// multer: keep file in memory (no disk writes)
const upload  = multer({ storage: multer.memoryStorage() });

// ── helpers ───────────────────────────────────────────────────────────────────

/** Upload a Node.js Buffer to Cloudinary via a readable stream. */
function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder || "webtech", resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

/** Upload a base64 data-URI string directly to Cloudinary. */
function uploadBase64(dataUri, folder) {
  return cloudinary.uploader.upload(dataUri, {
    folder:        folder || "webtech",
    resource_type: "auto",
  });
}

// ── POST /api/upload ──────────────────────────────────────────────────────────
router.post(
  "/",
  upload.single("file"),   // handles multipart; no-op if body is JSON
  async (req, res) => {
    try {
      let result;

      if (req.file) {
        // ── multipart upload ──────────────────────────────────────────────
        result = await uploadBuffer(req.file.buffer, req.body.folder);
      } else if (req.body?.data) {
        // ── base64 JSON upload ────────────────────────────────────────────
        result = await uploadBase64(req.body.data, req.body.folder);
      } else {
        return res.status(400).json({ message: "No file or data provided." });
      }

      res.json({ url: result.secure_url, publicId: result.public_id });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  }
);

// ── DELETE /api/upload/:publicId  (optional — for cleanup) ───────────────────
router.delete("/:publicId", async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId, {
      resource_type: "image",
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

export default router;
