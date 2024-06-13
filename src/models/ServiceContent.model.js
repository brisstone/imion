import mongoose from "mongoose";

const ServiceContentSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ServiceContent = mongoose.model("ServiceContent", ServiceContentSchema);
export default ServiceContent;
