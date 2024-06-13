import mongoose from "mongoose";

const HeroContentSchema = new mongoose.Schema(
  {
    title_one: { type: String, required: true },
    title_two: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const HeroContent = mongoose.model("HeroContent", HeroContentSchema);
export default HeroContent;
