import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Logo = mongoose.model("Logo", LogoSchema);
export default Logo;
