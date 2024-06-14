import mongoose from "mongoose";

const GoverningContentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    info: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const GoverningContent = mongoose.model(
  "GoverningContent",
  GoverningContentSchema
);
export default GoverningContent;
