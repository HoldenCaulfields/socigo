import Message from "../models/Message.js";
import asyncHandler from "express-async-handler";

export const sendMessage = asyncHandler(async (req, res) => {
  const { friendId, text } = req.body;
  const message = await Message.create({
    from: req.user._id,
    to: friendId,
    text,
  });
  res.json({ success: true, message });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { friendId } = req.params;
  const messages = await Message.find({
    $or: [
      { from: req.user._id, to: friendId },
      { from: friendId, to: req.user._id },
    ],
  }).sort({ createdAt: 1 });
  res.json({ success: true, messages });
});
