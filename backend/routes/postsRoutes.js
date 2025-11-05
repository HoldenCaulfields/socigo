import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.js"; // ✅ thêm dòng này

const router = express.Router();

// 🟢 Lấy danh sách bài viết
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .populate("userId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(),
    ]);

    res.json({ posts, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🟢 Đăng bài viết mới (yêu cầu đăng nhập)
router.post("/", protect, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user._id, // ✅ Lấy từ token
      text: req.body.text,
      mood: req.body.mood,
      music: req.body.music,
    });
    await post.save();
    res.json({ success: true, post });
  } catch (err) {
    console.error("❌ Post error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🟢 Like/unlike bài viết
router.patch("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    const userId = req.user._id;
    const liked = post.likes.includes(userId);
    post.likes = liked
      ? post.likes.filter((id) => id.toString() !== userId.toString())
      : [...post.likes, userId];
    await post.save();

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Like error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
