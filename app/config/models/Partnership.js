import mongoose from "mongoose";

const partnershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    partnershipType: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed", "Rejected"],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

const Partnership =
  mongoose.models.Partnership ||
  mongoose.model("Partnership", partnershipSchema);

export default Partnership;
