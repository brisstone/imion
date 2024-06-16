import mongoose from "mongoose";

const FactContentSchema = new mongoose.Schema(
  {
    board: {
      type: Number,
      required: true,
    },
    mandate: {
      type: Number,
      required: true,
    },
    departments: {
      type: Number,
      required: true,
    },
    directorate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FactContent = mongoose.model("FactContent", FactContentSchema);
export default FactContent;
