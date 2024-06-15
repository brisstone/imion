import mongoose from "mongoose";

const AboutContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content_one: {
      type: String,
      required: true,
    },
    content_two: {
      type: String,
      required: true,
    },
    content_three: {
      type: String,
      default: "",
    },
    content_four: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const AboutContent = mongoose.model("AboutContent", AboutContentSchema);

export default AboutContent;
