import User from "../models/User.js";

// [GET] /api/users/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({
      message: "Lấy hồ sơ thành công",
      user,
    });
  } catch (error) {
    console.error("❌ Lỗi getProfile:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// [PUT] /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatarUrl = req.body.avatarUrl || user.avatarUrl;

    const updatedUser = await user.save();

    res.json({
      message: "Cập nhật hồ sơ thành công",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatarUrl: updatedUser.avatarUrl,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Lỗi updateProfile:", error);
    res.status(500).json({ message: "Không thể cập nhật hồ sơ" });
  }
};
