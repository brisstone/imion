import mongoose from "mongoose";

const DepartmentContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    listString: {
      type: String,
      required: true,
    },
    list: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const DepartmentContent = mongoose.model(
  "DepartmentContent",
  DepartmentContentSchema
);

export default DepartmentContent;

DepartmentContent;
