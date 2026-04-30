import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ ADD THIS — auth middleware, exported as named export
// ✅ Fix — just add async
export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, "secretkey");
    req.user = await User.findById(decoded.id).select("-password"); // ✅ now works
    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// 🔸 Signup
router.post("/signup", async (req, res) => { /* ... same as before */ });

// 🔸 Login  
router.post("/login", async (req, res) => { /* ... same as before */ });

export default router; // router stays as default export