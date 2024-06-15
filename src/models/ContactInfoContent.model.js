import mongoose from "mongoose";

const ContactInfoContentSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ContactInfoContent = mongoose.model(
  "ContactInfoContent",
  ContactInfoContentSchema
);

export default ContactInfoContent;
