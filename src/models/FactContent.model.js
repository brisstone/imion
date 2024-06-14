import mongoose from "mongoose";

const FactContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

const FactContent = mongoose.model("FactContent", FactContentSchema);
export default FactContent;
