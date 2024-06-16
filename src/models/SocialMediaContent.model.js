import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const SocialMediaContent = mongoose.model(
  "SocialMediaContent",
  SocialMediaSchema
);
export default SocialMediaContent;
