import mongoose from "mongoose";

const HomeVideoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const HomeVideo = mongoose.model("HomeVideo", HomeVideoSchema);
export default HomeVideo;
