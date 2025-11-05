import Notification from "../models/Notification.js";
import asyncHandler from "express-async-handler";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .populate("fromUser", "name avatarUrl")
    .sort({ createdAt: -1 });
  res.json({ success: true, notifications });
});

export const markAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, read: false }, { $set: { read: true } });
  res.json({ success: true, message: "Đã đánh dấu tất cả là đã đọc" });
});
