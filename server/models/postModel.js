import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, required: true },
    likes: [],
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.models.Posts || mongoose.model("Posts", postSchema);

export default PostModel;
