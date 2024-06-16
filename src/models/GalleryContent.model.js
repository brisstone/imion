import mongoose from "mongoose";

const GalleryContentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const GalleryContent = mongoose.model("GalleryContent", GalleryContentSchema);
export default GalleryContent;
