import mongoose from "mongoose";

const UpcomingEventContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ref: { type: String, default: "" },
  month: { type: String, required: true },
  day: { type: String, required: true },
  description: { type: String, default: "" },
});

const UpcomingEventContent = mongoose.model(
  "UpcomingEventContent",
  UpcomingEventContentSchema
);
export default UpcomingEventContent;
