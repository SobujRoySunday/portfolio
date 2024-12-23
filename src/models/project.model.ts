import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "isCreated", updatedAt: "isUpdated" },
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
