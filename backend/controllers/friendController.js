import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import asyncHandler from "express-async-handler";

export const getFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("friends", "name email avatarUrl");
  res.json({ success: true, friends: user.friends });
});

export const getFriendSuggestions = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).limit(10);
  res.json({ success: true, suggestions: users });
});

export const sendFriendRequest = asyncHandler(async (req, res) => {
  const { friendId } = req.params;
  const existing = await FriendRequest.findOne({ from: req.user._id, to: friendId });
  if (existing) throw new Error("Đã gửi lời mời rồi");

  const request = await FriendRequest.create({ from: req.user._id, to: friendId });
  res.json({ success: true, message: "Đã gửi lời mời kết bạn", request });
});

export const respondFriendRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body; // accept | reject

  const request = await FriendRequest.findById(requestId);
  if (!request) throw new Error("Không tìm thấy lời mời");

  if (action === "accept") {
    const user = await User.findById(req.user._id);
    const friend = await User.findById(request.from);

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();
  }

  await request.deleteOne();
  res.json({ success: true, message: `Đã ${action === "accept" ? "kết bạn" : "từ chối"}` });
});
