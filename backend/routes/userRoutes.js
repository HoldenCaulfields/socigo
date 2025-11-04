import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Lấy thông tin hồ sơ người dùng
router.get("/profile", protect, getProfile);

// Cập nhật thông tin hồ sơ người dùng
router.put("/profile", protect, updateProfile);

export default router;
