import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const Notice =
  mongoose.models.Notice || mongoose.model("Notice", noticeSchema);

export default Notice;