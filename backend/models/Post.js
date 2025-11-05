import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ["status", "review", "music"], default: "status" },
    mood: { type: String },
    music: { type: String },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    rating: { type: Number, min: 1, max: 5 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
