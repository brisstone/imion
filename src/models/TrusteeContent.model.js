import mongoose from "mongoose";

const TrusteeContentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    info: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const TrusteeContent = mongoose.model("TrusteeContent", TrusteeContentSchema);
export default TrusteeContent;
