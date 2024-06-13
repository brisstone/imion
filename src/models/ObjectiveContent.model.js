import mongoose from "mongoose";

const ObjectiveContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonLabel: { type: String, required: true },
  buttonLink: { type: String, default: "" },
  buttonColor: { type: Boolean, default: true },
});

const ObjectiveContent = mongoose.model(
  "ObjectiveContent",
  ObjectiveContentSchema
);
export default ObjectiveContent;
