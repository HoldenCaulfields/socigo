import Review from "../models/ReviewModel.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const getFeed = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("friends");
  const friendIds = user.friends.map((f) => f._id);

  const posts = await Review.find({ userId: { $in: [...friendIds, req.user._id] } })
    .populate("userId", "name avatarUrl")
    .populate("serviceId", "name type city")
    .sort({ createdAt: -1 });

  res.json({ success: true, posts });
});
