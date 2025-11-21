import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: [{ type: String }],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    forks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Snippet", snippetSchema);
