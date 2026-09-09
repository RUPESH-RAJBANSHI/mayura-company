import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
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

const Update =
  mongoose.models.Update || mongoose.model("Update", updateSchema);

export default Update;