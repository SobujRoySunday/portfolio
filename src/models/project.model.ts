import mongoose, { Model, Schema } from "mongoose";
import type { Project } from "@/types/project";

const projectSchema = new Schema<Project>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
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

const projectModel: Model<Project> =
  (mongoose.models.Project as Model<Project>) ||
  mongoose.model<Project>("Project", projectSchema);

export default projectModel;
