import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getFriends,
  sendFriendRequest,
  respondFriendRequest,
  getFriendSuggestions,
} from "../controllers/friendController.js";

const router = express.Router();

router.get("/", protect, getFriends); // Danh sách bạn bè
router.get("/suggestions", protect, getFriendSuggestions); // Gợi ý kết bạn
router.post("/request/:friendId", protect, sendFriendRequest); // Gửi lời mời
router.put("/respond/:requestId", protect, respondFriendRequest); // Chấp nhận / từ chối

export default router;
